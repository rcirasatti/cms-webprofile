<?php

namespace App\Http\Controllers;

use App\Models\LandingPageContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CmsController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function sections()
    {
        $sections = LandingPageContent::select('section')
            ->distinct()
            ->orderBy('section')
            ->pluck('section');

        return Inertia::render('CMS/Sections', [
            'sections' => $sections
        ]);
    }

    public function sectionContent($section)
    {
        $contents = LandingPageContent::bySection($section)
            ->ordered()
            ->get();

        return Inertia::render('CMS/SectionContent', [
            'section' => $section,
            'contents' => $contents
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'key' => 'required|string|max:255',
            'value' => 'nullable|string',
            'metadata' => 'nullable|string', // Accept as string first
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'content_type' => 'nullable|string|in:text,image,url',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // Handle metadata conversion from JSON string to array
        if (isset($validated['metadata'])) {
            if (is_string($validated['metadata'])) {
                try {
                    $validated['metadata'] = json_decode($validated['metadata'], true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        $validated['metadata'] = [];
                    }
                } catch (\Exception $e) {
                    $validated['metadata'] = [];
                }
            }
        } else {
            $validated['metadata'] = [];
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $validated['image_path'] = '/assets/images/uploads/' . $imageName;
            $validated['content_type'] = 'image';
            $validated['value'] = $validated['image_path']; // Set value to image path for compatibility
        }

        $content = LandingPageContent::create($validated);

        return redirect()->back()->with('success', 'Content created successfully!');
    }

    public function update(Request $request, LandingPageContent $content)
    {
        Log::info('Update request received', [
            'content_id' => $content->id,
            'request_data' => $request->all(),
            'has_file' => $request->hasFile('image')
        ]);

        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'key' => 'required|string|max:255',
            'value' => 'nullable|string',
            'metadata' => 'nullable|string', // Accept as string first
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'content_type' => 'nullable|string|in:text,image,url',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // Handle metadata conversion from JSON string to array
        if (isset($validated['metadata'])) {
            if (is_string($validated['metadata'])) {
                try {
                    $validated['metadata'] = json_decode($validated['metadata'], true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        $validated['metadata'] = [];
                    }
                } catch (\Exception $e) {
                    $validated['metadata'] = [];
                }
            }
        } else {
            $validated['metadata'] = [];
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($content->image_path && file_exists(public_path($content->image_path))) {
                unlink(public_path($content->image_path));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $validated['image_path'] = '/assets/images/uploads/' . $imageName;
            $validated['content_type'] = 'image';
            $validated['value'] = $validated['image_path']; // Set value to image path for compatibility
        }

        $content->update($validated);

        return redirect()->back()->with('success', 'Content updated successfully!');
    }

    public function destroy(LandingPageContent $content)
    {
        $content->delete();

        return redirect()->back()->with('success', 'Content deleted successfully!');
    }

    public function hero()
    {
        $contents = LandingPageContent::bySection('hero')->ordered()->get();
        return Inertia::render('CMS/Hero', ['contents' => $contents]);
    }

    public function about()
    {
        $contents = LandingPageContent::bySection('about')->ordered()->get();
        return Inertia::render('CMS/About', ['contents' => $contents]);
    }

    public function portfolio()
    {
        $contents = LandingPageContent::bySection('portfolio')->ordered()->get();
        return Inertia::render('CMS/PortfolioTable', ['contents' => $contents]);
    }

    public function contact()
    {
        $contents = LandingPageContent::bySection('contact')->ordered()->get();
        return Inertia::render('CMS/Contact', ['contents' => $contents]);
    }

    public function navbar()
    {
        $contents = LandingPageContent::bySection('navbar')->ordered()->get();
        return Inertia::render('CMS/Navbar', ['contents' => $contents]);
    }

    public function footer()
    {
        $contents = LandingPageContent::bySection('footer')->ordered()->get();
        return Inertia::render('CMS/Footer', ['contents' => $contents]);
    }

    public function activities()
    {
        $activities = \App\Services\ActivityService::getRecentActivities(50); // Get more activities for the full list
        return Inertia::render('CMS/Activities', ['activities' => $activities]);
    }
}
