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
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="shadow-sm border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo / Brand */}
          <Link href="/" className="text-xl font-bold text-[#0d2340] dark:text-white tracking-wide">
            🏡 Laravel Listings
          </Link>

          {/* Navigation */}
          <div className="flex gap-4 items-center">
            <Link href="/listing" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 text-sm">
              Listings
            </Link>

            {user ? (
              <>
                {/* Notifications */}
                <Link
                  href="/notifications"
                  className="relative text-sm text-gray-500 dark:text-gray-300 hover:text-indigo-500"
                >
                  🔔
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Link>

                {/* Username */}
                <Link
                  href="/realtor/listing"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500"
                >
                  {user.name}
                </Link>

                {/* New Listing */}
                <Link
                  href="/listing/create"
                  className="bg-[#cf2e2e] hover:bg-[#a82121] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
                >
                  + New Listing
                </Link>

                {/* Logout */}
                <Link
                  href="/logout"
                  method="delete"
                  as="button"
                  className="text-sm text-red-500 hover:underline"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Sign-In
                </Link>
                <Link href="/user-account/create" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Flash Success Message */}
      {flashSuccess && (
        <div className="container mx-auto mt-4 px-4">
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-800 px-4 py-3 rounded">
            {flashSuccess}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
