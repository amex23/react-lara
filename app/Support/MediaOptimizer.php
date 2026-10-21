<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

/**
 * Resizes + converts still images to WebP and uploads every file with a
 * long-lived Cache-Control header. Filenames are random, so "immutable"
 * is safe: a replaced image always gets a new path.
 */
class MediaOptimizer
{
    public const CACHE_CONTROL = 'public, max-age=31536000, immutable';

    /** folder => [max width px, WebP quality] */
    private const PRESETS = [
        'store-images' => [1200, 80],
        'store-thumbs' => [480, 75],
    ];

    /** Extensions we re-encode. GIFs (may be animated) and videos are stored as-is. */
    private const OPTIMIZABLE = ['jpg', 'jpeg', 'png', 'webp'];

    public static function shouldOptimize(string $pathOrExt): bool
    {
        $ext = strtolower(pathinfo($pathOrExt, PATHINFO_EXTENSION) ?: $pathOrExt);

        return in_array($ext, self::OPTIMIZABLE, true);
    }

    /**
     * Store an uploaded file in $folder on the public disk and return its path.
     */
    public static function store(UploadedFile $file, string $folder): string
    {
        $ext = strtolower($file->getClientOriginalExtension());

        if (! isset(self::PRESETS[$folder]) || ! self::shouldOptimize($ext)) {
            // Videos, GIFs, anything else: original bytes, but cached properly.
            return Storage::disk('public')->putFile($folder, $file, [
                'CacheControl' => self::CACHE_CONTROL,
            ]);
        }

        return self::storeImage($file->getRealPath(), $folder);
    }

    /**
     * Encode a still image (file path or raw binary string) and store it.
     */
    public static function storeImage(string $source, string $folder): string
    {
        [$width, $quality] = self::PRESETS[$folder];

        $encoded = ImageManager::gd()
            ->read($source)              // auto-orients phone photos via EXIF
            ->scaleDown(width: $width)   // never upscales
            ->toWebp($quality);

        $path = $folder . '/' . Str::random(40) . '.webp';

        Storage::disk('public')->put($path, (string) $encoded, [
            'ContentType'  => 'image/webp',
            'CacheControl' => self::CACHE_CONTROL,
        ]);

        return $path;
    }
}
