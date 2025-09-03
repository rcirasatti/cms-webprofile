<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LandingPageContent;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function index()
    {
        $sections = ['hero', 'about', 'project', 'portfolio', 'client', 'contact', 'navbar', 'footer'];
        $data = [];

        foreach ($sections as $section) {
            $data[$section] = LandingPageContent::bySection($section)
                ->active()
                ->ordered()
                ->get()
                ->map(function ($item) {
                    return [
                        'key' => $item->key,
                        'value' => $item->value,
                        'metadata' => $item->metadata,
                        'order' => $item->order
                    ];
                });
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function section($section)
    {
        $contents = LandingPageContent::bySection($section)
            ->active()
            ->ordered()
            ->get()
            ->map(function ($item) {
                return [
                    'key' => $item->key,
                    'value' => $item->value,
                    'metadata' => $item->metadata,
                    'order' => $item->order
                ];
            });

        return response()->json([
            'success' => true,
            'section' => $section,
            'data' => $contents
        ]);
    }
}
