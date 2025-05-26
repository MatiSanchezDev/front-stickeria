import { getStickers } from "@/lib/api/sticker";
import { cookies } from "next/headers";
import { StickerCard } from "./StickerCard";

export const SectionCardSticker = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tokenAccess")?.value.toString() || "";
    const stickers = await getStickers(token);
    console.log(stickers.data);

    return (
      <div className="grid grid-cols-3 gap-6 my-2 relative">
        <StickerCard stickers={stickers.data} />
      </div>
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};
