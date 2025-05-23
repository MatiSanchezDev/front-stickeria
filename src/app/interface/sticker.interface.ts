export interface Sticker {
  id?: number | string;
  name: string;
  price: string | number;
}

export type StickerArray = Sticker[];

export type StickerId = string | number;
