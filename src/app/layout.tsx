import type { Metadata } from "next";
import { Luckiest_Guy, Rowdies } from "next/font/google";
import "./globals.css";
import { Flip, ToastContainer } from "react-toastify";
import Head from "next/head";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-luckiest_guy", // variable CSS opcional
});

const anton = Rowdies({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alfa", // variable CSS opcional
});

export const metadata: Metadata = {
  title: "Stickeria App",
  description: "Manejo de pedidos e ingresos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body
        className={`${luckiestGuy.variable} ${anton.variable} antialiased bg-gray-900 text-white`}
      >
        {children}
        <ToastContainer
          position="top-center"
          limit={2}
          autoClose={1300}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </body>
    </html>
  );
}
