import React from "react";
import Box from "../../Box";
import FormattedPrice from "../../Price";
export default function OfferMade({ offer }) {
  // Convert `created_at` to a readable date string
  const offerMadeOn = new Date(offer.created_at).toDateString();

  return (
    <Box header="Offer Made">
      <FormattedPrice price={offer.amount} className="text-3xl" />

      <section className="mt-2 flex flex-col md:flex-row justify-between text-gray-500">
        <div>Made on</div>
        <div className="font-medium">{offerMadeOn}</div>
      </section>
    </Box>
  );
}
