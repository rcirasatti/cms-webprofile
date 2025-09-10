<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Portfolio;

echo 'Checking portfolio data in database...' . PHP_EOL;

$portfolios = Portfolio::all();

foreach ($portfolios as $portfolio) {
    echo PHP_EOL . 'Portfolio: ' . $portfolio->title . PHP_EOL;
    echo 'ID: ' . $portfolio->id . PHP_EOL;
    echo 'Category: ' . ($portfolio->category ?? 'NULL') . PHP_EOL;
    echo 'Tags: ' . json_encode($portfolio->tags) . PHP_EOL;
    echo 'Features: ' . json_encode($portfolio->features) . PHP_EOL;
    echo 'Is Active: ' . ($portfolio->is_active ? 'true' : 'false') . PHP_EOL;
    echo 'Order: ' . $portfolio->order . PHP_EOL;
    echo '---' . PHP_EOL;
}
