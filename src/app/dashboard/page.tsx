import { CreateSticker } from "@/components/CreateSticker";
import { SectionCardSticker } from "@/components/SectionCardSticker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Stickeria",
  description: "Dashboard - Stickeria",
};

export default function DashboardPage() {
  return (
    <section className="p-6 w-full h-auto bg-gray-900 text-white">
      <h1 className="text-center text-4xl font-bold pt-4 font-mono">
        Stickeria App
      </h1>
      <CreateSticker />
      <div className="grid grid-cols-2 w-full h-auto divide-x-2">
        <div className="flex flex-col">
          <h2 className="font-mono text-2xl text-center mb-6">Stickers</h2>
          <SectionCardSticker />
        </div>
        <div>
          <h2 className="font-mono text-2xl text-center mb-6">Nuevo Pedido</h2>
        </div>
      </div>
    </section>
  );
}
