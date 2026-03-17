import { getItemsServices } from "@/lib/services/stickerService";
import { cookies } from "next/headers";
import { StickerDndList } from "./StickerDndList";

export const SectionCardSticker = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tokenAccess")?.value || "";
    const stickers = await getItemsServices(1, 50, token);

    if (stickers.data.length > 0) {
      const listKey = stickers.data.map((s) => s.id).join("-");
      return <StickerDndList key={listKey} stickers={stickers.data} />;
    }

    return (
      <div
        className="w-full flex flex-col justify-center items-center rounded-2xl p-12 gap-4 text-center"
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span className="text-5xl">🎴</span>
        <p className="font-medium" style={{ color: "#94a3b8" }}>
          {stickers.total === 0
            ? "Sesión expirada. Reingresá."
            : "No hay stickers. ¡Creá el primero!"}
        </p>
      </div>
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};
