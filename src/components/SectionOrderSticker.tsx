"use client";

import { useOrderStore } from "@/store/slices/orderSlice";
import { OrderComponent } from "./OrderComponent";

export const SectionOrderSticker = () => {
  const { items } = useOrderStore();
  console.log(items);
  return (
    <>
      <div className="w-full h-auto p-2 flex flex-col justify-center items-center rounded-2xl">
        {items.length === 0 ? (
          <div className="w-full font-mono text-2xl flex flex-col justify-center items-center gap-4">
            <h2>🙊 No hay un pedido actualmente 🙊</h2>
            <p className="text-lg ">Agregue sticker para crear una orden.</p>
            <p>⬅️⬅️⬅️⬅️⬅️⬅️</p>
          </div>
        ) : (
          <>
            <OrderComponent />
          </>
        )}
      </div>
    </>
  );
};
