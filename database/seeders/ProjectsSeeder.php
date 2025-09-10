<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LandingPageContent;

class ProjectsSeeder extends Seeder
{
    public function run()
    {
        // Delete existing project data except title
        LandingPageContent::where('section', 'project')
            ->where('key', '!=', 'title')
            ->delete();

        $projects = [
            [
                'title' => 'MOKO',
                'description' => 'MOKO memudahkan pengelolaan kolam koi',
                'image' => '/assets/images/koi1-1.png',
                'category' => 'IoT Solution'
            ],
            [
                'title' => 'AUTOFEEDER',
                'description' => 'Meningkatkan kualitas berbagai jenis ikan',
                'image' => '/assets/images/autofeeder1-1.png',
                'category' => 'IoT Solution'
            ],
            [
                'title' => 'MONIK',
                'description' => 'MONIK memudahkan pengelolaan greenhouse',
                'image' => '/assets/images/hidroponik1-1.png',
                'category' => 'IoT Solution'
            ],
            [
                'title' => 'MOBAN',
                'description' => 'MOBAN membantu memantau curah hujan di tempat yang rawan.',
                'image' => '/assets/images/monitoringhujan.png',
                'category' => 'IoT Solution'
            ],
            [
                'title' => 'MANIS',
                'description' => 'MANIS memudahkan pengelolaan lahan pertanian.',
                'image' => '/assets/images/penyiraman1-1.png',
                'category' => 'IoT Solution'
            ],
            [
                'title' => 'MOCKA',
                'description' => 'MOCKA untuk kandang ayam closed house dan konvensional',
                'image' => '/assets/images/kandangayam1-1.png',
                'category' => 'IoT Solution'
            ],
            [
                'title' => 'WEBSITE',
                'description' => 'Jasa pembuatan custom website',
                'image' => '/assets/images/website.png',
                'category' => 'Digital Solution'
            ],
            [
                'title' => 'ANDROID',
                'description' => 'Jasa pembuatan custom android',
                'image' => '/assets/images/androidd.png',
                'category' => 'Digital Solution'
            ]
        ];

        $order = 1;
        foreach ($projects as $index => $project) {
            $projectKey = 'project_' . ($index + 1);
            
            LandingPageContent::create([
                'section' => 'project',
                'key' => $projectKey . '_title',
                'value' => $project['title'],
                'order' => $order++,
                'is_active' => true
            ]);
            
            LandingPageContent::create([
                'section' => 'project',
                'key' => $projectKey . '_description',
                'value' => $project['description'],
                'order' => $order++,
                'is_active' => true
            ]);
            
            LandingPageContent::create([
                'section' => 'project',
                'key' => $projectKey . '_image',
                'value' => $project['image'],
                'order' => $order++,
                'is_active' => true
            ]);
            
            LandingPageContent::create([
                'section' => 'project',
                'key' => $projectKey . '_category',
                'value' => $project['category'],
                'order' => $order++,
                'is_active' => true
            ]);
        }
    }
}
