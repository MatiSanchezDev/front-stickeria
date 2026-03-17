"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PackageCheck, Trash2 } from "lucide-react";
import { Sticker, StickerWithCreatedAt } from "@/interface/sticker.interface";
import { useOrderStore } from "@/store/slices/orderSlice";
import { deleteSticker } from "@/lib/api/sticker";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ACCENTS = [
  "#a855f7",
  "#ec4899",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
];

interface Props {
  sticker: StickerWithCreatedAt;
  index: number;
}

export const StickerCard = ({ sticker, index }: Props) => {
  const { addToOrder } = useOrderStore();
  const router = useRouter();
  const token = getCookie("tokenAccess")?.toString() || "";
  const accent = ACCENTS[index % ACCENTS.length];
  const [hovered, setHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sticker.id });

  const handleAdd = (s: Sticker) => addToOrder(s, 1);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Eliminar este sticker?",
      text: `${sticker.name} — $${sticker.price}`,
      icon: "warning",
      theme: "dark",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      cancelButtonColor: "#374151",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteSticker(sticker.id, token);
          if (res.success) {
            toast.success("Sticker eliminado");
            router.refresh();
          }
        } catch {
          toast.error("Error al eliminar.");
        }
      }
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        backgroundColor: "#1a1a2e",
        borderColor: accent + "55",
      }}
      className="relative flex flex-col rounded-2xl border select-none cursor-grab active:cursor-grabbing overflow-hidden min-h-[140px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...attributes}
      {...listeners}
    >
      {/* Accent top bar */}
      <div className="h-1 w-full" style={{ backgroundColor: accent }} />

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 py-7 gap-3 items-center justify-center text-center">
        <h3 className="font-semibold text-xl capitalize text-white leading-tight">
          {sticker.name}
        </h3>
        <span className="text-3xl font-bold font-mono" style={{ color: accent }}>
          ${sticker.price}
        </span>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-3 transition-all duration-250"
        style={{
          backgroundColor: hovered ? "rgba(10,10,30,0.82)" : "transparent",
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        <button
          title="Agregar al pedido"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => handleAdd(sticker)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-85"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <PackageCheck size={15} />
          Agregar
        </button>

        <button
          title="Eliminar sticker"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleDelete}
          className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all"
          style={{
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.borderColor = "rgba(248,113,113,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};
