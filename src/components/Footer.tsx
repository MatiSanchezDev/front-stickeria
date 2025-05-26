import Link from "next/link";
import LinkedIn from "./icons/Linkedin";
import GitHub from "./icons/Github";

export const Footer = () => {
  return (
    <footer className="shadow-sm bg-gray-900  h-96 flex flex-col items-end justify-end">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="self-center text-2xl whitespace-nowrap dark:text-white font-mono cursor-pointer hover:text-blue-400">
            Stickeria
          </span>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-3">
            <li>
              <Link
                href="https://www.linkedin.com/in/ms-dev-web/"
                target="__blank"
                className="hover:underline cursor-pointer"
              >
                <LinkedIn />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/MatiSanchezDev"
                className="hover:underline cursor-pointer"
                target="__blank"
              >
                <GitHub />
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex justify-center items-center gap-1">
          © 2023{" "}
          <Link
            href="https://github.com/MatiSanchezDev"
            target="__blank"
            className="hover:underline font-bold hover:text-blue-400"
          >
            MS-Dev™
          </Link>
          - Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};
