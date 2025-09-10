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

        // Transfer existing data from landing_page_contents to dedicated tables
        $this->call([
            TransferDataSeeder::class,
        ]);

        // Create sample pages
    }
}
