<?php

namespace App\Http\Controllers;

use App\Models\LandingPageContent;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CmsController extends Controller
{
    public function sections()
    {
        return \Illuminate\Support\Facades\Redirect::route('dashboard');
    }

    public function sectionContent($section)
    {
        $contents = LandingPageContent::bySection($section)
            ->ordered()
            ->get();

        return Inertia::render('CMS/General/sections', [
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

        // Store old values for activity logging
        $oldValues = $content->only(['section', 'key', 'value', 'image_path', 'is_active']);
        
        $content->update($validated);

        // Log activity
        $newValues = $content->fresh()->only(['section', 'key', 'value', 'image_path', 'is_active']);
        $changedFields = array_keys(array_diff_assoc($newValues, $oldValues));
        
        if (!empty($changedFields)) {
            $fieldsText = implode(', ', $changedFields);
            Activity::log('updated', $content, "Updated content: {$fieldsText}", $oldValues, $newValues);
        }

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

        $updatedFields = [];
        $oldValues = [];
        $newValues = [];

        // Update or create each content item and track changes
        foreach ($data as $key => $value) {
            if ($value !== null && $value !== '') {
                $existingContent = LandingPageContent::where('section', 'hero')
                    ->where('key', $key)
                    ->first();
                
                if ($existingContent) {
                    $oldValues[$key] = $existingContent->value;
                    if ($existingContent->value !== $value) {
                        $updatedFields[] = $key;
                    }
                } else {
                    $oldValues[$key] = null;
                    $updatedFields[] = $key;
                }
                
                $newValues[$key] = $value;
                
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

        // Log activity if there were changes
        if (!empty($updatedFields)) {
            $heroContent = LandingPageContent::where('section', 'hero')
                ->where('key', 'title')
                ->first();
            
            if ($heroContent) {
                $fieldsText = implode(', ', $updatedFields);
                Activity::log(
                    'updated',
                    $heroContent,
                    "Updated hero: {$fieldsText}",
                    $oldValues,
                    $newValues
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

        $updatedFields = [];
        $oldValues = [];
        $newValues = [];
        
        foreach ($contentUpdates as $key => $value) {
            $content = LandingPageContent::where('section', 'about')
                ->where('key', $key)
                ->first();

            if ($content) {
                $oldValues[$key] = $content->value;
                if ($content->value !== $value) {
                    $updatedFields[] = $key;
                }
                $content->update([
                    'value' => $value,
                    'is_active' => true,
                ]);
            } else {
                $oldValues[$key] = null;
                $updatedFields[] = $key;
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
            $newValues[$key] = $value;
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

                $oldValues['image'] = $imageContent->value;
                $updatedFields[] = 'image';
                $imageContent->update([
                    'value' => $imagePath,
                    'is_active' => true,
                    'content_type' => 'image',
                    'metadata' => ['alt' => 'About Us Image'],
                ]);
            } else {
                $oldValues['image'] = null;
                $updatedFields[] = 'image';
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
            $newValues['image'] = $imagePath;
        }

        // Log activity if there were changes
        if (!empty($updatedFields)) {
            $aboutContent = LandingPageContent::where('section', 'about')
                ->where('key', 'title')
                ->first();
            
            if ($aboutContent) {
                $fieldsText = implode(', ', $updatedFields);
                Activity::log(
                    'updated',
                    $aboutContent,
                    "Updated about: {$fieldsText}",
                    $oldValues,
                    $newValues
                );
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
        return Inertia::render('CMS/Portfolio/index', ['contents' => $contents]);
    }

    public function contact()
    {
        $contents = LandingPageContent::bySection('contact')->ordered()->get();
        return Inertia::render('CMS/Contact/index', ['contents' => $contents]);
    }

    public function updateContact(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        try {
            $updatedFields = [];
            $oldValues = [];
            $newValues = [];
            
            // Update or create each contact field and track changes
            foreach ($validated as $key => $value) {
                $existingContent = LandingPageContent::where('section', 'contact')
                    ->where('key', $key)
                    ->first();
                
                if ($existingContent) {
                    $oldValues[$key] = $existingContent->value;
                    if ($existingContent->value !== $value) {
                        $updatedFields[] = $key;
                    }
                } else {
                    $oldValues[$key] = null;
                    $updatedFields[] = $key;
                }
                
                $newValues[$key] = $value;
                
                LandingPageContent::updateOrCreate(
                    ['section' => 'contact', 'key' => $key],
                    [
                        'value' => $value,
                        'order' => $this->getContactOrderForKey($key),
                        'is_active' => true
                    ]
                );
            }

            // Log activity if there were changes
            if (!empty($updatedFields)) {
                $contactContent = LandingPageContent::where('section', 'contact')
                    ->where('key', 'title')
                    ->first();
                
                if ($contactContent) {
                    $fieldsText = implode(', ', $updatedFields);
                    Activity::log(
                        'updated',
                        $contactContent,
                        "Updated contact: {$fieldsText}",
                        $oldValues,
                        $newValues
                    );
                }
            }

            return redirect()->back()->with([
                'type' => 'success',
                'text' => 'Contact content updated successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Contact update failed: ' . $e->getMessage());
            return redirect()->back()->with([
                'type' => 'error',
                'text' => 'Failed to update contact content. Please try again.'
            ]);
        }
    }

    public function navbar()
    {
        $contents = LandingPageContent::bySection('navbar')->ordered()->get();
        return Inertia::render('CMS/Navigation/navbar', ['contents' => $contents]);
    }

    public function updateNavbar(Request $request)
    {
        $request->validate([
            'logo_text' => 'nullable|string|max:255',
            'logo_image' => 'nullable',
        ]);

        // Handle logo image upload
        $logoImageValue = $request->logo_image;
        if ($request->hasFile('logo_image')) {
            $image = $request->file('logo_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $logoImageValue = '/assets/images/uploads/' . $imageName;
        }

        $data = [
            'logo_text' => $request->logo_text,
            'logo_image' => $logoImageValue,
        ];

        $updatedFields = [];
        $oldValues = [];
        $newValues = [];

        // Update or create each content item and track changes
        foreach ($data as $key => $value) {
            if ($value !== null && $value !== '') {
                $existingContent = LandingPageContent::where('section', 'navbar')
                    ->where('key', $key)
                    ->first();
                
                if ($existingContent) {
                    $oldValues[$key] = $existingContent->value;
                    if ($existingContent->value !== $value) {
                        $updatedFields[] = $key;
                    }
                } else {
                    $oldValues[$key] = null;
                    $updatedFields[] = $key;
                }
                
                $newValues[$key] = $value;
                
                LandingPageContent::updateOrCreate(
                    [
                        'section' => 'navbar',
                        'key' => $key
                    ],
                    [
                        'value' => $value,
                        'is_active' => true,
                        'order' => $this->getOrderForNavbarKey($key),
                        'content_type' => $key === 'logo_image' ? 'image' : 'text',
                        'metadata' => $key === 'logo_image' ? ['alt' => 'Company Logo'] : null
                    ]
                );
            }
        }

        // Log activity if there were changes
        if (!empty($updatedFields)) {
            $navbarContent = LandingPageContent::where('section', 'navbar')
                ->where('key', 'logo_text')
                ->first();
            
            if ($navbarContent) {
                $fieldsText = implode(', ', $updatedFields);
                Activity::log(
                    'updated',
                    $navbarContent,
                    "Updated navbar: {$fieldsText}",
                    $oldValues,
                    $newValues
                );
            }
        }

        return redirect()->back()->with('success', 'Navbar content updated successfully!');
    }

    public function footer()
    {
        $contents = LandingPageContent::bySection('footer')->ordered()->get();
        return Inertia::render('CMS/Navigation/footer', [
            'contents' => $contents,
            'flash' => session()->only(['type', 'text'])
        ]);
    }

    public function updateFooter(Request $request)
    {
        try {
            $validated = $request->validate([
                'copyright' => 'nullable|string',
                'tagline' => 'nullable|string',
                'address' => 'nullable|string',
                'phone' => 'nullable|string',
                'email' => 'nullable|string|email',
                'social_facebook' => 'nullable|url',
                'social_instagram' => 'nullable|url', 
                'social_linkedin' => 'nullable|url',
                'social_youtube' => 'nullable|url',
                'maps_url' => 'nullable|url',
                'maps_embed' => 'nullable|string',
            ]);

            $oldValues = [];
            $newValues = [];
            $updatedFields = [];

            foreach ($validated as $key => $value) {
                $existing = LandingPageContent::where('section', 'footer')
                    ->where('key', $key)
                    ->first();

                if ($existing && $existing->value !== $value) {
                    $oldValues[$key] = $existing->value;
                    $updatedFields[] = $key;
                } elseif (!$existing && !empty($value)) {
                    $oldValues[$key] = null;
                    $updatedFields[] = $key;
                }
                
                $newValues[$key] = $value;

                // Handle social media metadata
                $metadata = null;
                if (str_starts_with($key, 'social_')) {
                    $platform = str_replace('social_', '', $key);
                    $metadata = ['platform' => $platform];
                }
                
                LandingPageContent::updateOrCreate(
                    ['section' => 'footer', 'key' => $key],
                    [
                        'value' => $value,
                        'metadata' => $metadata,
                        'order' => $this->getFooterOrderForKey($key),
                        'is_active' => true
                    ]
                );
            }

            // Log activity if there were changes
            if (!empty($updatedFields)) {
                $footerContent = LandingPageContent::where('section', 'footer')
                    ->where('key', 'copyright')
                    ->first();
                
                if ($footerContent) {
                    $fieldsText = implode(', ', $updatedFields);
                    Activity::log(
                        'updated',
                        $footerContent,
                        "Updated footer: {$fieldsText}",
                        $oldValues,
                        $newValues
                    );
                }
            }

            return redirect()->back()->with([
                'type' => 'success',
                'text' => 'Footer content updated successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Footer update failed: ' . $e->getMessage());
            return redirect()->back()->with([
                'type' => 'error',
                'text' => 'Failed to update footer content. Please try again.'
            ]);
        }
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

    /**
     * Determine a sensible order for common contact keys.
     */
    private function getOrderForNavbarKey(string $key)
    {
        $mapping = [
            'logo_text' => 1,
            'logo_image' => 2,
        ];

        if (isset($mapping[$key])) {
            return $mapping[$key];
        }

        // fallback: place at the end of the navbar section
        $max = LandingPageContent::where('section', 'navbar')->max('order');
        return $max ? $max + 1 : 1;
    }

    /**
     * Determine a sensible order for common contact keys.
     */
    private function getContactOrderForKey(string $key)
    {
        $mapping = [
            'title' => 1,
            'description' => 2,
            'email' => 3,
            'phone' => 4,
            'address' => 5,
            'maps_url' => 6,
            'maps_embed' => 7,
        ];

        if (isset($mapping[$key])) {
            return $mapping[$key];
        }

        // fallback: place at the end of the contact section
        $max = LandingPageContent::where('section', 'contact')->max('order');
        return $max ? $max + 1 : 1;
    }

    /**
     * Determine a sensible order for common footer keys.
     */
    private function getFooterOrderForKey(string $key)
    {
        $mapping = [
            'copyright' => 1,
            'tagline' => 2,
            'address' => 3,
            'phone' => 4,
            'email' => 5,
            'social_facebook' => 6,
            'social_instagram' => 7,
            'social_linkedin' => 8,
            'social_youtube' => 9,
            'maps_url' => 10,
            'maps_embed' => 11,
        ];

        if (isset($mapping[$key])) {
            return $mapping[$key];
        }

        // fallback: place at the end of the footer section
        $max = LandingPageContent::where('section', 'footer')->max('order');
        return $max ? $max + 1 : 1;
    }
}
