<?php

return [
    'api' => [
        'url' => env('BASE_URL', ''),
        'prefix' => env('API_PREFIX', ''),
        'key' => env('API_KEY', '')
    ],
    'google' => [
        'api_key' => env('GOOGLE_API_KEY')
    ]
];