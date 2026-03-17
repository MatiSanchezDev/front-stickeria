"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PackageCheck, GripVertical } from "lucide-react";
import { Sticker } from "@/interface/sticker.interface";
import { useOrderStore } from "@/store/slices/orderSlice";
import { DeleteSticker } from "./DeleteSticker";

const ACCENT_COLORS = ["#FF6B35", "#7B2FBE", "#00C9A7"];

interface Props {
  sticker: Sticker & { created_at: string };
  index: number;
}

export const StickerRow = ({ sticker, index }: Props) => {
  const { addToOrder } = useOrderStore();
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sticker.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderLeftColor: accentColor,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center w-full bg-white rounded-xl border-2 border-[#1a1a2e] border-l-4
        shadow-[4px_4px_0px_0px_#1a1a2e] overflow-hidden select-none
        ${isDragging ? "opacity-50 z-50" : ""}`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="px-3 py-4 text-[#1a1a2e] cursor-grab active:cursor-grabbing hover:bg-gray-100 touch-none"
        title="Arrastrar"
      >
        <GripVertical size={20} />
      </button>

      {/* Name */}
      <div className="flex-1 px-2 py-3 min-w-0">
        <span className="font-bold text-[#1a1a2e] text-sm md:text-base capitalize truncate block">
          {sticker.name}
        </span>
      </div>

      {/* Price */}
      <div className="px-3 py-3">
        <span
          className="font-bold text-sm md:text-base whitespace-nowrap px-2 py-1 rounded-lg border-2 border-[#1a1a2e]"
          style={{ backgroundColor: accentColor + "22", color: accentColor }}
        >
          ${sticker.price}
        </span>
      </div>

      {/* Add to order */}
      <button
        title="Agregar al pedido"
        onClick={() => addToOrder(sticker, 1)}
        className="px-3 py-4 bg-[#00C9A7] border-l-2 border-[#1a1a2e] text-white font-bold
          hover:bg-[#00b396] active:translate-x-[2px] active:translate-y-[2px]
          cursor-pointer flex items-center gap-1 text-sm transition-transform"
      >
        <PackageCheck size={18} />
        <span className="hidden sm:inline">+</span>
      </button>

      {/* Delete */}
      <DeleteSticker id={sticker.id} name={sticker.name} price={sticker.price} />
    </div>
  );
};
