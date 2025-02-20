export default function Box({ children }) {
  return (
    <div className="w-full border border-gray-200 dark:border-gray-800 rounded-md p-4 shadow-sm dark:text-gray-300">
      {children}
    </div>
  );
}
