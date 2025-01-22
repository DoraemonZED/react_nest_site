import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}