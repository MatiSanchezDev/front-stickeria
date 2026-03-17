"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      title="Volver al inicio"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center border-2 cursor-pointer transition-all"
      style={{
        backgroundColor: "#1a1a2e",
        borderColor: "rgba(168,85,247,0.4)",
        color: "#a855f7",
        boxShadow: "0 4px 24px rgba(168,85,247,0.2)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(168,85,247,0.8)";
        e.currentTarget.style.boxShadow = "0 4px 32px rgba(168,85,247,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(168,85,247,0.2)";
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
};
