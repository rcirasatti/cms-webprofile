<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\LandingPageContent;

class CheckContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:content';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check landing page content';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Total records: ' . LandingPageContent::count());
        
        $contents = LandingPageContent::all();
        
        if ($contents->isEmpty()) {
            $this->warn('No content found in database');
            return;
        }
        
        $this->table(
            ['Section', 'Key', 'Value', 'Active'],
            $contents->map(function ($item) {
                return [
                    $item->section,
                    $item->key,
                    substr($item->value, 0, 50) . (strlen($item->value) > 50 ? '...' : ''),
                    $item->is_active ? 'Yes' : 'No'
                ];
            })
        );
    }
}
