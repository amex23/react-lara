<?php

return [
    'paths' => ['api/*'],

    'allowed_origins' => [
        'https://www.shopmyday.store',
        'https://shopmyday.store',
        'https://your-shopify-store.myshopify.com',
    ],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];