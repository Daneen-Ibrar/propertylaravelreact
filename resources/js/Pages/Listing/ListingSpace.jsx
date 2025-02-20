const ListingSpace = ({ listing }) => {
    return (
      <div>
        <span className="font-bold">{listing.beds}</span> bds <span className="text-gray-400">| </span>  
        <span className="font-bold">{listing.baths}</span> ba <span className="text-gray-400">| </span>  
        <span className="font-bold">{listing.area}</span> m²
      </div>
    );
  };
  
  export default ListingSpace;
  