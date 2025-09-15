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

        return Inertia::render('CMS/General/sections', [
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
        return Inertia::render('CMS/Hero/index', ['contents' => $contents]);
    }

    public function updateHero(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:500',
            'button_text' => 'nullable|string|max:100',
            // allow either a URL/string or an uploaded image file
            'background_image' => 'nullable',
            'background_image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // prefer uploaded file when present
        $bgValue = $request->background_image;
        if ($request->hasFile('background_image')) {
            $image = $request->file('background_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $bgValue = '/assets/images/uploads/' . $imageName;
        }

        $data = [
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'button_text' => $request->button_text,
            'background_image' => $bgValue,
        ];

        // Update or create each content item
        foreach ($data as $key => $value) {
            if ($value !== null && $value !== '') {
                LandingPageContent::updateOrCreate(
                    [
                        'section' => 'hero',
                        'key' => $key
                    ],
                    [
                        'value' => $value,
                        'is_active' => true,
                        'order' => $this->getOrderForKey($key),
                        'content_type' => $key === 'background_image' ? 'image' : 'text',
                        'metadata' => $key === 'background_image' ? ['alt' => 'Hero Background'] : null
                    ]
                );
            }
        }

        return redirect()->back()->with('success', 'Hero content updated successfully!');
    }

    public function about()
    {
        $contents = LandingPageContent::bySection('about')->ordered()->get();
        return Inertia::render('CMS/About/index', ['contents' => $contents]);
    }

    public function updateAbout(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'features_title' => 'nullable|string|max:255',
                'feature1_title' => 'nullable|string|max:255',
                'feature1_description' => 'nullable|string',
                'feature2_title' => 'nullable|string|max:255',
                'feature2_description' => 'nullable|string',
                'feature3_title' => 'nullable|string|max:255',
                'feature3_description' => 'nullable|string',
                'experience_number' => 'nullable|string|max:255',
                'experience_text' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ]);

            // Handle image upload if provided
            $imagePath = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();

                // Create uploads directory if it doesn't exist
                $uploadPath = public_path('assets/images/uploads');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }

                $image->move($uploadPath, $imageName);
                $imagePath = '/assets/images/uploads/' . $imageName;
            }

        // Update or create each content item
        $contentUpdates = [
            'title' => $validated['title'] ?? '',
            'description' => $validated['description'] ?? '',
            'features_title' => $validated['features_title'] ?? '',
            'feature1_title' => $validated['feature1_title'] ?? '',
            'feature1_description' => $validated['feature1_description'] ?? '',
            'feature2_title' => $validated['feature2_title'] ?? '',
            'feature2_description' => $validated['feature2_description'] ?? '',
            'feature3_title' => $validated['feature3_title'] ?? '',
            'feature3_description' => $validated['feature3_description'] ?? '',
            'experience_number' => $validated['experience_number'] ?? '',
            'experience_text' => $validated['experience_text'] ?? '',
        ];

        foreach ($contentUpdates as $key => $value) {
            $content = LandingPageContent::where('section', 'about')
                ->where('key', $key)
                ->first();

            if ($content) {
                $content->update([
                    'value' => $value,
                    'is_active' => true,
                ]);
            } else {
                LandingPageContent::create([
                    'section' => 'about',
                    'key' => $key,
                    'value' => $value,
                    'metadata' => [],
                    'order' => 0,
                    'is_active' => true,
                    'content_type' => 'text',
                ]);
            }
        }

        // Handle image separately
        if ($imagePath) {
            $imageContent = LandingPageContent::where('section', 'about')
                ->where('key', 'image')
                ->first();

            if ($imageContent) {
                // Delete old image if exists
                if ($imageContent->value && file_exists(public_path($imageContent->value))) {
                    unlink(public_path($imageContent->value));
                }

                $imageContent->update([
                    'value' => $imagePath,
                    'is_active' => true,
                    'content_type' => 'image',
                    'metadata' => ['alt' => 'About Us Image'],
                ]);
            } else {
                LandingPageContent::create([
                    'section' => 'about',
                    'key' => 'image',
                    'value' => $imagePath,
                    'metadata' => ['alt' => 'About Us Image'],
                    'order' => 0,
                    'is_active' => true,
                    'content_type' => 'image',
                ]);
            }
        }

        return redirect()->back()->with('message', [
            'type' => 'success',
            'text' => 'About content updated successfully!'
        ]);
        
        } catch (\Exception $e) {
            Log::error('About update failed: ' . $e->getMessage());
            return redirect()->back()->with('message', [
                'type' => 'error',
                'text' => 'Failed to update about content. Please try again.'
            ]);
        }
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
        return Inertia::render('CMS/Navigation/navbar', ['contents' => $contents]);
    }

    public function footer()
    {
        $contents = LandingPageContent::bySection('footer')->ordered()->get();
        return Inertia::render('CMS/Navigation/footer', ['contents' => $contents]);
    }

    public function activities()
    {
        $activities = \App\Services\ActivityService::getRecentActivities(50); // Get more activities for the full list
        return Inertia::render('CMS/Activities', ['activities' => $activities]);
    }

    /**
     * Determine a sensible order for common hero keys.
     * Falls back to max(order)+1 for the section if key is unknown.
     */
    private function getOrderForKey(string $key)
    {
        $mapping = [
            'title' => 1,
            'subtitle' => 2,
            'button_text' => 3,
            'background_image' => 4,
        ];

        if (isset($mapping[$key])) {
            return $mapping[$key];
        }

        // fallback: place at the end of the hero section
        $max = LandingPageContent::where('section', 'hero')->max('order');
        return $max ? $max + 1 : 1;
    }
}
