import { ReactNode } from "react";
import NavBar from "@/components/shared/NavBar/NavBar";
import Footer from "@/components/shared/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F8]">
      <NavBar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
