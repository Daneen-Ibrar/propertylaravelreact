import { Link } from "@inertiajs/react";
import MainLayout from "./Layouts/MainLayout";

export default function Show () {
  return (
   
     
    <div>
      <h1>Hello, React with Vite!</h1>
      <Link href="/">Main page</Link>
      </div>
  
    
  );
  
};

Show.layout = page => <MainLayout children={page} title="Welcome" />

