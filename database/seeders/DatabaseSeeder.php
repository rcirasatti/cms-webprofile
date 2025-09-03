<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Page;
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

        // Create sample pages
    }
}
