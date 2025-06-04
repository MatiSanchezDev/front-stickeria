"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const ButtonNotFound = () => {
  const router = useRouter();
  const navigateToLogin = () => {
    deleteCookie("tokenAccess");
    router.refresh();
  };
  return (
    <button
      onClick={() => navigateToLogin()}
      className="inline-flex text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-900 my-4"
    >
      Volver a logearse
    </button>
  );
};
