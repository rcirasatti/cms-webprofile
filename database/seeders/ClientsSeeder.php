<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LandingPageContent;

class ClientsSeeder extends Seeder
{
    public function run()
    {
        // Delete existing client data except title
        LandingPageContent::where('section', 'client')
            ->where('key', '!=', 'title')
            ->delete();

        $clients = [
            ['name' => 'Bawen', 'logo' => '/assets/images/logo/bawen.png'],
            ['name' => 'HAB', 'logo' => '/assets/images/logo/hab.png'],
            ['name' => 'JG Koi', 'logo' => '/assets/images/logo/jgkoi.jpg'],
            ['name' => 'Kartika', 'logo' => '/assets/images/logo/kartika.jpg'],
            ['name' => 'Kois', 'logo' => '/assets/images/logo/kois.png'],
            ['name' => 'MKC', 'logo' => '/assets/images/logo/logo_mkc.jpg'],
            ['name' => 'ZNA Malaysia', 'logo' => '/assets/images/logo/logoznamalaysiaasli.jpg'],
            ['name' => 'Mustika', 'logo' => '/assets/images/logo/mustika.png'],
            ['name' => 'Polines', 'logo' => '/assets/images/logo/polines.png'],
            ['name' => 'Renadjaja', 'logo' => '/assets/images/logo/renadjaja.jpg'],
            ['name' => 'Turus', 'logo' => '/assets/images/logo/turus.png'],
            ['name' => 'Singapore Koi Show', 'logo' => '/assets/images/logo/singaporekoishow.jpg']
        ];

        $order = 1;
        foreach ($clients as $index => $client) {
            $clientKey = 'client_' . ($index + 1);
            
            LandingPageContent::create([
                'section' => 'client',
                'key' => $clientKey . '_name',
                'value' => $client['name'],
                'order' => $order++,
                'is_active' => true
            ]);
            
            LandingPageContent::create([
                'section' => 'client',
                'key' => $clientKey . '_logo',
                'value' => $client['logo'],
                'order' => $order++,
                'is_active' => true
            ]);
        }
    }
}
