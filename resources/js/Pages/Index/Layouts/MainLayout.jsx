import React, { useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function MainLayout({ children }) {
  const { props } = usePage();

  const flashSuccess = props?.flash?.success;
  const user = props?.user;

  const notificationCount = useMemo(() => {
    if (user && typeof user.notificationCount === "number") {
      return Math.min(user.notificationCount, 9);
    }
    return 0;
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4 flex-wrap">
            {/* Left Navigation */}
            <div className="text-lg font-medium flex items-center mb-2 sm:mb-0">
              <Link href="/listing" className="hover:text-indigo-600 text-gray-700 dark:text-gray-300">
                Listings
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-4 flex-wrap">
              {user ? (
                <>
                  {/* Notification Bell */}
                  <Link
                    href="/notifications"
                    className="relative flex items-center pr-2 py-2 text-gray-500 dark:text-gray-300 hover:text-indigo-600"
                  >
                    🔔
                    {notificationCount > 0 && (
  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 dark:bg-red-400 text-white font-medium border border-white dark:border-gray-900 rounded-full text-xs flex items-center justify-center">
    {notificationCount}
  </div>
)}

                  </Link>

                  {/* Username */}
                  <Link
                    href="/realtor/listing"
                    className="text-gray-500 dark:text-gray-300 hover:text-indigo-600"
                  >
                    {user.name}
                  </Link>

                  {/* New Listing Button */}
                  <Link
                    href="/listing/create"
                    className="px-4 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-md"
                  >
                    + New Listing
                  </Link>

                  {/* Logout Button */}
                  <Link
                    href="/logout"
                    method="delete"
                    as="button"
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  {/* Sign-In Link */}
                  <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Sign-In
                  </Link>

                  {/* Register Link */}
                  <Link href="/user-account/create" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Flash Message */}
        {flashSuccess && (
          <div className="mb-4 border rounded-md shadow-sm border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900 p-2 text-green-900 dark:text-green-300">
            {flashSuccess}
          </div>
        )}

        {/* Page Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
