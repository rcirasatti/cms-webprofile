<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CmsController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $sections = ['hero', 'about', 'project', 'portfolio', 'client', 'contact', 'navbar', 'footer'];
    $content = [];

    // Get content from landing_page_contents for other sections
    foreach ($sections as $section) {
        $content[$section] = \App\Models\LandingPageContent::bySection($section)
            ->active()
            ->ordered()
            ->get()
            ->map(function ($item) {
                return [
                    'key' => $item->key,
                    'value' => $item->value,
                    'metadata' => $item->metadata,
                    'order' => $item->order
                ];
            });
    }

    // Get projects from dedicated projects table
    $content['projects'] = \App\Models\Project::active()
        ->ordered()
        ->get()
        ->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'category' => $project->category,
                'image_path' => $project->image_path,
                'is_active' => $project->is_active,
                'order' => $project->order
            ];
        });

    // Get clients from dedicated clients table
    $content['clients'] = \App\Models\Client::active()
        ->ordered()
        ->get()
        ->map(function ($client) {
            return [
                'id' => $client->id,
                'name' => $client->name,
                'logo_path' => $client->logo_path,
                'is_active' => $client->is_active,
                'order' => $client->order
            ];
        });

    // Get portfolios from dedicated portfolios table
    $content['portfolios'] = \App\Models\Portfolio::active()
        ->ordered()
        ->get()
        ->map(function ($portfolio) {
            return [
                'id' => $portfolio->id,
                'title' => $portfolio->title,
                'description' => $portfolio->description,
                'image_path' => $portfolio->image_path,
                'category' => $portfolio->category,
                'is_active' => $portfolio->is_active,
                'order' => $portfolio->order,
                'tags' => $portfolio->tags,
                'features' => $portfolio->features
            ];
        });

    return Inertia::render('LandingPage', [
        'content' => $content
    ]);
});

Route::get('/dashboard', function () {
    // Get actual statistics
    $stats = [
        'totalPortfolios' => \App\Models\Portfolio::count(),
        'totalProjects' => \App\Models\Project::count(),
        'totalClients' => \App\Models\Client::count(),
        'totalContent' => \App\Models\LandingPageContent::count(),
        'activeContent' => \App\Models\LandingPageContent::where('is_active', true)->count(),
        'recentActivities' => \App\Services\ActivityService::getRecentActivities(10)
    ];

    return Inertia::render('DashboardWithSidebar', [
        'stats' => $stats
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // CMS Routes
    Route::prefix('cms')->name('cms.')->group(function () {
        Route::get('/sections', [CmsController::class, 'sections'])->name('sections');
        Route::get('/section/{section}', [CmsController::class, 'sectionContent'])->name('section.content');
        
        // Individual section routes
        Route::get('/hero', [CmsController::class, 'hero'])->name('hero');
        Route::post('/hero/update', [CmsController::class, 'updateHero'])->name('hero.update');
        Route::get('/about', [CmsController::class, 'about'])->name('about');
        Route::post('/about/update', [CmsController::class, 'updateAbout'])->name('about.update');
        Route::get('/project', [ProjectController::class, 'index'])->name('project');
        Route::get('/portfolio', [PortfolioController::class, 'index'])->name('portfolio');
        Route::get('/client', [ClientController::class, 'index'])->name('client');
        Route::get('/contact', [CmsController::class, 'contact'])->name('contact');
        Route::get('/navbar', [CmsController::class, 'navbar'])->name('navbar');
        Route::get('/footer', [CmsController::class, 'footer'])->name('footer');
        Route::get('/activities', [CmsController::class, 'activities'])->name('activities');
        
        // CRUD operations
        Route::post('/content', [CmsController::class, 'store'])->name('content.store');
        Route::patch('/content/{content}', [CmsController::class, 'update'])->name('content.update');
        Route::delete('/content/{content}', [CmsController::class, 'destroy'])->name('content.destroy');
        
        // Client CRUD operations
        Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');
        Route::patch('/clients/{client}', [ClientController::class, 'update'])->name('clients.update');
        Route::delete('/clients/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');
        
        // Project CRUD operations
        Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::patch('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
        
        // Portfolio CRUD operations
        Route::post('/portfolios', [PortfolioController::class, 'store'])->name('portfolios.store');
        Route::patch('/portfolios/{portfolio}', [PortfolioController::class, 'update'])->name('portfolios.update');
        Route::delete('/portfolios/{portfolio}', [PortfolioController::class, 'destroy'])->name('portfolios.destroy');
        
        // Preview route to test landing page after changes
        Route::get('/preview', function () {
            return redirect('/');
        })->name('preview');
    });
});

require __DIR__.'/auth.php';
