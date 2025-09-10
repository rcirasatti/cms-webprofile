<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;

class PortfolioSeeder extends Seeder
{
    public function run()
    {
        Portfolio::create([
            'title' => 'MOKO Smart Koi Pond',
            'description' => 'An innovative IoT solution that revolutionizes koi pond management with real-time water quality monitoring, feeding automation, and analytics.',
            'image_path' => '/assets/images/koi1-1.png',
            'category' => 'IoT',
            'is_active' => true,
            'order' => 1
        ]);

        Portfolio::create([
            'title' => 'AUTOFEEDER System',
            'description' => 'Automated fish feeding system with precision control, scheduling, and mobile app integration.',
            'image_path' => '/assets/images/autofeeder1-1.png',
            'category' => 'Automation',
            'is_active' => true,
            'order' => 2
        ]);

        Portfolio::create([
            'title' => 'MONIK Greenhouse',
            'description' => 'Complete greenhouse monitoring and automation for optimal plant growth conditions.',
            'image_path' => '/assets/images/hidroponik1-1.png',
            'category' => 'Agriculture',
            'is_active' => true,
            'order' => 3
        ]);

        Portfolio::create([
            'title' => 'Web Development Services',
            'description' => 'Professional web development services with modern technologies and responsive design.',
            'image_path' => '/assets/images/website.png',
            'category' => 'Web Development',
            'is_active' => true,
            'order' => 4
        ]);
    }
}
