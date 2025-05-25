export interface Sticker {
  id?: number | string;
  created_at: string;
  name: string;
  price: string | number;
}

export type StickerArray = Sticker[];

export type StickerId = string | number;
