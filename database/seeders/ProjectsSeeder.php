<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        Project::truncate();

        $projects = [
            [
                'title' => 'MOKO',
                'description' => 'MOKO memudahkan pengelolaan kolam koi dengan monitoring kualitas air real-time',
                'image_path' => '/assets/images/koi1-1.png',
                'category' => 'IoT Solution',
                'is_active' => true,
                'order' => 1
            ],
            [
                'title' => 'AUTOFEEDER',
                'description' => 'Meningkatkan kualitas berbagai jenis ikan dengan sistem pemberian pakan otomatis',
                'image_path' => '/assets/images/autofeeder1-1.png',
                'category' => 'IoT Solution',
                'is_active' => true,
                'order' => 2
            ],
            [
                'title' => 'MONIK',
                'description' => 'MONIK memudahkan pengelolaan greenhouse dengan monitoring suhu dan kelembaban',
                'image_path' => '/assets/images/hidroponik1-1.png',
                'category' => 'IoT Solution',
                'is_active' => true,
                'order' => 3
            ],
            [
                'title' => 'MOBAN',
                'description' => 'MOBAN membantu memantau curah hujan di tempat yang rawan banjir',
                'image_path' => '/assets/images/monitoringhujan.png',
                'category' => 'IoT Solution',
                'is_active' => true,
                'order' => 4
            ],
            [
                'title' => 'MANIS',
                'description' => 'MANIS memudahkan pengelolaan lahan pertanian dengan sistem irigasi pintar',
                'image_path' => '/assets/images/penyiraman1-1.png',
                'category' => 'IoT Solution',
                'is_active' => true,
                'order' => 5
            ],
            [
                'title' => 'MOCKA',
                'description' => 'MOCKA untuk kandang ayam closed house dan konvensional dengan monitoring otomatis',
                'image_path' => '/assets/images/kandangayam1-1.png',
                'category' => 'IoT Solution',
                'is_active' => true,
                'order' => 6
            ],
            [
                'title' => 'Website Development',
                'description' => 'Jasa pembuatan custom website dengan teknologi modern dan responsive design',
                'image_path' => '/assets/images/website.png',
                'category' => 'Digital Solution',
                'is_active' => true,
                'order' => 7
            ],
            [
                'title' => 'Android App Development',
                'description' => 'Jasa pembuatan custom aplikasi android sesuai kebutuhan bisnis Anda',
                'image_path' => '/assets/images/androidd.png',
                'category' => 'Digital Solution',
                'is_active' => true,
                'order' => 8
            ]
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        $this->command->info('✅ Created ' . count($projects) . ' projects in projects table');
    }
}
