import { getStickers } from "@/lib/api/sticker";
import { cookies } from "next/headers";
import { StickerCard } from "./StickerCard";

export const SectionCardSticker = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tokenAccess")?.value.toString() || "";
    const stickers = await getStickers(token);
    console.log(stickers);

    return (
      <>
        {stickers.data.length > 0 && (
          <div className="grid grid-cols-3 gap-6 my-2 relative">
            <StickerCard stickers={stickers.data} />
          </div>
        )}
        {stickers.length === 0 && (
          <div className="w-full flex flex-col justify-center items-center ">
            <h2 className="text-2xl font-mono">No hay stickers actualmente.</h2>
            <p className="font-thin">
              Su inicio de sesion expiró. Por favor ingrese nuevamente.
            </p>
          </div>
        )}
        {stickers.data.length === 0 && (
          <div className="w-full flex flex-col justify-center items-center ">
            <h2 className="text-2xl font-mono">No hay stickers actualmente.</h2>
            <p className="font-thin">Borró todos los stickers.</p>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};
