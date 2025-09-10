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
                'created_at' => $activity->created_at,
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

        switch ($activity->action) {
            case 'created':
                return "Added new {$modelName}: " . self::getModelTitle($activity);
            case 'updated':
                return "Updated {$modelName}: " . self::getModelTitle($activity);
            case 'deleted':
                return "Deleted {$modelName}: " . self::getModelTitle($activity);
            case 'restored':
                return "Restored {$modelName}: " . self::getModelTitle($activity);
            case 'force_deleted':
                return "Permanently deleted {$modelName}: " . self::getModelTitle($activity);
            default:
                return $activity->description;
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
            default => 'item',
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
                    default => 'Unknown',
                };
            }
        } catch (\Exception $e) {
            // Model might have been deleted, try to get from description
        }

        // Fallback to description or generic name
        return 'Item';
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
