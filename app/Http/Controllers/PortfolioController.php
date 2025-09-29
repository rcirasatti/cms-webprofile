<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolios = Portfolio::ordered()->get()->map(function ($portfolio) {
            return [
                'id' => $portfolio->id,
                'title' => $portfolio->title,
                'description' => $portfolio->description,
                'image_path' => $portfolio->image_path,
                'category' => $portfolio->category,
                'is_active' => $portfolio->is_active,
                'order' => $portfolio->order,
                'tags' => $portfolio->tags ?? [],
                'features' => $portfolio->features ?? [],
                'created_at' => $portfolio->created_at,
                'updated_at' => $portfolio->updated_at,
            ];
        });

        return Inertia::render('CMS/Portfolio/index', [
            'portfolios' => $portfolios,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255',
            'features' => 'nullable|array',
            'features.*' => 'string|max:500'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $validated['image_path'] = '/assets/images/uploads/' . $imageName;
        }

        Portfolio::create($validated);

        return redirect()->back()->with('success', 'Portfolio created successfully!');
    }

    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255',
            'features' => 'nullable|array',
            'features.*' => 'string|max:500'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($portfolio->image_path && file_exists(public_path($portfolio->image_path))) {
                unlink(public_path($portfolio->image_path));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $validated['image_path'] = '/assets/images/uploads/' . $imageName;
        }

        $portfolio->update($validated);

        return redirect()->back()->with('success', 'Portfolio updated successfully!');
    }

    public function destroy(Portfolio $portfolio)
    {
        // Delete image if exists
        if ($portfolio->image_path && file_exists(public_path($portfolio->image_path))) {
            unlink(public_path($portfolio->image_path));
        }

        $portfolio->delete();

        return redirect()->back()->with('success', 'Portfolio deleted successfully!');
    }

    /**
     * Secure image upload with validation and sanitization
     */
    private function validateAndStoreImage($image, $directory = 'portfolio')
    {
        // Validate file type more strictly
        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!in_array($image->getMimeType(), $allowedMimes)) {
            throw new \Exception('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
        }
        
        // Validate file size (2MB max)
        if ($image->getSize() > 2048 * 1024) {
            throw new \Exception('File too large. Maximum size is 2MB.');
        }
        
        // Check for malicious content (basic check)
        $imageInfo = getimagesize($image->path());
        if ($imageInfo === false) {
            throw new \Exception('Invalid image file.');
        }
        
        // Generate secure filename
        $filename = Str::random(40) . '.' . $image->getClientOriginalExtension();
        
        // Store with proper path
        $path = $image->storeAs("public/{$directory}", $filename);
        
        return "storage/{$directory}/{$filename}";
    }
}
