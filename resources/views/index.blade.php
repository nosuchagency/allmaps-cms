<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }}</title>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <!-- Scripts -->
    <script src="https://maps.googleapis.com/maps/api/js?key={{config('bb.google.api_key')}}"
            async
            defer>
    </script>

    <script>
        window.apiSettings = {
            baseUrl: "{{config('bb.api.url')}}",
            prefix: "{{config('bb.api.prefix')}}"
        };
    </script>
</head>
<body>
<div id="app"></div>

<!-- Scripts -->
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
