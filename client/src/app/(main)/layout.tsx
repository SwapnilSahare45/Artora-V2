import Footer from "@/components/molecules/Footer";
import Navbar from "@/components/molecules/NavbarClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artora | Curated Independent Art Gallery",
  description:
    "The premier destination for elite independent creators and collectors.",
};

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-20 focus:outline-none">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
