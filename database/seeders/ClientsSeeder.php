<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientsSeeder extends Seeder
{
    public function run()
    {
        // Clear existing data
        Client::truncate();

        $clients = [
            ['name' => 'Bawen', 'logo_path' => '/assets/images/logo/bawen.png', 'is_active' => true, 'order' => 1],
            ['name' => 'HAB', 'logo_path' => '/assets/images/logo/hab.png', 'is_active' => true, 'order' => 2],
            ['name' => 'JG Koi', 'logo_path' => '/assets/images/logo/jgkoi.jpg', 'is_active' => true, 'order' => 3],
            ['name' => 'Kartika', 'logo_path' => '/assets/images/logo/kartika.jpg', 'is_active' => true, 'order' => 4],
            ['name' => 'Kois', 'logo_path' => '/assets/images/logo/kois.png', 'is_active' => true, 'order' => 5],
            ['name' => 'MKC', 'logo_path' => '/assets/images/logo/logo_mkc.jpg', 'is_active' => true, 'order' => 6],
            ['name' => 'ZNA Malaysia', 'logo_path' => '/assets/images/logo/logoznamalaysiaasli.jpg', 'is_active' => true, 'order' => 7],
            ['name' => 'Mustika', 'logo_path' => '/assets/images/logo/mustika.png', 'is_active' => true, 'order' => 8],
            ['name' => 'Polines', 'logo_path' => '/assets/images/logo/polines.png', 'is_active' => true, 'order' => 9],
            ['name' => 'Renadjaja', 'logo_path' => '/assets/images/logo/renadjaja.jpg', 'is_active' => true, 'order' => 10],
            ['name' => 'Turus', 'logo_path' => '/assets/images/logo/turus.png', 'is_active' => true, 'order' => 11],
            ['name' => 'Singapore Koi Show', 'logo_path' => '/assets/images/logo/singaporekoishow.jpg', 'is_active' => true, 'order' => 12]
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }

        $this->command->info('✅ Created ' . count($clients) . ' clients in clients table');
    }
}
