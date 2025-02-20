<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Listing;
use Illuminate\Http\Request;
use App\Notifications\OfferMade;

class ListingOfferController extends Controller
{
    public function store(Listing $listing, Request $request)
    {

        $this->authorize('view', $listing);

        $offer = $listing->offers()->save(
            Offer::make(
                $request->validate([
                    'amount' => 'required|integer|min:1|max:20000000'
                ])
            )->bidder()->associate($request->user())
        );
        $listing->owner->notify(
            new OfferMade($offer)
        );

        return redirect()->back()->with(
            'success',
            'Offer was made!'
        );
    }

    public function accept(Offer $offer)
{
    $this->authorize('update', $offer->listing);

    $offer->update(['accepted_at' => now()]);

    // Notify the bidder
    $offer->bidder->notify(new OfferAccepted($offer));

    return redirect()->back()->with('success', 'Offer accepted!');
}

public function reject(Offer $offer)
{
    $this->authorize('update', $offer->listing);

    $offer->update(['rejected_at' => now()]);

    // Notify the bidder
    $offer->bidder->notify(new OfferRejected($offer));

    return redirect()->back()->with('success', 'Offer rejected!');
}

}