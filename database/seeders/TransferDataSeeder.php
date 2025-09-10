<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LandingPageContent;
use App\Models\Client;
use App\Models\Project;

class TransferDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting data transfer from landing_page_contents to dedicated tables...');

        // Transfer Projects
        $this->transferProjects();

        // Transfer Clients
        $this->transferClients();

        // Clean up old data
        $this->cleanupOldData();

        $this->command->info('Data transfer completed successfully!');
    }

    private function transferProjects()
    {
        $this->command->info('Transferring projects...');

        $projectContents = LandingPageContent::where('section', 'project')
            ->where('key', 'like', 'project_%')
            ->get();

        $projectsMap = [];

        foreach ($projectContents as $content) {
            // Extract project ID and field from key (e.g., "project_1_title" -> ID: 1, field: title)
            if (preg_match('/project_(\d+)_(.+)/', $content->key, $matches)) {
                $projectId = $matches[1];
                $field = $matches[2];

                if (!isset($projectsMap[$projectId])) {
                    $projectsMap[$projectId] = [
                        'title' => '',
                        'description' => '',
                        'category' => '',
                        'image_path' => '',
                        'is_active' => true,
                        'order' => $projectId
                    ];
                }

                // Map the field to the appropriate column
                switch ($field) {
                    case 'title':
                        $projectsMap[$projectId]['title'] = $content->value;
                        break;
                    case 'description':
                        $projectsMap[$projectId]['description'] = $content->value;
                        break;
                    case 'category':
                        $projectsMap[$projectId]['category'] = $content->value;
                        break;
                    case 'image':
                        $projectsMap[$projectId]['image_path'] = $content->value;
                        break;
                }
            }
        }

        // Create projects in database
        foreach ($projectsMap as $projectData) {
            Project::create($projectData);
            $this->command->info("Created project: {$projectData['title']}");
        }

        $this->command->info('Projects transfer completed. ' . count($projectsMap) . ' projects created.');
    }

    private function transferClients()
    {
        $this->command->info('Transferring clients...');

        $clientContents = LandingPageContent::where('section', 'client')
            ->where('key', 'like', 'client_%')
            ->get();

        $clientsMap = [];

        foreach ($clientContents as $content) {
            // Extract client ID and field from key (e.g., "client_1_name" -> ID: 1, field: name)
            if (preg_match('/client_(\d+)_(.+)/', $content->key, $matches)) {
                $clientId = $matches[1];
                $field = $matches[2];

                if (!isset($clientsMap[$clientId])) {
                    $clientsMap[$clientId] = [
                        'name' => '',
                        'logo_path' => '',
                        'is_active' => true,
                        'order' => $clientId
                    ];
                }

                // Map the field to the appropriate column
                switch ($field) {
                    case 'name':
                        $clientsMap[$clientId]['name'] = $content->value;
                        break;
                    case 'logo':
                        $clientsMap[$clientId]['logo_path'] = $content->value;
                        break;
                }
            }
        }

        // Create clients in database
        foreach ($clientsMap as $clientData) {
            Client::create($clientData);
            $this->command->info("Created client: {$clientData['name']}");
        }

        $this->command->info('Clients transfer completed. ' . count($clientsMap) . ' clients created.');
    }

    private function cleanupOldData()
    {
        $this->command->info('Cleaning up old data...');

        // Delete project-related content
        $deletedProjects = LandingPageContent::where('section', 'project')
            ->where('key', 'like', 'project_%')
            ->delete();

        // Delete client-related content
        $deletedClients = LandingPageContent::where('section', 'client')
            ->where('key', 'like', 'client_%')
            ->delete();

        $this->command->info("Deleted {$deletedProjects} project records and {$deletedClients} client records from landing_page_contents.");
    }
}
