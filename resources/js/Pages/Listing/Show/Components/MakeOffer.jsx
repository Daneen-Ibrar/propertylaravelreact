import React, { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import Box from "../../Box";
import FormattedPrice from "../../Price";
import { useForm } from "@inertiajs/react";

export default function MakeAnOffer({
  listingId,
  price,
  onOfferUpdated // <-- New prop to handle "emit"
}) {
  // 1. Set up Inertia form state
  const { data, setData, post, errors } = useForm({
    amount: price, // initial amount is the listing's price
  });

  // 2. Derived values (mimic Vue's computed)
  const difference = Number(data.amount) - price;
  const minValue = Math.round(price / 2);
  const maxValue = Math.round(price * 2);

  // 3. Debounced callback to mimic "watch + emit"
  //    We'll call onOfferUpdated(value) after 200ms of no changes.
  const debouncedOfferUpdated = useCallback(
    debounce((value) => {
      // Only call if parent provided the callback
      if (onOfferUpdated) {
        onOfferUpdated(value);
      }
    }, 200),
    [onOfferUpdated]
  );

  // 4. UseEffect to watch data.amount changes
  useEffect(() => {
    debouncedOfferUpdated(data.amount);
  }, [data.amount, debouncedOfferUpdated]);

  // 5. Submission with Inertia
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/listing/${listingId}/offer`, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <Box header="Make an Offer">
      <form onSubmit={handleSubmit}>
        {/* Text Input */}
        <input
          type="text"
          className="input"
          // Update Inertia form data
          value={data.amount}
          onChange={(e) => setData("amount", e.target.value)}
        />
        {/* Display error for `amount` if validation fails */}
        {errors.amount && (
          <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
        )}

        {/* Range Slider */}
        <input
          type="range"
          className="mt-2 w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          min={minValue}
          max={maxValue}
          step="1000"
          value={data.amount}
          onChange={(e) => setData("amount", e.target.value)}
        />

        <button type="submit" className="btn-outline w-full mt-2 text-sm">
          Make an Offer
        </button>
      </form>

      {/* Difference display */}
      <div className="flex justify-between text-gray-500 mt-2">
        <div>Difference</div>
        <div>
          <FormattedPrice price={difference} />
        </div>
      </div>
    </Box>
  );
}
