"use client";
import { Order } from "@/interface/order.interface";
import { editOrder } from "@/lib/api/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

interface Props { order: Order; token: string }

export const Checkboxs = ({ order, token }: Props) => {
  const router = useRouter();
  const [checkboxDisabled, setCheckboxDisabled] = useState<boolean>(false);

  const update = async (field: "prepaid" | "delivered") => {
    setCheckboxDisabled(true);
    try {
      const data = {
        name: order.name,
        total_price: order.total_price,
        prepaid: field === "prepaid" ? !order.prepaid : order.prepaid,
        delivered: field === "delivered" ? !order.delivered : order.delivered,
        message_client: order.message_client,
      };
      const res = await editOrder(Number(order.id), data, token);
      if (res.success) {
        toast(`Estado '${field === "prepaid" ? "Pagado" : "Entregado"}' actualizado`);
        router.refresh();
        setCheckboxDisabled(false);
      }
    } catch (error) {
      toast.error("Error al actualizar el estado");
      console.log(error);
      router.refresh();
      setCheckboxDisabled(false);
    }
  };

  return (
    <>
      <td className="px-4 py-3 text-center">
        {checkboxDisabled ? (
          <Loader />
        ) : (
          <input
            type="checkbox"
            onChange={() => update("prepaid")}
            checked={order.prepaid}
            className="w-4 h-4 cursor-pointer rounded"
            style={{ accentColor: "#a855f7" }}
          />
        )}
      </td>
      <td className="px-4 py-3 text-center">
        {checkboxDisabled ? (
          <Loader />
        ) : (
          <input
            type="checkbox"
            onChange={() => update("delivered")}
            checked={order.delivered}
            className="w-4 h-4 cursor-pointer rounded"
            style={{ accentColor: "#a855f7" }}
          />
        )}
      </td>
    </>
  );
};
