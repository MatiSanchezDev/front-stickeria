"use client";

import { useOrderStore } from "@/store/slices/orderSlice";
import { OrderComponent } from "./OrderComponent";

export const SectionOrderSticker = () => {
  const { items } = useOrderStore();

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      {items.length === 0 ? (
        <div
          className="w-full flex flex-col justify-center items-center rounded-2xl p-10 gap-4 text-center"
          style={{
            backgroundColor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span className="text-4xl">📦</span>
          <h2 className="font-semibold text-base" style={{ color: "#94a3b8" }}>
            Sin stickers en el pedido
          </h2>
          <p className="text-sm" style={{ color: "#475569" }}>
            <span className="hidden md:inline">← Agregá stickers desde la izquierda</span>
            <span className="inline md:hidden">↑ Agregá stickers desde arriba</span>
          </p>
        </div>
      ) : (
        <OrderComponent />
      )}
    </div>
  );
};
