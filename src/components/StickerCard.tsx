"use client";

import {
  StickerArray,
  StickerWithCreatedAt,
} from "@/interface/sticker.interface";
import { DeleteSticker } from "./DeleteSticker";
import { PackageCheck } from "lucide-react";
import { useOrderStore } from "@/store/slices/orderSlice";

interface Props {
  stickers: StickerArray;
}
export const StickerCard = ({ stickers }: Props) => {
  const { addToOrder, items } = useOrderStore();
  const formatToBuenosAiresTime = (utcDateString: string) => {
    return new Date(utcDateString).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  console.log(items);
  return (
    <>
      {stickers.map((sticker: StickerWithCreatedAt) => (
        <div
          key={sticker.id}
          className="flex flex-col border shadow-lg rounded-xl bg-gray-700 border-neutral-700 capitalize max-w-56 max-h-60 group shadow-blue-600/30 select-none overflow-hidden "
        >
          <div className="border-b rounded-t-xl bg-gray-800 border-neutral-700">
            <p className="mt-1 text-md text-neutral-400 text-center font-bold">
              {formatToBuenosAiresTime(sticker.created_at)}
            </p>
          </div>
          <div className="flex w-full overflow-hidden">
            <div className="relative flex justify-center items-center flex-col font-bold my-2 w-3/4">
              <h3 className="text-lg font-bold text-white">{sticker.name}</h3>
              <p className="mt-2 text-white text-xl">${sticker.price}</p>
              <DeleteSticker
                id={sticker.id}
                name={sticker.name}
                price={sticker.price}
              />
            </div>
            <button
              onClick={() => addToOrder(sticker, 1)}
              className="w-1/4 bg-green-600 hover:bg-green-700 flex items-center justify-center cursor-pointer active:scale-105"
            >
              <PackageCheck strokeWidth={2.25} size={25} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
