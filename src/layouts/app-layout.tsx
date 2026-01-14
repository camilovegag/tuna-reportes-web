import { Outlet } from "react-router";
import { Navbar } from "@/components/navbar";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6 mx-auto w-[min(1280px,90%)]">
        <Outlet />
      </main>
    </div>
  );
}
