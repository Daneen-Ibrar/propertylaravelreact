import React, { useRef, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import NProgress from "nprogress";
import Box from "../../Listing/Box";

export default function ImageUploadForm({ listing }) {
  const fileInputRef = useRef(null);
  const { data, setData, post, reset, processing, errors } = useForm({
    images: [], // Initialize as an empty array
  });

  useEffect(() => {
    const handleProgress = (event) => {
      if (event.detail?.progress?.percentage) {
        NProgress.set((event.detail.progress.percentage / 100) * 0.9);
      }
    };

    Inertia.on("progress", handleProgress);

    return () => {
      Inertia.off("progress", handleProgress);
    };
  }, []);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    setData("images", [...data.images, ...files]);
  };

  const upload = (event) => {
    event.preventDefault();
    post(`/realtor/listing/${listing.id}/image`, {
      forceFormData: true,
      onStart: () => NProgress.start(),
      onFinish: () => NProgress.done(),
      onSuccess: () => {
        reset("images");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  const handleReset = () => {
    reset("images");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canUpload = data.images && data.images.length > 0;

  const imageErrorKeys = Object.keys(errors).filter((key) => key.startsWith("images."));
  const imageErrors = imageErrorKeys.map((key) => errors[key]);

  return (
    <>
      <form onSubmit={upload} encType="multipart/form-data">
        <Box>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Upload Images
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleChange}
              className="border rounded-md file:px-4 file:py-2 file:cursor-pointer border-gray-300 dark:border-gray-700 file:bg-gray-100 dark:file:bg-gray-800 file:text-gray-600 dark:file:text-gray-300 file:hover:bg-gray-200 dark:file:hover:bg-gray-700"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!canUpload || processing}
            >
              {processing ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          {imageErrors.length > 0 && (
            <div className="mt-4 text-sm text-red-600">
              {imageErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </Box>
      </form>

      {/* Display Current Listing Images */}
      {listing.images && listing.images.length > 0 && (
        <Box className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Current Listing Images
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listing.images.map((image) => (
              <div key={image.id} className="group relative">
                <img
                  src={image.src}
                  alt={`Listing image ${image.id}`}
                  className="rounded-lg w-full h-40 object-cover shadow"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <Link
                    href={`/realtor/listing/${listing.id}/image/${image.id}`}
                    method="delete"
                    as="button"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded shadow"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Box>
      )}
    </>
  );
}
