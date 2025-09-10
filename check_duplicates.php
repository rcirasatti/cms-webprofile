<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Portfolio;

echo 'Checking for duplicate portfolios...' . PHP_EOL;

$duplicates = Portfolio::select('title')
    ->groupBy('title')
    ->havingRaw('COUNT(*) > 1')
    ->get();

if ($duplicates->isEmpty()) {
    echo 'No duplicates found!' . PHP_EOL;
} else {
    echo 'Found duplicates:' . PHP_EOL;
    foreach ($duplicates as $duplicate) {
        $portfolios = Portfolio::where('title', $duplicate->title)->get();
        echo '- ' . $duplicate->title . ' (' . $portfolios->count() . ' copies)' . PHP_EOL;
        foreach ($portfolios as $portfolio) {
            echo '  ID: ' . $portfolio->id . ', Order: ' . $portfolio->order . PHP_EOL;
        }
    }
}

echo PHP_EOL . 'Total portfolios: ' . Portfolio::count() . PHP_EOL;
