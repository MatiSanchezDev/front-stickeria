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
    <section className="p-3 md:p-6 w-full h-auto bg-gray-900 text-white">
      <div className="w-full flex justify-center items-center">
        <span className="text-7xl cursor-default mb-2 md:mb-0">🦄</span>
      </div>

      <h1 className="text-center text-4xl font-bold pt-1 font-alfa cursor-default">
        Stickeria App
      </h1>
      <CreateSticker />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-auto">
        <div className="flex flex-col">
          <hr className="block md:hidden mb-4" />
          <h2 className="font-alfa text-4xl text-center mb-6 underline">
            Stickers
          </h2>
          <SectionCardSticker />
        </div>
        <div>
          <hr className="block md:hidden my-4" />
          <h2 className="font-alfa text-4xl text-center mb-6 mt-4 md:mt-0 underline">
            Nuevo Pedido
          </h2>
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
