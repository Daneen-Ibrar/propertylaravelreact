import Listing from "./Listing";
import Pagination from "../Pagination/Pagination";

export default function Index({ listings }) {
  const { data: listingsData, links } = listings || {}; // Extract `data` and `links` properties

  if (!Array.isArray(listingsData)) {
    console.error("Expected listings.data to be an array:", listings);
    return <div>Error: Listings data is invalid.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      
      {/* Grid Layout for Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listingsData.map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </div>

      {/* Pagination */}
      {links?.length > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination links={links} />
        </div>
      )}
    </div>
  );
}
