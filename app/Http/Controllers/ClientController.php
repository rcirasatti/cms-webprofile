<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::ordered()->get();
        return Inertia::render('CMS/Client/table', ['clients' => $clients]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_active' => 'boolean',
            'order' => 'nullable|integer'
        ]);

        // Handle image upload
        if ($request->hasFile('logo')) {
            $image = $request->file('logo');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $validated['logo_path'] = '/assets/images/uploads/' . $imageName;
        }

        Client::create($validated);

        return redirect()->back()->with('success', 'Client created successfully!');
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_active' => 'boolean',
            'order' => 'nullable|integer'
        ]);

        // Handle image upload
        if ($request->hasFile('logo')) {
            // Delete old image if exists
            if ($client->logo_path && file_exists(public_path($client->logo_path))) {
                unlink(public_path($client->logo_path));
            }

            $image = $request->file('logo');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('assets/images/uploads'), $imageName);
            $validated['logo_path'] = '/assets/images/uploads/' . $imageName;
        }

        $client->update($validated);

        return redirect()->back()->with('success', 'Client updated successfully!');
    }

    public function destroy(Client $client)
    {
        // Delete image if exists
        if ($client->logo_path && file_exists(public_path($client->logo_path))) {
            unlink(public_path($client->logo_path));
        }

        $client->delete();

        return redirect()->back()->with('success', 'Client deleted successfully!');
    }
}
