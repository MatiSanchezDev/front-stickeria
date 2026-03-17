"use client";
import { deleteCookie } from "cookies-next";
import { LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Salir de tu cuenta?",
      icon: "warning",
      theme: "dark",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      cancelButtonColor: "#374151",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie("tokenAccess");
        router.refresh();
        router.push("/");
        toast.success("Sesión cerrada. ¡Hasta pronto!");
      }
    });
  };

  return (
    <nav
      className="w-full sticky top-0 z-40"
      style={{
        backgroundColor: "rgba(15,15,30,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
          >
            <Sparkles size={17} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Stickeria
          </span>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {[
            { href: "/dashboard", label: "Inicio" },
            { href: "/dashboard/ingresos", label: "Ingresos" },
          ].map(({ href, label }) => {
            const active = path === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors block"
                  style={{
                    color: active ? "#ffffff" : "#94a3b8",
                    backgroundColor: active ? "rgba(168,85,247,0.1)" : "transparent",
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <LogOut size={15} />
          Salir
        </button>
      </div>
    </nav>
  );
}
