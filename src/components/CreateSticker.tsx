"use client";

import { StickerInput } from "@/interface/sticker.interface";
import { createSticker } from "@/lib/api/sticker";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { CopyButton } from "./CopyButton";

export const CreateSticker = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [blockButton, setBlockButton] = useState(false);
  const token = getCookie("tokenAccess")?.toString() || "";

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    setBlockButton(true);
    event.preventDefault();
    const target = event.currentTarget;
    const nameSticker = target.namee.value.trim();
    const priceSticker = Number(target.price.value.trim());

    const data: StickerInput = {
      name: nameSticker,
      price: priceSticker,
    };

    try {
      const sticker = await createSticker(data, token);
      if (sticker.success) {
        toast.success(sticker.message);
        router.refresh();
        setBlockButton(false);
      }
    } catch (error) {
      console.log("Entre al catch: ", error);
      toast.error(
        "Cierre sesion y vuelva a iniciar en caso de salir este error."
      );
      setBlockButton(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col mb-8">
      <div className="flex gap-3">
        <button
          onClick={() => setShowForm(!showForm)}
          className={`${
            !showForm
              ? "from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-800 mb-6"
              : "from-yellow-500 via-yellow-600 to-yellow-700 focus:ring-yellow-800 mb-6"
          } text-white bg-gradient-to-r hover:bg-gradient-to-br focus:ring-4 focus:outline-none  shadow-lg font-medium rounded-lg text-md px-5 mt-6 py-2 text-center font-mono cursor-pointer`}
        >
          {`${!showForm ? "Agregar Nuevo Sticker" : "Cerrar ventana"}`}
        </button>
        <CopyButton />
      </div>
      {showForm && (
        <form
          onSubmit={onSubmitForm}
          className="flex justify-center items-center flex-col w-1/3  border-2 p-6 rounded-2xl bg-gray-800 "
        >
          <h2 className="font-mono text-2xl text-center mb-4">
            Agregar nuevo Sticker
          </h2>
          <div className="w-full">
            <label
              htmlFor="namee"
              className="block mb-2 text-sm font-bold text-white"
            >
              Numbre del Sticker Personalizados
            </label>
            <input
              type="text"
              name="namee"
              id="namee"
              className=" border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Sticker 5x5 "
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-4"
            >
              Precio del Sticker
            </label>
            <div className="w-full relative">
              <input
                type={"number"}
                name="price"
                id="price"
                placeholder="$500"
                className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            </div>
          </div>
          <button
            disabled={blockButton}
            type="submit"
            className={`text-white ${
              blockButton
                ? "bg-gray-500 cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-gray-800 shadow-lg shadow-gray-800/80"
                : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-800/80"
            } font-medium rounded-lg text-md px-5 mt-6 py-2 text-center font-mono w-full`}
          >
            Agregar Sticker
          </button>
        </form>
      )}
    </div>
  );
};
