<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Portfolio;

echo 'Cleaning up duplicate portfolios...' . PHP_EOL;

$duplicateTitles = [
    'AUTOFEEDER System',
    'MOKO Smart Koi Pond',
    'MONIK Greenhouse',
    'Web Development Services'
];

$deletedCount = 0;

foreach ($duplicateTitles as $title) {
    $portfolios = Portfolio::where('title', $title)->orderBy('id')->get();

    if ($portfolios->count() > 1) {
        echo 'Processing: ' . $title . PHP_EOL;

        // Keep the first one (lowest ID), delete the rest
        $keep = $portfolios->first();
        $toDelete = $portfolios->skip(1);

        echo '  Keeping ID: ' . $keep->id . PHP_EOL;

        foreach ($toDelete as $portfolio) {
            echo '  Deleting ID: ' . $portfolio->id . PHP_EOL;
            $portfolio->delete();
            $deletedCount++;
        }
    }
}

echo PHP_EOL . 'Cleanup completed!' . PHP_EOL;
echo 'Deleted ' . $deletedCount . ' duplicate portfolios' . PHP_EOL;
echo 'Remaining portfolios: ' . Portfolio::count() . PHP_EOL;

// Show remaining portfolios
echo PHP_EOL . 'Remaining portfolios:' . PHP_EOL;
$remaining = Portfolio::orderBy('order')->get();
foreach ($remaining as $portfolio) {
    echo '- ' . $portfolio->title . ' (ID: ' . $portfolio->id . ', Order: ' . $portfolio->order . ')' . PHP_EOL;
}
