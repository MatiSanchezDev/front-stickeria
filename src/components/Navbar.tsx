"use client";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname().replace("/", "");

  const handleLogout = () => {
    Swal.fire({
      title: "¿Queres salir de tu cuenta?",
      icon: "warning",
      theme: "dark",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir de mi Cuenta",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie("tokenAccess");
        router.refresh();
        router.push("/");
        toast.success("Ustéd cerró sesión con éxito. ¡Vuelva pronto!");
      }
    });
  };

  return (
    <nav className="bg-gray-800 w-full start-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/dashboard"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold text-white font-mono tracking-wider hover:text-blue-400">
            Stickeria
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => handleLogout()}
            className="bg-gradient-to-r hover:bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 focus:ring-yellow-800 shadow-yellow-800/80 text-white focus:ring-4 focus:outline-none rounded-lg text-sm px-4 py-2 text-center font-mono tracking-wider cursor-pointer flex items-center gap-2"
          >
            <LogOut size={20} />
            Salir
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600 cursor-pointer"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-mono border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 tracking-wider">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${
                  path === "dashboard" ? "text-blue-500" : "text-white"
                } hover:text-blue-500`}
                aria-current="page"
              >
                Inicio
              </Link>
            </li>
            {/*   <li>
              <Link
                href="/my-orders"
                className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${
                  path === "my-orders" ? "text-blue-500" : "text-white"
                } hover:text-blue-500`}
              >
                Pedidos
              </Link>
            </li>
            <li>
              <Link
                href="/my-earnings"
                className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${
                  path === "my-earnings" ? "text-blue-500" : "text-white"
                } hover:text-blue-500`}
              >
                Ganancias
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
