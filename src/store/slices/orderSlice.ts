// stores/orderStore.ts
import { Sticker } from "@/interface/sticker.interface";
import { create } from "zustand";

interface OrderItem extends Sticker {
  quantity: number;
}

interface OrderState {
  items: OrderItem[];
  addToOrder: (sticker: Sticker, quantity?: number) => void;
  removeFromOrder: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  items: [],

  addToOrder: (sticker, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === sticker.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === sticker.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...sticker, quantity }],
      };
    }),

  removeFromOrder: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  clearOrder: () => set({ items: [] }),
}));
