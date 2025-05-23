import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Stickeria",
  description: "Dashboard - Stickeria",
};

export default function DashboardPage() {
  return (
    <section className="p-6 w-full h-screen bg-gray-900 text-white">
      <h1 className="text-center text-4xl font-bold pt-4">Stickeria App</h1>
      <div className="w-full h-auto flex p-4">
        <h3 className="w-1/2 text-center text-2xl">Todos Los Stickers</h3>
        <h3 className="w-1/2 text-center text-2xl">Tu Orden actual</h3>
      </div>
      <div className="w-full h-auto flex divide-x divide-black/15"></div>
    </section>
  );
}
