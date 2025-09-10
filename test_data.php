<?php

require_once 'vendor/autoload.php';

use App\Models\LandingPageContent;
use App\Models\Project;
use App\Models\Client;

$sections = ['hero', 'about', 'project', 'portfolio', 'client', 'contact', 'navbar', 'footer'];
$content = [];

foreach ($sections as $section) {
    $content[$section] = LandingPageContent::bySection($section)
        ->active()
        ->ordered()
        ->get()
        ->map(function ($item) {
            return [
                'key' => $item->key,
                'value' => $item->value,
                'metadata' => $item->metadata,
                'order' => $item->order
            ];
        })->toArray();
}

$content['projects'] = Project::active()
    ->ordered()
    ->get()
    ->map(function ($project) {
        return [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'category' => $project->category,
            'image_path' => $project->image_path,
            'is_active' => $project->is_active,
            'order' => $project->order
        ];
    })->toArray();

$content['clients'] = Client::active()
    ->ordered()
    ->get()
    ->map(function ($client) {
        return [
            'id' => $client->id,
            'name' => $client->name,
            'logo_path' => $client->logo_path,
            'is_active' => $client->is_active,
            'order' => $client->order
        ];
    })->toArray();

echo 'Project title: ' . ($content['project'][0]['value'] ?? 'Not found') . PHP_EOL;
echo 'Projects count: ' . count($content['projects']) . PHP_EOL;
echo 'Clients count: ' . count($content['clients']) . PHP_EOL;

echo 'Sample project data:' . PHP_EOL;
if (count($content['projects']) > 0) {
    print_r($content['projects'][0]);
}

echo 'Sample client data:' . PHP_EOL;
if (count($content['clients']) > 0) {
    print_r($content['clients'][0]);
}
