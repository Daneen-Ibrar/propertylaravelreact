import { Link } from "@inertiajs/react";

export default function Index  ({ message })  {
  return (
  
    <div>
      <h1>Hello, React with Vite!</h1>
      <Link href="/hello">Show page</Link>
      <div>The message is {message}</div>
    </div>
  
  );
};


