<?php

namespace App\Observers;

use App\Models\Project;
use App\Models\Activity;

class ProjectObserver
{
    /**
     * Handle the Project "created" event.
     */
    public function created(Project $project): void
    {
        Activity::log('created', $project, "Created project: {$project->title}");
    }

    /**
     * Handle the Project "updated" event.
     */
    public function updated(Project $project): void
    {
        $changes = $project->getChanges();
        $description = "Updated project: {$project->title}";

        if (!empty($changes)) {
            $changedFields = array_keys($changes);
            $description .= " (changed: " . implode(', ', $changedFields) . ")";
        }

        Activity::log('updated', $project, $description, $project->getOriginal(), $changes);
    }

    /**
     * Handle the Project "deleted" event.
     */
    public function deleted(Project $project): void
    {
        Activity::log('deleted', $project, "Deleted project: {$project->title}");
    }

    /**
     * Handle the Project "restored" event.
     */
    public function restored(Project $project): void
    {
        Activity::log('restored', $project, "Restored project: {$project->title}");
    }

    /**
     * Handle the Project "force deleted" event.
     */
    public function forceDeleted(Project $project): void
    {
        Activity::log('force_deleted', $project, "Permanently deleted project: {$project->title}");
    }
}
