import React from "react";
import { Link } from "@inertiajs/react";
import FormattedPrice from "../Listing/Price";
import ListingSpace from "../Listing/ListingSpace";
import ListingAddress from "../Listing/ListingAddress";
import Pagination from "../Pagination/Pagination";
import Empty from "../Listing/Show/Components/EmptyState";

// Utility function to conditionally build class names
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Index({ listings }) {
  console.log("Listings prop:", listings); // Debugging: check if listings is being passed

  return (
    <div>
      <h1 className="text-4xl  mb-6 text-gray-800 dark:text-gray-100">
        Your Listings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {listings.data && listings.data.length > 0 ? (
          listings.data.map((listing) => (
            <div
              key={listing.id}
              className={classNames(
                "border rounded-lg shadow-sm p-6 flex flex-col gap-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow",
                listing.deleted_at && "border-dashed opacity-50"
              )}
            >
              <div>
                {listing.sold_at && (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full mb-2">
                    Sold
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <FormattedPrice
                    price={listing.price}
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-100"
                  />
                  <ListingSpace listing={listing} />
                </div>

                <ListingAddress listing={listing} />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Link
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium underline"
                    to={`/edit/${listing.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="text-sm text-red-600 hover:text-red-800 font-medium underline"
                    href={`/realtor/listing/${listing.id}`}
                    as="button"
                    method="delete"
                  >
                    Delete
                  </Link>
                </div>

                <Link
                  href={`/realtor/listing/${listing.id}/image/create`}
                  className="text-center block text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  Images ({listing.images_count})
                </Link>

                <Link
                  href={`/realtor/listing/${listing.id}`}
                  className="text-center block text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  Offers ({listing.offers_count})
                </Link>
              </div>
            </div>
          ))
        ) : (
        <Empty>No listings yet!</Empty>
        )}
      </div>

      {/* Pagination */}
      {listings.data && listings.data.length > 0 && (
        <div className="w-full flex justify-center mt-10">
          <Pagination links={listings.links} />
        </div>
      )}
    </div>
  );
}
