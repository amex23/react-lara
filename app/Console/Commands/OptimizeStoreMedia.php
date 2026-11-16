<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Support\MediaOptimizer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

/**
 * One-off: re-encode every existing image{N}/thumb{N} to resized WebP with
 * cache headers, and point the DB at the new files.
 *
 *   php artisan media:optimize --dry-run      # list what would change
 *   php artisan media:optimize                # convert, keep old files
 *   php artisan media:optimize --delete-old   # convert, delete originals
 */
class OptimizeStoreMedia extends Command
{
    protected $signature = 'media:optimize {--dry-run} {--delete-old}';

    protected $description = 'Resize/convert existing store images to WebP with long cache headers';

    public function handle(): int
    {
        $disk   = Storage::disk('public');
        $slots  = range(1, (int) config('plans.media_columns'));
        $dryRun = (bool) $this->option('dry-run');
        $done   = 0;

        User::query()->chunkById(50, function ($users) use ($disk, $slots, $dryRun, &$done) {
            foreach ($users as $user) {
                $updates = [];
                $old     = [];

                foreach ($slots as $i) {
                    foreach (["image{$i}" => 'store-images', "thumb{$i}" => 'store-thumbs'] as $col => $folder) {
                        $path = $user->$col;

                        // Skip empty slots, videos/GIFs, and files already converted.
                        if (! $path || str_ends_with($path, '.webp') || ! MediaOptimizer::shouldOptimize($path)) {
                            continue;
                        }

                        if ($dryRun) {
                            $this->line("[dry-run] user {$user->id} {$col}: {$path}");
                            continue;
                        }

                        if (! $disk->exists($path)) {
                            $this->warn("Missing file, skipped: user {$user->id} {$col}: {$path}");
                            continue;
                        }

                        try {
                            $updates[$col] = MediaOptimizer::storeImage($disk->get($path), $folder);
                            $old[]         = $path;
                        } catch (\Throwable $e) {
                            $this->error("Failed user {$user->id} {$col}: {$e->getMessage()}");
                        }
                    }
                }

                if ($updates) {
                    $user->forceFill($updates)->save();
                    $done += count($updates);
                    $this->info("User {$user->id}: optimized " . count($updates) . ' file(s)');

                    if ($this->option('delete-old')) {
                        $disk->delete($old);
                    }
                }
            }
        });

        $this->info($dryRun ? 'Dry run complete.' : "Done. {$done} file(s) optimized.");

        return self::SUCCESS;
    }
}
