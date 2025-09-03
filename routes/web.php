<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CmsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
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
        Route::get('/about', [CmsController::class, 'about'])->name('about');
        Route::get('/project', [CmsController::class, 'project'])->name('project');
        Route::get('/portfolio', [CmsController::class, 'portfolio'])->name('portfolio');
        Route::get('/client', [CmsController::class, 'client'])->name('client');
        Route::get('/contact', [CmsController::class, 'contact'])->name('contact');
        Route::get('/navbar', [CmsController::class, 'navbar'])->name('navbar');
        Route::get('/footer', [CmsController::class, 'footer'])->name('footer');
        
        // CRUD operations
        Route::post('/content', [CmsController::class, 'store'])->name('content.store');
        Route::patch('/content/{content}', [CmsController::class, 'update'])->name('content.update');
        Route::delete('/content/{content}', [CmsController::class, 'destroy'])->name('content.destroy');
    });
});

require __DIR__.'/auth.php';
