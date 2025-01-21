import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-3 flex-grow">
        <Outlet />
      </main>
    </div>
  );
}