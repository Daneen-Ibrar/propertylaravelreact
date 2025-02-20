export default function ListingAddress({ listing }) {
  return (
    <span>
    {listing.street_nr}  {listing.street}, {listing.city} 
    </span>
  );
}
