<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Api\LandingPageController;

// Public API for landing page data
Route::get('/landing-page', [LandingPageController::class, 'index']);
Route::get('/landing-page/{section}', [LandingPageController::class, 'section']);

