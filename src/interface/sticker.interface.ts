export interface Sticker {
  id: number | string;
  name: string;
  price: number;
  position?: number;
}

export interface StickerInput {
  name: string;
  price: number;
}

export interface StickerWithCreatedAt extends Sticker {
  created_at: string;
  position?: number;
}

export type StickerArray = StickerWithCreatedAt[];

export type StickerId = string | number;
