<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Absolute media ceiling
    |--------------------------------------------------------------------------
    | How many image{N} / checkout_url{N} columns exist on the users table.
    | Bump this only together with a migration.
    */
    'media_columns' => 12,

    'default' => 'basic',

    'plans' => [

        'basic' => [
            'label'         => 'Basic',
            'price'    => 600,
            'currency' => 'PHP',
            'media_limit'   => 6,   // max uploadable slots
            'max_display'   => 6,   // max slots the storefront may show
            'min_display'   => 6,
            'allows_video'  => false,
            'variant_id'    => env('LEMONSQUEEZY_BASIC_VARIANT_ID'),
            'product_id'    => env('LEMONSQUEEZY_BASIC_PRODUCT_ID'),
            'checkout_url'  => env('LEMONSQUEEZY_BASIC_CHECKOUT_URL', env('LEMONSQUEEZY_STORE_URL')),
        ],

        'pro' => [
            'label'         => 'Pro',
            'price'    => 1500,
            'currency' => 'PHP',
            'media_limit'   => 12,
            'max_display'   => 12,
            'min_display'   => 6,
            'allows_video'  => true,
            'variant_id'    => env('LEMONSQUEEZY_PRO_VARIANT_ID'),
            'product_id'    => env('LEMONSQUEEZY_PRO_PRODUCT_ID'),
            'checkout_url'  => env('LEMONSQUEEZY_PRO_CHECKOUT_URL'),
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Upload rules
    |--------------------------------------------------------------------------
    */
    'uploads' => [
        'image_mimes'   => 'jpeg,png,jpg,webp,gif',
        'image_max_kb'  => 2048,     // 2 MB
        'video_mimes'   => 'mp4,webm,mov,m4v',
        'video_max_kb'  => 51200,    // 50 MB — must be <= post_max_size / upload_max_filesize
        'video_exts'    => ['mp4', 'webm', 'mov', 'm4v'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Proration behaviour when switching plans via the Lemon Squeezy API
    |--------------------------------------------------------------------------
    | false / false  -> prorated amount is added to the NEXT renewal invoice
    | true  / false  -> prorated amount is invoiced and charged IMMEDIATELY
    | any    / true  -> no proration; new price simply applies at next renewal
    */
    'invoice_immediately' => (bool) env('LEMONSQUEEZY_INVOICE_IMMEDIATELY', true),
    'disable_prorations'  => (bool) env('LEMONSQUEEZY_DISABLE_PRORATIONS', false),

];
