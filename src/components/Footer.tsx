import Link from "next/link";
import LinkedIn from "./icons/Linkedin";
import GitHub from "./icons/Github";

export const Footer = () => {
  return (
    <footer
      className="mt-16 border-t"
      style={{
        backgroundColor: "#0a0a1a",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-xl font-bold tracking-widest"
            style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            STICKERIA
          </span>

          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="https://www.linkedin.com/in/ms-dev-web/"
                target="_blank"
                className="transition-opacity hover:opacity-70"
                style={{ color: "#64748b" }}
              >
                <LinkedIn />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/MatiSanchezDev"
                target="_blank"
                className="transition-opacity hover:opacity-70"
                style={{ color: "#64748b" }}
              >
                <GitHub />
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="mt-6 pt-4 border-t text-center font-mono text-xs"
          style={{ borderColor: "rgba(255,255,255,0.05)", color: "#64748b" }}
        >
          © 2023{" "}
          <Link
            href="https://github.com/MatiSanchezDev"
            target="_blank"
            className="font-bold hover:opacity-70"
            style={{ color: "#a855f7" }}
          >
            MS-Dev™
          </Link>{" "}
          — Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
