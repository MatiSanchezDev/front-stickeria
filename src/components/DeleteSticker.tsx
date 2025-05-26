"use client";

import { deleteSticker } from "@/lib/api/sticker";
import { getCookie } from "cookies-next";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Props {
  id: string | number;
  name: string;
  price: number;
}

export const DeleteSticker = ({ id, name, price }: Props) => {
  const router = useRouter();
  const token = getCookie("tokenAccess")?.toString() || "";

  const handleDeleteSticker = async () => {
    Swal.fire({
      title: "¿Queres eliminar este sticker?",
      text: `Se eliminará el | ${name} | $${price}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar sticker",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sticker Eliminado",
          text: `Usted elimino el ${name} | $${price}`,
          icon: "success",
        });
        try {
          const delSticker = await deleteSticker(id, token);
          if (delSticker.success) {
            toast.success("Sticker eliminado con éxito");
            router.refresh();
          }
        } catch (error) {
          console.log("Error al eliminar: ", error);
          toast.error(
            "Error al eliminar el sticker, vuelva a iniciar sesion e intente de nuevo."
          );
        }
      }
    });
  };
  return (
    <button
      onClick={() => handleDeleteSticker()}
      title="Editar Sticker"
      className="absolute left-1 bottom-0 p-1 hover:bg-red-500 rounded-full cursor-pointer"
    >
      <Trash2 size={18} />
    </button>
  );
};
