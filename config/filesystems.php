<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Laravel Cloud sets FILESYSTEM_DISK=public via environment variables,
    | so we keep the fallback to 'local' for local development.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | We only define the 'local' disk here. The 'public' disk is automatically
    | configured by Laravel Cloud using Cloudflare R2 (S3-compatible).
    |
    | Do NOT define 'public' manually — it would override the injected config.
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        // ────────────────────────────────────────────────────────────────
        // The 'public' disk is injected by Laravel Cloud.
        // It uses S3 driver + your bucket credentials automatically.
        // ────────────────────────────────────────────────────────────────

        // You can keep the 's3' disk as a fallback or for other buckets if needed
        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
            'report' => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | You can keep this if you still run `php artisan storage:link` locally.
    | In production on Laravel Cloud it has no effect (no symlink needed).
    |
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];