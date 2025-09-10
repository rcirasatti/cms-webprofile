<?php

namespace App\Observers;

use App\Models\Portfolio;
use App\Models\Activity;

class PortfolioObserver
{
    /**
     * Handle the Portfolio "created" event.
     */
    public function created(Portfolio $portfolio): void
    {
        Activity::log('created', $portfolio, "Created portfolio: {$portfolio->title}");
    }

    /**
     * Handle the Portfolio "updated" event.
     */
    public function updated(Portfolio $portfolio): void
    {
        $changes = $portfolio->getChanges();
        $description = "Updated portfolio: {$portfolio->title}";

        if (!empty($changes)) {
            $changedFields = array_keys($changes);
            $description .= " (changed: " . implode(', ', $changedFields) . ")";
        }

        Activity::log('updated', $portfolio, $description, $portfolio->getOriginal(), $changes);
    }

    /**
     * Handle the Portfolio "deleted" event.
     */
    public function deleted(Portfolio $portfolio): void
    {
        Activity::log('deleted', $portfolio, "Deleted portfolio: {$portfolio->title}");
    }

    /**
     * Handle the Portfolio "restored" event.
     */
    public function restored(Portfolio $portfolio): void
    {
        Activity::log('restored', $portfolio, "Restored portfolio: {$portfolio->title}");
    }

    /**
     * Handle the Portfolio "force deleted" event.
     */
    public function forceDeleted(Portfolio $portfolio): void
    {
        Activity::log('force_deleted', $portfolio, "Permanently deleted portfolio: {$portfolio->title}");
    }
}
