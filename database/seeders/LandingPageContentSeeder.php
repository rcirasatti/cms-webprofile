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
            'value' => 'Welcome to Our Amazing Website',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'hero',
            'key' => 'subtitle',
            'value' => 'We create extraordinary digital experiences',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'hero',
            'key' => 'button_text',
            'value' => 'Get Started',
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
            'value' => 'We are a team of passionate developers and designers who love creating amazing digital experiences. Our mission is to help businesses grow through innovative technology solutions.',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'about',
            'key' => 'image',
            'value' => '/assets/images/about-us.jpg',
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

        LandingPageContent::create([
            'section' => 'portfolio',
            'key' => 'portfolio_1',
            'value' => 'Web Design Portfolio',
            'metadata' => [
                'category' => 'Web Design',
                'image' => '/assets/images/portfolio1.jpg',
                'link' => '#'
            ],
            'order' => 2,
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

        LandingPageContent::create([
            'section' => 'client',
            'key' => 'client_1',
            'value' => 'Company ABC',
            'metadata' => [
                'logo' => '/assets/images/client1.png',
                'website' => 'https://companyabc.com'
            ],
            'order' => 2,
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
            'value' => '123 Main Street, City, Country',
            'order' => 2,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'email',
            'value' => 'contact@ourcompany.com',
            'order' => 3,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'contact',
            'key' => 'phone',
            'value' => '+1 234 567 8900',
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
            'value' => '© 2025 Your Company. All rights reserved.',
            'order' => 1,
            'is_active' => true
        ]);

        LandingPageContent::create([
            'section' => 'footer',
            'key' => 'social_facebook',
            'value' => 'https://facebook.com/yourcompany',
            'metadata' => ['platform' => 'facebook'],
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
    }
}
