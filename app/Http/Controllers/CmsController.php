<?php

namespace App\Http\Controllers;

use App\Models\LandingPageContent;
use Illuminate\Http\Request;
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
            'value' => 'required|string',
            'metadata' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

        $content = LandingPageContent::create($validated);

        return redirect()->back()->with('success', 'Content created successfully!');
    }

    public function update(Request $request, LandingPageContent $content)
    {
        $validated = $request->validate([
            'section' => 'required|string|max:255',
            'key' => 'required|string|max:255',
            'value' => 'required|string',
            'metadata' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean'
        ]);

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

    public function project()
    {
        $contents = LandingPageContent::bySection('project')->ordered()->get();
        return Inertia::render('CMS/Project', ['contents' => $contents]);
    }

    public function portfolio()
    {
        $contents = LandingPageContent::bySection('portfolio')->ordered()->get();
        return Inertia::render('CMS/Portfolio', ['contents' => $contents]);
    }

    public function client()
    {
        $contents = LandingPageContent::bySection('client')->ordered()->get();
        return Inertia::render('CMS/Client', ['contents' => $contents]);
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
}
