"use client";

import { deleteOrder } from "@/lib/api/order";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Props {
  id: number;
  token: string;
}

export const DeleteOrder = ({ id, token }: Props) => {
  const router = useRouter();
  const handleDeleteOrder = async () => {
    try {
      Swal.fire({
        title: "¿Queres eliminar este pedido?",
        icon: "warning",
        theme: "dark",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Volver Atras",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const delOrder = await deleteOrder(id, token);
          if (delOrder.success) {
            toast.success("Order eliminada");
            router.refresh();
          }
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(
        "Error al eliminar el Pedido. Cerra sesion e intente nuevamente."
      );
    }
  };

  return (
    <td className="px-6 py-4 capitalize">
      <div
        onClick={() => handleDeleteOrder()}
        className="flex justify-center items-center cursor-pointer hover:text-green-400"
      >
        <Trash2 />
      </div>
    </td>
  );
};
