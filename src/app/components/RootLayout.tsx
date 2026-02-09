import { Outlet } from "react-router";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
