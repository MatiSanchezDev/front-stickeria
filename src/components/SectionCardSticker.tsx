import { Sticker } from "@/interface/sticker.interface";
import { getStickers } from "@/lib/api/sticker";
import { PenLine, Trash2 } from "lucide-react";
import { cookies } from "next/headers";

export const SectionCardSticker = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tokenAccess")?.value.toString() || "";
    const stickers = await getStickers(token);
    console.log(stickers.data);

    const formatToBuenosAiresTime = (utcDateString: string) => {
      return new Date(utcDateString).toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        dateStyle: "short",
        timeStyle: "short",
      });
    };

    return (
      <div className="grid grid-cols-3 gap-6 my-2">
        {stickers?.data.map((sticker: Sticker) => (
          <div
            key={sticker.id}
            className="flex flex-col border shadow-lg rounded-xl bg-gray-700 border-neutral-700 capitalize max-w-56 max-h-60 cursor-pointer group shadow-blue-600/30 select-none overflow-hidden active:scale-105"
          >
            <div className="border-b rounded-t-xl bg-gray-800 border-neutral-700">
              <p className="mt-1 text-md text-neutral-400 text-center font-bold">
                {formatToBuenosAiresTime(sticker.created_at)}
              </p>
            </div>
            <div className="relative flex justify-center items-center flex-col font-bold my-2">
              <h3 className="text-lg font-bold text-white">{sticker.name}</h3>
              <p className="mt-2 text-white text-xl">${sticker.price}</p>
              <span
                title="Borrar Sticker"
                className="absolute right-1 bottom-0 p-1 hover:bg-blue-500 rounded-full"
              >
                <PenLine size={18} />
              </span>
              <span
                title="Editar Sticker"
                className="absolute left-1 bottom-0 p-1 hover:bg-red-500 rounded-full"
              >
                <Trash2 size={18} />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};
