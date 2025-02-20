import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Box from "./Box";
import Modal from "./Modal";
import FormattedPrice from "./Price";
import ListingAddress from "./ListingAddress";
import ListingSpace from "./ListingSpace";
import { useMonthlyPayment, usePaymentCalculations } from "../Reusable/useMonthlyPayment";
import MakeAnOffer from "./Show/Components/MakeOffer";
import OfferMade from "./Show/Components/OfferMade";
import Empty from "./Show/Components/EmptyState";
import MainLayout from "../Index/Layouts/MainLayout";

export default function Show({ listing, offerMade }) {
  const { props } = usePage();
  const { user } = props;

  const [selectedImage, setSelectedImage] = useState(null);
  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  console.log(listing)

  const [interestRate, setInterestRate] = useState(2.5);
  const [duration, setDuration] = useState(25);
  const { monthlyPayment } = useMonthlyPayment(listing.price, interestRate, duration);
  const { totalPaid, totalInterest } = usePaymentCalculations(listing.price, monthlyPayment, duration);

  if (!listing) {
    return (
      <div className="text-red-500 font-bold text-center mt-4">
        Error: Listing data is not available.
      </div>
    );
  }

  return (
    <div>
      <MainLayout>
        <div className="container mx-auto px-4 lg:px-8 space-y-8">
          {/* Images Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl sm:text-lg font-bold mb-4 text-gray-800">Gallery</h2>
            {listing.images?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {listing.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail for ${image.id}`}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => openModal(image)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Empty>No images available.</Empty>
            )}
          </section>

          {/* Listing Info Section */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Info */}
            <Box className="bg-gray-50">
              <h2 className="text-xl sm:text-lg font-bold mb-4 text-gray-800">Listing Details</h2>
              <FormattedPrice
                price={listing.price}
                className="text-3xl sm:text-2xl font-extrabold text-gray-800 mb-4"
              />
              <ListingSpace listing={listing} className="text-lg sm:text-base text-gray-600 mb-4" />
              <ListingAddress listing={listing} className="text-md sm:text-sm text-gray-500 mb-4" />

          {/* ✨ Improved Description Section ✨ */}
          {listing.description && (
  <div className="mt-4 text-gray-600 text-md">
    <h3 className="font-semibold text-gray-700 mb-1">Description:</h3>
    <p>{listing.description}</p>
  </div>
)}

            </Box>

            {/* Monthly Payment */}
            <Box className="bg-gray-50">
              <h2 className="text-xl sm:text-lg font-bold mb-4 text-gray-800">
                Monthly Payment Calculator
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate ({interestRate}%)
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Duration ({duration} years)
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="35"
                    step="1"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Your Estimated Monthly Payment</div>
                  <FormattedPrice
                    price={Number(monthlyPayment).toFixed(2)}
                    className="text-2xl sm:text-xl font-bold text-gray-800"
                  />
                </div>
              </div>
            </Box>
          </section>

          {/* Payment Breakdown Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl sm:text-lg font-bold mb-4 text-gray-800">Payment Breakdown</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Total Paid</span>
                <FormattedPrice price={Number(totalPaid).toFixed(2)} />
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Principal Paid</span>
                <FormattedPrice price={listing.price} />
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Interest Paid</span>
                <FormattedPrice price={Number(totalInterest).toFixed(2)} />
              </div>
            </div>
          </section>

          {/* Offer Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl sm:text-lg font-bold mb-4 text-gray-800">Make an Offer</h2>
            {user ? (
              offerMade ? (
                <OfferMade offer={offerMade} />
              ) : (
                <MakeAnOffer listingId={listing.id} price={listing.price} />
              )
            ) : (
              <p className="text-gray-500">Log in to make an offer.</p>
            )}
          </section>
        </div>
      </MainLayout>

      {/* Modal */}
      {selectedImage && <Modal isOpen={!!selectedImage} onClose={closeModal} image={selectedImage} />}
    </div>
  );
}
