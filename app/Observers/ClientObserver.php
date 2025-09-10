<?php

namespace App\Observers;

use App\Models\Client;
use App\Models\Activity;

class ClientObserver
{
    /**
     * Handle the Client "created" event.
     */
    public function created(Client $client): void
    {
        Activity::log('created', $client, "Created client: {$client->name}");
    }

    /**
     * Handle the Client "updated" event.
     */
    public function updated(Client $client): void
    {
        $changes = $client->getChanges();
        $description = "Updated client: {$client->name}";

        if (!empty($changes)) {
            $changedFields = array_keys($changes);
            $description .= " (changed: " . implode(', ', $changedFields) . ")";
        }

        Activity::log('updated', $client, $description, $client->getOriginal(), $changes);
    }

    /**
     * Handle the Client "deleted" event.
     */
    public function deleted(Client $client): void
    {
        Activity::log('deleted', $client, "Deleted client: {$client->name}");
    }

    /**
     * Handle the Client "restored" event.
     */
    public function restored(Client $client): void
    {
        Activity::log('restored', $client, "Restored client: {$client->name}");
    }

    /**
     * Handle the Client "force deleted" event.
     */
    public function forceDeleted(Client $client): void
    {
        Activity::log('force_deleted', $client, "Permanently deleted client: {$client->name}");
    }
}
