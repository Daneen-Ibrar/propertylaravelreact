import { Link } from "@inertiajs/react";
import FormattedPrice from "../Listing/Price";
import Pagination from "../Pagination/Pagination";
import Empty from "../Listing/Show/Components/EmptyState";

export default function Index({ notifications }) {
  if (!notifications?.data || notifications.data.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No notifications yet!
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl mb-4">Your Notifications</h1>

      {/* Notifications Section */}
      {notifications.data.length > 0 ? (
        <section className="text-gray-700 dark:text-gray-400">
          {notifications.data.map((notification) => (
            <div
              key={notification.id}
              className="border-b border-gray-200 dark:border-gray-800 py-4 flex justify-between items-center"
            >
              <div>
                {/* Offer Made Notification */}
                {notification.type === "App\\Notifications\\OfferMade" && (
                  <span>
                    You made an offer of{" "}
                    <FormattedPrice price={notification.data.amount} /> for
                    listing{" "}
                    <Link
                      href={`/listing/${notification.data.listing_id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {notification.data.listing_name}
                    </Link>
                    .
                  </span>
                )}

                {/* Offer Accepted Notification */}
                {notification.type === "App\\Notifications\\OfferAccepted" && (
                  <span>
                    Your offer of{" "}
                    <FormattedPrice price={notification.data.amount} /> for
                    listing{" "}
                    <Link
                      href={`/listing/${notification.data.listing_id}`}
                      className="text-green-600 hover:underline"
                    >
                      {notification.data.listing_name}
                    </Link>{" "}
                    has been accepted! 🎉
                  </span>
                )}

                {/* Offer Rejected Notification */}
                {notification.type === "App\\Notifications\\OfferRejected" && (
                  <span>
                    Your offer of{" "}
                    <FormattedPrice price={notification.data.amount} /> for
                    listing{" "}
                    <Link
                      href={`/listing/${notification.data.listing_id}`}
                      className="text-red-600 hover:underline"
                    >
                      {notification.data.listing_name}
                    </Link>{" "}
                    was rejected. 😢
                  </span>
                )}
              </div>

              {/* Mark as Read Button */}
              <div>
                {!notification.read_at && (
                  <Link
                    href={`/notification/${notification.id}/seen`}
                    method="put"
                    as="button"
                    className="text-indigo-600 dark:text-indigo-400"
                  >
                    Mark as Read
                  </Link>
                )}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <Empty>No notifications yet!</Empty>
      )}

      {/* Pagination Section */}
      {notifications.data.length > 0 && (
        <section className="w-full flex justify-center mt-8 mb-8">
          <Pagination links={notifications.links} />
        </section>
      )}
    </div>
  );
}
