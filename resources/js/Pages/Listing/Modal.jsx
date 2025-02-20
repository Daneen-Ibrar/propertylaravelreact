import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, image }) {
  // Handle Escape key to close the modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      {/* Modal Content */}
      <div className="relative  rounded-lg shadow-lg w-full max-w-6xl h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 font-bold rounded-full w-8 h-8 flex items-center justify-center transition"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image */}
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={image.src}
            alt={image.alt || `Full view of image ${image.id}`}
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
