<?php

require_once __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Portfolio;

$portfolio = Portfolio::first();
if ($portfolio) {
    $portfolio->title = 'Updated Test Portfolio';
    $portfolio->save();
    echo "Portfolio updated successfully\n";
} else {
    echo "No portfolio found\n";
}
