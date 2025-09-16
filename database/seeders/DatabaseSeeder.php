<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@omahiot.com',
            'password' => bcrypt('password123'),
        ]);

        // Seed all content
        $this->call([
            LandingPageContentSeeder::class,
            PortfolioSeeder::class,
            ProjectsSeeder::class,
            ClientsSeeder::class,
        ]);
    }
}
