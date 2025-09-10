<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Portfolio;

echo 'Updating existing portfolios with tags and features...' . PHP_EOL;

// Update MOKO Smart Koi Pond
$mokoPortfolio = Portfolio::where('title', 'MOKO Smart Koi Pond')->first();
if ($mokoPortfolio) {
    $mokoPortfolio->update([
        'tags' => ['IoT', 'Smart Monitoring', 'Aquaculture', 'Mobile App'],
        'features' => [
            '24/7 water quality monitoring with alerts',
            'Automated feeding and maintenance scheduling',
            'Data analytics for optimal pond health',
            'Real-time pH, temperature, and oxygen level tracking'
        ]
    ]);
    echo 'Updated MOKO Smart Koi Pond' . PHP_EOL;
}

// Update AUTOFEEDER System
$autofeederPortfolio = Portfolio::where('title', 'AUTOFEEDER System')->first();
if ($autofeederPortfolio) {
    $autofeederPortfolio->update([
        'tags' => ['IoT', 'Aquaculture', 'Smart Monitoring'],
        'features' => [
            'Automated fish feeding system',
            'Remote monitoring and control',
            'Energy-efficient design',
            'Customizable feeding schedules'
        ]
    ]);
    echo 'Updated AUTOFEEDER System' . PHP_EOL;
}

// Update MONIK Greenhouse
$monikPortfolio = Portfolio::where('title', 'MONIK Greenhouse')->first();
if ($monikPortfolio) {
    $monikPortfolio->update([
        'tags' => ['IoT', 'Smart Monitoring', 'Aquaculture'],
        'features' => [
            'Climate control automation',
            'Humidity and temperature monitoring',
            'Energy optimization',
            'Remote greenhouse management'
        ]
    ]);
    echo 'Updated MONIK Greenhouse' . PHP_EOL;
}

// Update Web Development Services
$webPortfolio = Portfolio::where('title', 'Web Development Services')->first();
if ($webPortfolio) {
    $webPortfolio->update([
        'tags' => ['Web Development', 'Digital Solution'],
        'features' => [
            'Custom web application development',
            'Responsive design implementation',
            'Performance optimization',
            'SEO-friendly architecture'
        ]
    ]);
    echo 'Updated Web Development Services' . PHP_EOL;
}

// Update Test Portfolio
$testPortfolio = Portfolio::where('title', 'Test Portfolio')->first();
if ($testPortfolio) {
    $testPortfolio->update([
        'tags' => ['Digital Solution', 'Consulting'],
        'features' => [
            'Business process analysis',
            'Technology consulting',
            'System integration',
            'Project management'
        ]
    ]);
    echo 'Updated Test Portfolio' . PHP_EOL;
}

echo PHP_EOL . 'All portfolios updated successfully!' . PHP_EOL;

// Show updated data
echo PHP_EOL . 'Updated portfolio data:' . PHP_EOL;
$portfolios = Portfolio::all();
foreach ($portfolios as $portfolio) {
    echo PHP_EOL . $portfolio->title . ':' . PHP_EOL;
    echo 'Tags: ' . implode(', ', $portfolio->tags ?? []) . PHP_EOL;
    echo 'Features: ' . implode(' | ', $portfolio->features ?? []) . PHP_EOL;
}
