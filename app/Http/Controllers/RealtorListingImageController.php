<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\ListingImage; // Ensure the ListingImage model exists
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RealtorListingImageController extends Controller
{
    /**
     * Show the form to upload listing images.
     *
     * @param  \App\Models\Listing  $listing
     * @return \Inertia\Response
     */
    public function create(Listing $listing)
    {
        // Load associated images with the listing
        $listing->load(['images']);

        // Transform images to include full URLs for frontend rendering
        $listing->images->transform(function ($image) {
            $image->src = asset('storage/' . $image->filename);
            return $image;
        });

        // Pass listing and its images to the Inertia page
        return inertia('Realtor/ListingImage/Create', [
            'listing' => $listing
        ]);
    }

    /**
     * Store uploaded images for a listing.
     *
     * @param  \App\Models\Listing  $listing
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Listing $listing, Request $request)
    {

        if ($request->hasFile('images')) {
            $request->validate([
                'images.*' => 'mimes:jpg,png,jpeg,webp|max:5000'
            ], [
                'images.*.mimes' => 'The file should be in one of the formats: jpg, png, jpeg, webp'
            ]);

            foreach ($request->file('images') as $file) {
                // Store the image in the 'public/images' directory
                $path = $file->store('images', 'public');

                // Save the image to the database with its associated listing
                $listing->images()->save(new ListingImage([
                    'filename' => $path
                ]));
            }

            
        }

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Images uploaded successfully!');
    }

    public function destroy($listing, ListingImage $image)
    {
        Storage::disk('public')->delete($image->filename);
        $image->delete();

        return redirect()->back()->with('success', 'Image was deleted!');
    }
}
