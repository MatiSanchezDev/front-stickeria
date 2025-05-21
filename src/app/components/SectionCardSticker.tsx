"use client";
import { useEffect, useState } from "react";
import { StickerCard, StickerInterface } from "../interface/StickeriaApp";
import { useStickerStore } from "../store/slices/stickerSlice";
import { PencilLine, Trash2 } from "lucide-react";
import SimpleModal from "./SimpleModal";

const initialStickers: StickerCard = [
  {
    id: 1,
    name: "Sticker 6x6",
    price: 700,
  },
  {
    id: 2,
    name: "Sticker 5x5",
    price: 500,
  },
  {
    id: 3,
    name: "Sticker 10x10",
    price: 1000,
  },
  {
    id: 4,
    name: "Sticker Personalizado Basico",
    price: 3500,
  },
];

export const SectionCardSticker = () => {
  const { setStickers, stickers, editSticker } = useStickerStore();
  const [isModalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stickerEdit, setStickerEdit] = useState<any>({});
  const [stickerName, setStickerName] = useState("");
  const [stickerPrice, setStickerPrice] = useState("");

  useEffect(() => {
    setStickers(initialStickers);
  }, [stickers, setStickers]);

  const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStickerName(e.target.value);
  };

  const onChangeInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStickerPrice(e.target.value);
  };

  const handleEditModal = (sticker: StickerInterface) => {
    setModalOpen(true);
    setStickerEdit(sticker);
  };

  const handleSaveEdit = () => {
    setModalOpen(false);
    const stickerNew = {
      id: stickerEdit.id,
    };
    editSticker(stickerEdit.id, stickerNew);
  };

  return (
    <section className="w-1/2 h-auto grid grid-cols-3 gap-2">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="relative border/90 hover:border hover:border-black/20 flex flex-col justify-center items-center w-60 h-32 p-1 shadow-lg rounded-2xl cursor-pointer gap-3"
        >
          <span className="absolute bottom-2 right-2 text-black/80 hover:text-black hover:bg-gray-100 p-2 rounded-full">
            <Trash2 size={15} />
          </span>
          <span
            onClick={() => handleEditModal(sticker)}
            className="absolute bottom-2 left-2 text-black/80 hover:text-black hover:bg-gray-100 p-2 rounded-full"
          >
            <PencilLine size={15} />
          </span>
          <h3 className="text-center font-bold capitalize">{sticker.name}</h3>
          <span className="font-bold text-xl">${sticker.price}</span>
        </div>
      ))}

      <SimpleModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Editar contenido</h2>
        <label>Nombre</label>
        <input
          type="text"
          onChange={onChangeInputName}
          value={stickerName}
          placeholder="Editar Nombre"
          className="w-full border p-2 rounded mb-4"
        />
        <label>Precio</label>
        <input
          type="number"
          onChange={onChangeInputPrice}
          value={stickerPrice}
          placeholder="Editar Precio"
          className="w-full border p-2 rounded mb-4"
        />
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleSaveEdit()}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </SimpleModal>
    </section>
  );
};
