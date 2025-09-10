<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Portfolio;

echo 'Fixing portfolio ordering...' . PHP_EOL;

// Get current portfolios ordered by creation date
$portfolios = Portfolio::orderBy('created_at')->get();

$order = 1;
foreach ($portfolios as $portfolio) {
    echo 'Updating ' . $portfolio->title . ' (ID: ' . $portfolio->id . ') to order ' . $order . PHP_EOL;
    $portfolio->update(['order' => $order]);
    $order++;
}

echo PHP_EOL . 'Ordering fixed!' . PHP_EOL;

// Show final result
echo PHP_EOL . 'Final portfolio order:' . PHP_EOL;
$finalPortfolios = Portfolio::orderBy('order')->get();
foreach ($finalPortfolios as $portfolio) {
    echo $portfolio->order . '. ' . $portfolio->title . ' (ID: ' . $portfolio->id . ')' . PHP_EOL;
}
