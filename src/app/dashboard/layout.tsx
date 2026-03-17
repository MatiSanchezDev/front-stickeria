import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f0f1e" }}>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
