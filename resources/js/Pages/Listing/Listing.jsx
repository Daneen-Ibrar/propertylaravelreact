import ListingAddress from "./ListingAddress";
import ListingSpace from "./ListingSpace";
import { Link } from "@inertiajs/react";
import Box from "./Box";
import FormattedPrice from "./Price";
import { useMonthlyPayment } from "../Reusable/useMonthlyPayment";

export default function Listing({ listing }) {

  console.log('Listing data:', listing); // Debugging: Check the data structure
  if (!listing) {
    return <p className="text-center text-gray-500">No listing available.</p>;
  }

  const { monthlyPayment } = useMonthlyPayment(listing.price, 2.5, 25);
  const formattedMonthlyPayment = `$${monthlyPayment.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

  return (
    <Box className="relative flex flex-col border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      {/* Image Section */}
      <div className="relative">
        {listing.images && listing.images.length > 0 ? (
          <img
            src={listing.images[0].src} // Display the first image as the thumbnail
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
            No images available
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium shadow">
          {listing.status || "For Sale"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Title and Price */}
        <div className="mb-3">
          <FormattedPrice price={listing.price} className="text-2xl font-bold text-gray-800" />
          <p className="text-sm text-gray-500">Estimated Monthly Payment: {formattedMonthlyPayment}</p>
        </div>

        {/* Details */}
        <ListingSpace listing={listing} />
        <ListingAddress listing={listing} />

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/listing/${listing.id}`}
            className="text-blue-600 hover:underline text-small font-medium"
          >
            View Details →
          </Link>

        </div>
      </div>
    </Box>
  );
}
