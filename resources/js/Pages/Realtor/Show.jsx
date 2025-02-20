import React from "react";
import { Link } from "@inertiajs/react";
import FormattedPrice from "../Listing/Price";
import ListingSpace from "../Listing/ListingSpace";
import ListingAddress from "../Listing/ListingAddress";
import OfferDetails from "../Listing/Show/Components/Offer";

export default function ShowListing({ listing }) {
  // Check if listing.offers exists and has length
  const hasOffers = listing.offers && listing.offers.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header / Title + Back Link */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Listing Details</h1>
          <p className="text-sm text-gray-500 mt-1">
            View the listing info and any offers made by buyers.
          </p>
        </div>

        <Link
          href="/realtor/listing"
          className="inline-block px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          ← Back to Your Listings
        </Link>
      </header>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Offers (md:col-span-7) */}
        <div className="md:col-span-7 flex flex-col gap-4 bg-white shadow-sm rounded-lg p-5">
          {hasOffers ? (
            <>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Offers for this listing
              </h2>
              <hr className="mb-4" />
              {listing.offers.map((offer) => (
                <OfferDetails
                  key={offer.id}
                  offer={offer}
                  listingPrice={listing.price}
                  className="mb-4"
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 h-full">
              <svg
                className="w-16 h-16 mb-2 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <p className="text-sm font-medium">No offers have been made yet.</p>
            </div>
          )}
        </div>

        {/* Basic Info (md:col-span-5) */}
        <div className="md:col-span-5 flex flex-col bg-white shadow-sm rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Basic Info</h2>
          <hr />

          <FormattedPrice
            price={listing.price}
            className="text-2xl font-bold text-gray-800"
          />

          <ListingSpace listing={listing} className="text-lg" />

          <ListingAddress listing={listing} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
}
