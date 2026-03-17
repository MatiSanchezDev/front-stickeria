"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import { StickerWithCreatedAt } from "@/interface/sticker.interface";
import { StickerCard } from "./StickerCard";
import { reorderStickers } from "@/lib/api/sticker";
import { getCookie } from "cookies-next";

interface Props {
  stickers: StickerWithCreatedAt[];
}

export const StickerDndList = ({ stickers }: Props) => {
  const [items, setItems] = useState(stickers);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setItems(stickers); }, [stickers]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id);
      const newIndex = prev.findIndex((s) => s.id === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);

      const token = getCookie("tokenAccess")?.toString() || "";
      const payload = reordered.map((s, i) => ({ id: Number(s.id), position: i + 1 }));
      reorderStickers(payload, token).catch(console.error);

      return reordered;
    });
  };

  const grid = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((sticker, index) => (
        <StickerCard key={sticker.id} sticker={sticker} index={index} />
      ))}
    </div>
  );

  if (!mounted) return grid;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((s) => s.id)} strategy={rectSortingStrategy}>
        {grid}
      </SortableContext>
    </DndContext>
  );
};
