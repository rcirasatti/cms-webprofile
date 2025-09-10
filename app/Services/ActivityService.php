<?php

namespace App\Services;

use App\Models\Activity;
use Carbon\Carbon;

class ActivityService
{
    /**
     * Get recent activities formatted for the dashboard
     */
    public static function getRecentActivities($limit = 10)
    {
        $activities = Activity::with('user')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        return $activities->map(function ($activity) {
            return [
                'action' => self::formatActivityDescription($activity),
                'time' => self::getRelativeTime($activity->created_at),
                'icon' => self::getActivityIcon($activity->action),
                'created_at' => $activity->created_at->toISOString(),
            ];
        });
    }

    /**
     * Get the last activity timestamp for showing when the system was last updated
     */
    public static function getLastActivityTime()
    {
        $lastActivity = Activity::orderBy('created_at', 'desc')->first();

        if ($lastActivity) {
            return self::getRelativeTime($lastActivity->created_at);
        }

        return 'No recent activity';
    }

    /**
     * Format activity description based on the action and model
     */
    private static function formatActivityDescription($activity)
    {
        $modelName = self::getModelDisplayName($activity->model_type);
        $modelTitle = self::getModelTitle($activity);

        switch ($activity->action) {
            case 'created':
                return "Added new {$modelName}: {$modelTitle}";
            case 'updated':
                return "Updated {$modelName}: {$modelTitle}";
            case 'deleted':
                return "Deleted {$modelName}: {$modelTitle}";
            case 'restored':
                return "Restored {$modelName}: {$modelTitle}";
            case 'force_deleted':
                return "Permanently deleted {$modelName}: {$modelTitle}";
            default:
                return $activity->description ?? "Modified {$modelName}: {$modelTitle}";
        }
    }

    /**
     * Get display name for model type
     */
    private static function getModelDisplayName($modelType)
    {
        return match ($modelType) {
            'App\Models\Portfolio' => 'portfolio',
            'App\Models\Project' => 'project',
            'App\Models\Client' => 'client',
            'App\Models\LandingPageContent' => 'content',
            'App\Models\User' => 'user',
            'App\Models\Activity' => 'activity',
            default => 'content', // Changed from 'item' to 'content'
        };
    }

    /**
     * Get the title/name of the model from the activity
     */
    private static function getModelTitle($activity)
    {
        try {
            $model = $activity->model;
            if ($model) {
                return match ($activity->model_type) {
                    'App\Models\Portfolio' => $model->title,
                    'App\Models\Project' => $model->title,
                    'App\Models\Client' => $model->name,
                    'App\Models\LandingPageContent' => $model->key ?? 'Content',
                    'App\Models\User' => $model->name ?? $model->email,
                    'App\Models\Activity' => 'Activity Log',
                    default => 'Content Item',
                };
            }
        } catch (\Exception $e) {
            // Model might have been deleted, try to get from description or old_values
            if ($activity->old_values) {
                return match ($activity->model_type) {
                    'App\Models\Portfolio' => $activity->old_values['title'] ?? 'Portfolio Item',
                    'App\Models\Project' => $activity->old_values['title'] ?? 'Project Item',
                    'App\Models\Client' => $activity->old_values['name'] ?? 'Client Item',
                    'App\Models\LandingPageContent' => $activity->old_values['key'] ?? 'Content Item',
                    'App\Models\User' => $activity->old_values['name'] ?? $activity->old_values['email'] ?? 'User',
                    default => 'Content Item',
                };
            }

            // Try to extract from description if available
            if ($activity->description && str_contains($activity->description, ':')) {
                $parts = explode(':', $activity->description, 2);
                if (count($parts) > 1) {
                    return trim($parts[1]);
                }
            }
        }

        // Fallback to description or generic name
        if ($activity->description && str_contains($activity->description, ':')) {
            $parts = explode(':', $activity->description, 2);
            if (count($parts) > 1) {
                return trim($parts[1]);
            }
        }

        return match ($activity->model_type) {
            'App\Models\Portfolio' => 'Portfolio Item',
            'App\Models\Project' => 'Project Item',
            'App\Models\Client' => 'Client Item',
            'App\Models\LandingPageContent' => 'Content Item',
            'App\Models\User' => 'User',
            default => 'Content Item',
        };
    }

    /**
     * Get appropriate icon for activity type
     */
    private static function getActivityIcon($action)
    {
        return match ($action) {
            'created' => '➕',
            'updated' => '✏️',
            'deleted' => '🗑️',
            'restored' => '♻️',
            'force_deleted' => '💥',
            default => '📝',
        };
    }

    /**
     * Get relative time string (e.g., "5 minutes ago", "2 hours ago")
     */
    private static function getRelativeTime($timestamp)
    {
        $carbon = Carbon::parse($timestamp);
        $now = Carbon::now();

        $diffInMinutes = round($carbon->diffInMinutes($now));
        $diffInHours = round($carbon->diffInHours($now));
        $diffInDays = round($carbon->diffInDays($now));
        $diffInWeeks = round($carbon->diffInWeeks($now));
        $diffInMonths = round($carbon->diffInMonths($now));

        if ($diffInMinutes < 1) {
            return 'Just now';
        } elseif ($diffInMinutes < 60) {
            return $diffInMinutes . ' minute' . ($diffInMinutes > 1 ? 's' : '') . ' ago';
        } elseif ($diffInHours < 24) {
            return $diffInHours . ' hour' . ($diffInHours > 1 ? 's' : '') . ' ago';
        } elseif ($diffInDays < 7) {
            return $diffInDays . ' day' . ($diffInDays > 1 ? 's' : '') . ' ago';
        } elseif ($diffInWeeks < 4) {
            return $diffInWeeks . ' week' . ($diffInWeeks > 1 ? 's' : '') . ' ago';
        } elseif ($diffInMonths < 12) {
            return $diffInMonths . ' month' . ($diffInMonths > 1 ? 's' : '') . ' ago';
        } else {
            $diffInYears = round($carbon->diffInYears($now));
            return $diffInYears . ' year' . ($diffInYears > 1 ? 's' : '') . ' ago';
        }
    }
}
