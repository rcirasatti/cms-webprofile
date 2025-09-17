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

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'maps_url',
            'value' => 'https://maps.app.goo.gl/eDAVoRHqWmoYPwfb6',
            'order' => 6,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'maps_embed',
            'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.677076283!2d110.4445869!3d-7.057509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708ea05820d3dd%3A0x16c41b874ec723a9!2sJl.+Turus+Asri+IV+No.6%2C+Bulusan%2C+Kec.+Tembalang%2C+Kota+Semarang%2C+Jawa+Tengah+50277!5e0!3m2!1sid!2sid!4v1691234567890!5m2!1sid!2sid',
            'order' => 7,
            'is_active' => true
        ]);

        // Navbar Section
        LandingPageContent::create([
            'section' => 'navbar',
            'key' => 'logo_text',
            'value' => 'OmahIoT',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'navbar',
            'key' => 'logo_image',
            'value' => '/assets/images/logo_omahiot.png',
            'metadata' => ['alt' => 'OmahIoT Logo'],
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
            'key' => 'tagline',
            'value' => 'Connect With Our Thinks.',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'address',
            'value' => 'Jl. Turus Asri IV No. 6, Bulusan, Kec. Tembalang, Kota Semarang, Jawa Tengah 50277',
            'order' => 3,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'phone',
            'value' => '+62 8127-6253-242',
            'order' => 4,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'email',
            'value' => 'omahiot@gmail.com',
            'order' => 5,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'social_instagram',
            'value' => 'https://www.instagram.com/omahiot/',
            'metadata' => ['platform' => 'instagram'],
            'order' => 6,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'social_linkedin',
            'value' => 'https://www.linkedin.com/company/cv-omah-iot',
            'metadata' => ['platform' => 'linkedin'],
            'order' => 7,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'social_youtube',
            'value' => 'https://www.youtube.com/@omahiot3953',
            'metadata' => ['platform' => 'youtube'],
            'order' => 8,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'maps_url',
            'value' => 'https://maps.app.goo.gl/eDAVoRHqWmoYPwfb6',
            'order' => 9,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'maps_embed',
            'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.677076283!2d110.4445869!3d-7.057509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708ea05820d3dd%3A0x16c41b874ec723a9!2sJl.+Turus+Asri+IV+No.6%2C+Bulusan%2C+Kec.+Tembalang%2C+Kota+Semarang%2C+Jawa+Tengah+50277!5e0!3m2!1sid!2sid!4v1691234567890!5m2!1sid!2sid',
            'order' => 10,
            'is_active' => true
        ]);
    }
}
