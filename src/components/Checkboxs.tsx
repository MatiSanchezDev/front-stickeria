"use client";

import { Order } from "@/interface/order.interface";
import { editOrder } from "@/lib/api/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

interface Props {
  order: Order;
  token: string;
}

export const Checkboxs = ({ order, token }: Props) => {
  const router = useRouter();
  const [checkboxDisabled, setCheckboxDisabled] = useState<boolean>(false);

  const handleChangeDelivered = async () => {
    setCheckboxDisabled(true);
    try {
      const data = {
        name: order.name,
        total_price: order.total_price,
        prepaid: order.prepaid,
        delivered: !order.delivered,
        message_client: order.message_client,
      };
      const changeCheckbox = await editOrder(Number(order.id), data, token);
      if (changeCheckbox.success) {
        toast("Se cambió el Estado 'Entregado'");
        router.refresh();
        setCheckboxDisabled(false);
      }
    } catch (error) {
      toast.error("Error al cambiar el estado 'Entregado'");
      console.log(error);
      router.refresh();
      setCheckboxDisabled(false);
    }
  };

  const handleChangePrepaid = async () => {
    setCheckboxDisabled(true);
    try {
      const data = {
        name: order.name,
        total_price: order.total_price,
        delivered: order.delivered,
        prepaid: !order.prepaid,
        message_client: order.message_client,
      };
      const changeCheckbox = await editOrder(Number(order.id), data, token);
      if (changeCheckbox.success) {
        toast("Se cambió el Estado 'Pagado'");
        router.refresh();
        setCheckboxDisabled(false);
      }
    } catch (error) {
      toast.error("Error al cambiar el estado 'Pagado'");
      console.log(error);
      router.refresh();
      setCheckboxDisabled(false);
    }
  };
  return (
    <>
      <td className="px-6 py-4 text-center">
        {checkboxDisabled ? (
          <Loader />
        ) : (
          <input
            type="checkbox"
            onChange={handleChangePrepaid}
            checked={order.prepaid}
            className="accent-green-600 cursor-pointer w-4 h-4"
          />
        )}
      </td>
      <td className="px-6 py-4 text-center">
        {checkboxDisabled ? (
          <Loader />
        ) : (
          <input
            type="checkbox"
            onChange={handleChangeDelivered}
            checked={order.delivered}
            className="accent-green-600 cursor-pointer w-4 h-4"
          />
        )}
      </td>
    </>
  );
};
