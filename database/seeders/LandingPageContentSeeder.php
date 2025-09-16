<?php

namespace Database\Seeders;

use App\Models\LandingPageContent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LandingPageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hero Section
        LandingPageContent::create([
            'section' => 'hero',
            'key' => 'title',
            'value' => 'Welcome to OmahIoT',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'hero',
            'key' => 'subtitle',
            'value' => 'Transforming Ideas into Solutions with IoT and Digital Innovation',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'hero',
            'key' => 'button_text',
            'value' => 'Explore Our Solutions',
            'order' => 3,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'hero',
            'key' => 'background_image',
            'value' => '/assets/images/hero-bg.jpg',
            'metadata' => ['alt' => 'Hero Background'],
            'order' => 4,
            'is_active' => true
        ]);

        // About Section
        LandingPageContent::create([
            'section' => 'about',
            'key' => 'title',
            'value' => 'About Us',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'about',
            'key' => 'description',
            'value' => 'We are a pioneering technology company dedicated to bringing innovative IoT solutions to agricultural, aquacultural, and urban sectors, making technology accessible and impactful for everyone.',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'about',
            'key' => 'image',
            'value' => 'assets\images\omah-iot1.png',
            'metadata' => ['alt' => 'About Us Image'],
            'order' => 3,
            'is_active' => true
        ]);

        // Projects Section
        LandingPageContent::create([
            'section' => 'project',
            'key' => 'title',
            'value' => 'Our Projects',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'project',
            'key' => 'project_1',
            'value' => 'E-Commerce Platform',
            'metadata' => [
                'description' => 'A modern e-commerce solution built with React and Laravel',
                'image' => '/assets/images/project1.jpg',
                'link' => '#'
            ],
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'project',
            'key' => 'project_2',
            'value' => 'Mobile Banking App',
            'metadata' => [
                'description' => 'Secure and user-friendly mobile banking application',
                'image' => '/assets/images/project2.jpg',
                'link' => '#'
            ],
            'order' => 3,
            'is_active' => true
        ]);

        // Portfolio Section
        LandingPageContent::create([
            'section' => 'portfolio',
            'key' => 'title',
            'value' => 'Our Portfolio',
            'order' => 1,
            'is_active' => true
        ]);


        // Clients Section
        LandingPageContent::create([
            'section' => 'client',
            'key' => 'title',
            'value' => 'Our Clients',
            'order' => 1,
            'is_active' => true
        ]);

        // Contact Section
        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'title',
            'value' => 'Contact Us',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'address',
            'value' => 'Jl. Turus Asri IV No. 6, Bulusan, Kec. Tembalang, Kota Semarang, Jawa Tengah 50277',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'email',
            'value' => 'omahiot@gmail.com',
            'order' => 3,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'phone',
            'value' => '+62 8127-6253-242',
            'order' => 4,
            'is_active' => true
        ]);

        // Navbar Section
        LandingPageContent::create([
            'section' => 'navbar',
            'key' => 'logo_text',
            'value' => 'Your Company',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'navbar',
            'key' => 'logo_image',
            'value' => '/assets/images/logo.png',
            'metadata' => ['alt' => 'Company Logo'],
            'order' => 2,
            'is_active' => true
        ]);

        // Footer Section
        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'copyright',
            'value' => '© 2025 OmahIoT. All rights reserved.',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'social_facebook',
            'value' => 'https://facebook.com/yourcompany',
            'metadata' => ['platform' => 'linkedin'],
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'social_instagram',
            'value' => 'https://instagram.com/yourcompany',
            'metadata' => ['platform' => 'instagram'],
            'order' => 3,
            'is_active' => true
        ]);
        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'social_instagram',
            'value' => 'https://instagram.com/yourcompany',
            'metadata' => ['platform' => 'youtube'],
            'order' => 3,
            'is_active' => true
        ]);

        // Contact Section
        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'title',
            'value' => 'Contact Us',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'description',
            'value' => 'Tertarik dengan layanan kami? Hubungi kami sekarang untuk konsultasi gratis dan temukan solusi terbaik untuk bisnis Anda.',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'email',
            'value' => 'omahiot@gmail.com',
            'order' => 3,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'phone',
            'value' => '+62 8127-6253-242',
            'order' => 4,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'address',
            'value' => 'Jl. Turus Asri IV No. 6, Bulusan, Kec. Tembalang, Kota Semarang, Jawa Tengah 50277',
            'order' => 5,
            'is_active' => true
        ]);
    }
}
