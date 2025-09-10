<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
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

        return Inertia::render('CMS/PortfolioTable', [
            'portfolios' => $portfolios,
            'auth' => [
                'user' => auth()->user()
            ]
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
}
