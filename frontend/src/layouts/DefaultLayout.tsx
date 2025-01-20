import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}