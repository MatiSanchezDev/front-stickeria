"use client";
import { deleteOrder } from "@/lib/api/order";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Props { id: number; token: string }

export const DeleteOrder = ({ id, token }: Props) => {
  const router = useRouter();

  const handleDeleteOrder = async () => {
    try {
      Swal.fire({
        title: "¿Eliminar este pedido?",
        icon: "warning",
        theme: "dark",
        showCancelButton: true,
        confirmButtonColor: "#a855f7",
        cancelButtonColor: "#374151",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const delOrder = await deleteOrder(id, token);
          if (delOrder.success) {
            toast.success("Pedido eliminado");
            router.refresh();
          }
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar. Cerrá sesión e intentá de nuevo.");
    }
  };

  return (
    <td className="px-4 py-3 text-center">
      <button
        onClick={handleDeleteOrder}
        className="p-1.5 rounded-lg cursor-pointer transition-colors"
        style={{ color: "#64748b" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        <Trash2 size={15} />
      </button>
    </td>
  );
};
