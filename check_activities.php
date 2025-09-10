<?php

require_once 'vendor/autoload.php';

use App\Models\Activity;

echo 'Total activities: ' . Activity::count() . PHP_EOL;
echo 'Recent 5 activities:' . PHP_EOL;

$activities = Activity::orderBy('created_at', 'desc')->limit(5)->get();
foreach($activities as $activity) {
    echo $activity->created_at . ' - ' . $activity->action . PHP_EOL;
}
