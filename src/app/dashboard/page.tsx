import { CreateSticker } from "@/components/CreateSticker";
import { OrderListComponent } from "@/components/OrderListComponent";
import { SectionCardSticker } from "@/components/SectionCardSticker";
import { SectionOrderSticker } from "@/components/SectionOrderSticker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Stickeria",
  description: "Dashboard - Stickeria",
};

export default function DashboardPage() {
  return (
    <section className="p-6 w-full h-auto bg-gray-900 text-white">
      <div className="w-full flex justify-center items-center">
        <span className="text-7xl cursor-default">🦄</span>
      </div>
      <h1 className="text-center text-4xl font-bold pt-1 font-alfa cursor-default">
        Stickeria App
      </h1>
      <CreateSticker />
      <div className="grid grid-cols-2 w-full h-auto">
        <div className="flex flex-col">
          <h2 className="font-alfa text-2xl text-center mb-6">Stickers</h2>
          <SectionCardSticker />
        </div>
        <div>
          <h2 className="font-alfa text-2xl text-center mb-6">Nuevo Pedido</h2>
          <SectionOrderSticker />
        </div>
      </div>
      <div className="px-20 mt-6">
        <hr className="mb-7" />
      </div>
      <OrderListComponent />
    </section>
  );
}
