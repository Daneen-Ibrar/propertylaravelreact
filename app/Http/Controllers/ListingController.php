<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Listing;
use Illuminate\Support\Facades\Auth;

class ListingController extends Controller
{

    public function index(Request $request)
    {
        $filters = $request->only([
            'priceFrom', 'priceTo', 'beds', 'baths', 'areaFrom', 'areaTo', 'description'
        ]);
    
        // Start building the query
        $query = Listing::with('images')->orderByDesc('created_at');
    
        if (!empty($filters['priceFrom'])) {
            $query->where('price', '>=', $filters['priceFrom']);
        }
    
        if (!empty($filters['priceTo'])) {
            $query->where('price', '<=', $filters['priceTo']);
        }
    
        if (!empty($filters['beds'])) {
            $query->where('beds', $filters['beds']);
        }
    
        if (!empty($filters['baths'])) {
            $query->where('baths', $filters['baths']);
        }
    
        if (!empty($filters['areaFrom'])) {
            $query->where('area', '>=', $filters['areaFrom']);
        }

        if (!empty($filters['description'])) {
            $query->where('description', '>=', $filters['description']);
        }
    
        if (!empty($filters['areaTo'])) {
            $query->where('area', '<=', $filters['areaTo']);
        }
    
        return inertia('Listing/Index', [
            'filters' => $filters,
            'listings' => $query->withoutSold()->paginate(10)->through(function ($listing) {
                // Transform images to include full URLs
                $listing->images->transform(function ($image) {
                    $image->src = asset('storage/' . $image->filename);
                    return $image;
                });
                return $listing;
            }),
            'routes' => [
                'listingIndex' => url('/listing'),
            ],
        ]);
    }
    
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Listing/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->user()->listings()->create(
            $request->validate([
                'beds' => 'nullable|integer',
                'baths' => 'nullable|integer',
                'area' => 'nullable|integer',
                'city' => 'nullable|string',
                'code' => 'nullable|string',
                'street' => 'nullable|string',
                'street_nr' => 'nullable|integer',
                'price' => 'nullable|integer',
                'description' => 'nullable|string', // Ensure validation allows it
            ])
        );
       return redirect()->route('listing.index')
       ->with('success', 'Listing was created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Listing $listing)
    {
        $listing->load(['images']);
    
        $offer = !Auth::user()
            ? null
            : $listing->offers()->byMe()->first();
    
        return inertia('Listing/Show', [
            'listing'   => $listing,  // <-- changed from "listings"
            'offerMade' => $offer,

        ]);
    }


    public function edit(Listing $listing)
    {
        // Check if the authenticated user is the owner of the listing
     
        return inertia('Listing/Edit', [
            'listings' => $listing,
        ]);
    }
    
  
    public function update(Request $request, Listing $listing)
    {
        $listing->update(
            $request->validate([
                'beds' => 'nullable|integer',
                'baths' => 'nullable|integer',
                'area' => 'nullable|integer',
                'city' => 'nullable|string',
                'code' => 'nullable|string',
                'street' => 'nullable|string',
                'street_nr' => 'nullable|integer',
                'price' => 'nullable|integer',
                'description' => 'nullable|string', // Ensure validation allows it
            ])
        );
        return redirect()->route('listing.index')
            ->with('success', 'Listing was changed!');
    
    }

    /**
     * Remove the specified resource from storage.
     */

}
