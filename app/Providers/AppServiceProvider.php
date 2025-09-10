<?php

namespace App\Providers;

use App\Models\Portfolio;
use App\Models\Project;
use App\Models\Client;
use App\Observers\PortfolioObserver;
use App\Observers\ProjectObserver;
use App\Observers\ClientObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Register model observers for activity logging
        Portfolio::observe(PortfolioObserver::class);
        Project::observe(ProjectObserver::class);
        Client::observe(ClientObserver::class);
    }
}
