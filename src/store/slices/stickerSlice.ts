import { create } from "zustand";
import { StickerCard } from "../types";

interface StickerStore {
  stickers: StickerCard[];
  setStickers: (newStickers: StickerCard[]) => void;
  addSticker: (sticker: StickerCard) => void;
  removeSticker: (id: number) => void;
  clearStickers: () => void;
  editSticker: (id: number, updated: Partial<StickerCard>) => void;
}

export const useStickerStore = create<StickerStore>((set) => ({
  stickers: [],
  setStickers: (newStickers) => set({ stickers: newStickers }),
  addSticker: (sticker) =>
    set((state) => ({ stickers: [...state.stickers, sticker] })),
  removeSticker: (id) =>
    set((state) => ({
      stickers: state.stickers.filter((s) => s.id !== id),
    })),
  clearStickers: () => set({ stickers: [] }),
  editSticker: (id, updated) =>
    set((state) => ({
      stickers: state.stickers.map((s) =>
        s.id === id ? { ...s, ...updated } : s
      ),
    })),
}));
