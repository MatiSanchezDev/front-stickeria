"use client";

import {
  Sticker,
  StickerArray,
  StickerWithCreatedAt,
} from "@/interface/sticker.interface";
import { DeleteSticker } from "./DeleteSticker";
import { PackageCheck } from "lucide-react";
import { useOrderStore } from "@/store/slices/orderSlice";
import { toast } from "react-toastify";

interface Props {
  stickers: StickerArray;
}
export const StickerCard = ({ stickers = [] }: Props) => {
  const { addToOrder } = useOrderStore();

  const formatToBuenosAiresTime = (utcDateString: string) => {
    return new Date(utcDateString).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const handleAddSticker = (sticker: Sticker) => {
    addToOrder(sticker, 1);
    toast.success(`Sticker ${sticker.name} agregado.`);
  };

  return (
    <>
      {stickers.map((sticker: StickerWithCreatedAt) => (
        <div
          key={sticker.id}
          className="flex flex-col border shadow-lg rounded-xl bg-gray-700 border-neutral-700 capitalize w-auto max-h-60 group select-none overflow-hidden "
        >
          <div className="border-b rounded-t-xl bg-gray-800 border-neutral-700">
            <p className="mt-1 text-md text-neutral-400 text-center font-bold">
              {formatToBuenosAiresTime(sticker.created_at)}
            </p>
          </div>
          <div className="flex w-full overflow-hidden">
            <div className=" flex justify-center items-center flex-col font-bold my-2 w-full">
              <h3 className="text-md font-mono text-white tracking-widest">
                {sticker.name}
              </h3>
              <p className="mt-2 text-white text-xl font-mono">
                $ {sticker.price}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center">
            <DeleteSticker
              id={sticker.id}
              name={sticker.name}
              price={sticker.price}
            />
            <button
              title="Agregar pedido"
              onClick={() => handleAddSticker(sticker)}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center cursor-pointer active:scale-105 py-2 font-mono gap-2"
            >
              <PackageCheck strokeWidth={2.25} size={25} />
              Agregar
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
