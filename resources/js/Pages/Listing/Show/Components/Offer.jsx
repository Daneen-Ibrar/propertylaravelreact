import React from "react";
import { Link } from "@inertiajs/react";
import Box from "../../Box";
import FormattedPrice from "../../Price";

export default function OfferDetails({ offer, listingPrice, isSold }) {
  // 1. Compute difference, madeOn, bidder name
  const difference = offer.amount - listingPrice;
  const madeOn = new Date(offer.created_at).toDateString();
  const bidderName = offer.bidder?.name ?? "Unknown";

  // 2. "notSold" logic from Vue, but also incorporate isSold prop:
  //    We only show the Accept button if the listing isn't sold,
  //    and the offer itself isn’t accepted or rejected.
  const canAccept = !isSold && !offer.accepted_at && !offer.rejected_at;

  // 3. Header content:
  //    "Offer #{{ offer.id }}", plus the "Accepted" badge if `accepted_at` is truthy
  const headerContent = (
    <>
      Offer #{offer.id}
      {offer.accepted_at && (
        <span className="dark:bg-green-900 dark:text-green-200 bg-green-200 text-green-900 p-1 rounded-md uppercase ml-1">
          Accepted
        </span>
      )}
    </>
  );

  return (
    <Box header={headerContent}>
      <section className="flex items-center justify-between">
        <div>
          <FormattedPrice price={offer.amount} className="text-xl" />

          <div className="text-gray-500">
            Difference <FormattedPrice price={difference} />
          </div>

          <div className="text-gray-500 text-sm">
            Made by {bidderName}
          </div>

          <div className="text-gray-500 text-sm">
            Made on {madeOn}
          </div>
        </div>

        <div>
          {canAccept && (
            <Link
              href={`/realtor/offer/${offer.id}/accept`}
              as="button"
              method="put"
              className="btn-outline text-xs font-medium"
            >
              Accept
            </Link>
          )}
        </div>
      </section>
    </Box>
  );
}
