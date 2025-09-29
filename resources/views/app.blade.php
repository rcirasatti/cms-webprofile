<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- SEO Meta Tags -->
        <meta name="description" content="OmahIoT - Innovative IoT Solutions for Agriculture, Aquaculture & Urban Development">
        <meta name="keywords" content="IoT, Smart Agriculture, Aquaculture, Technology Solutions, OmahIoT">
        <meta name="author" content="OmahIoT">
        <meta name="robots" content="index, follow">
        
        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="OmahIoT - Smart IoT Solutions">
        <meta property="og:description" content="Pioneering technology company bringing innovative IoT solutions to agricultural, aquacultural, and urban sectors">
        <meta property="og:image" content="{{ asset('assets/images/logo_omahiot.png') }}">
        <meta property="og:url" content="{{ url('/') }}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="OmahIoT">
        
        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="OmahIoT - Smart IoT Solutions">
        <meta name="twitter:description" content="Innovative IoT solutions for modern living and agriculture">
        <meta name="twitter:image" content="{{ asset('assets/images/logo_omahiot.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
