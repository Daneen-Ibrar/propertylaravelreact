import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links = [] }) {
  return (
    <div className="flex gap-1">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url || "#"} // Fallback to "#" if `link.url` is null
          className={`py-2 px-4 rounded-md ${
            link.active ? "bg-indigo-500 dark:bg-indigo-800 text-gray-300" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}
