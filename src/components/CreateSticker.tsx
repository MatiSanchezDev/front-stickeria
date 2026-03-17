"use client";

import { StickerInput } from "@/interface/sticker.interface";
import { createSticker } from "@/lib/api/sticker";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { CopyButton } from "./CopyButton";
import { Plus, X } from "lucide-react";

export const CreateSticker = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [blockButton, setBlockButton] = useState(false);
  const token = getCookie("tokenAccess")?.toString() || "";

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    setBlockButton(true);
    event.preventDefault();
    const target = event.currentTarget;
    const nameSticker = target.namee.value.trim();
    const priceSticker = Number(target.price.value.trim());

    const data: StickerInput = { name: nameSticker, price: priceSticker };

    try {
      const sticker = await createSticker(data, token);
      if (sticker.success) {
        toast.success(sticker.message);
        router.refresh();
        setBlockButton(false);
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error("Cerrá sesión y volvé a ingresar.");
      setBlockButton(false);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <Plus size={15} />
          Agregar Nuevo Sticker
        </button>
        <CopyButton />
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6"
            style={{
              backgroundColor: "#1a1a2e",
              border: "1px solid rgba(168,85,247,0.3)",
              boxShadow: "0 0 60px rgba(168,85,247,0.15)",
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg cursor-pointer transition-colors"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              <X size={17} />
            </button>

            <h2 className="font-bold text-xl text-center text-white mb-6">
              Agregar Sticker
            </h2>

            <form onSubmit={onSubmitForm} className="flex flex-col gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: "#94a3b8" }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="namee"
                  id="namee"
                  placeholder="Ej: Sticker 5x5"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all text-white"
                  style={{
                    backgroundColor: "#0f0f1e",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: "#94a3b8" }}>
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="$500"
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{
                    backgroundColor: "#0f0f1e",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl font-medium text-sm cursor-pointer transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94a3b8",
                  }}
                >
                  Cancelar
                </button>
                <button
                  disabled={blockButton}
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white transition-opacity"
                  style={{
                    background: blockButton
                      ? "rgba(168,85,247,0.4)"
                      : "linear-gradient(135deg, #a855f7, #ec4899)",
                    cursor: blockButton ? "not-allowed" : "pointer",
                    opacity: blockButton ? 0.7 : 1,
                  }}
                >
                  {blockButton ? "Agregando..." : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
