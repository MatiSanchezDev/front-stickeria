import { useEffect, useState } from "react";
import { OrderItems } from "./OrderItems";
import { useOrderStore } from "@/store/slices/orderSlice";
import { Package, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { createOrder } from "@/lib/api/order";
import { getCookie } from "cookies-next";
import { OrderInput } from "@/interface/order.interface";
import { useRouter } from "next/navigation";
import { copyOrderToClipboard } from "@/helpers/saveClipboard";

export const OrderComponent = () => {
  const {
    items,
    client,
    discount,
    addClient,
    addDiscount,
    calculateTotal,
    total_price,
    clearTotalOrder,
  } = useOrderStore();

  const [blockButton, setBlockButton] = useState<boolean>(false);
  const token = getCookie("tokenAccess")?.toString() || "";
  const router = useRouter();

  useEffect(() => {
    calculateTotal();
  }, [items, calculateTotal, discount]);

  const totalStickers = items.reduce((acc, item) => acc + item.quantity, 0);

  const onChangeNameUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    addClient(e.target.value.trim());
  };

  const onChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    addDiscount(Number(e.target.value.trim()));
  };

  const handleSubmitOrder = async () => {
    setBlockButton(true);
    if (client.length < 3) {
      toast.warning("Falta nombre del cliente.");
      setBlockButton(false);
      return;
    }
    try {
      const copyMessage = await copyOrderToClipboard(
        client,
        items,
        total_price
      );
      const data: OrderInput = {
        name: client,
        total_price,
        prepaid: false,
        delivered: false,
        message_client: copyMessage,
      };
      const orden = await createOrder(data, token);
      console.log(orden);
      if (orden.success) {
        //Gurdar en base de datos luego
        clearTotalOrder();
        router.refresh();
        toast.success("✨Pedido creado!");
      }
      setBlockButton(false);
    } catch (error) {
      toast.error("Token expirado. Debe logearse de nuevo.");
      console.log("Error: ", error);
    }
  };

  const handleDeleteTotalOrder = () => {
    Swal.fire({
      title: "¿Queres cancelar todo el pedido?",
      text: "Se eliminara todos los stickers y descuento aplicado.",
      icon: "warning",
      theme: "dark",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Limpiar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Pedido eliminado",
          text: "Ahora podes crear un nuevo pedido.",
          icon: "success",
          theme: "dark",
        });
        clearTotalOrder();
      }
    });
  };

  return (
    <div className="w-full">
      <div className="px-6 pb-4 flex flex-col gap-3">
        <div className="w-full flex justify-end items-end">
          <button
            onClick={() => handleDeleteTotalOrder()}
            className="from-red-500 via-red-600 to-red-700 focus:ring-red-800 hover:bg-gradient-to-br cursor-pointer text-white bg-gradient-to-r focus:ring-4 focus:outline-none shadow-lg font-medium rounded-lg text-md px-5 py-2 text-center font-mono flex items-center gap-2"
          >
            <Trash2 size={22} />
            Cancelar Pedido
          </button>
        </div>
        <div className="w-full">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-bold text-white font-mono tracking-widest"
          >
            🌟 Nombre del Cliente
          </label>
          <input
            onChange={onChangeNameUser}
            type="text"
            name="nombre"
            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa nombre del cliente"
            required
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="discount"
            className="block mb-2 text-sm font-bold text-white font-mono tracking-widest "
          >
            🌟 Agregar descuento %
          </label>
          <input
            onChange={onChangeDiscount}
            type="number"
            name="discount"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Descuento %"
            required
          />
        </div>
      </div>
      <OrderItems />
      <div className="w-full flex flex-col font-mono px-6 py-2 mt-4 gap-2">
        <h3 className="text-center font-alfa text-xl">Resumen del Pedido</h3>
        <div className="w-full flex items-center justify-between">
          <span className="text-xl">Numbre del cliente: </span>
          <span className="text-xl capitalize">
            {client === "" ? "-------" : client}
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xl">Cantidad de Stickers: </span>
          <span className="text-3xl">{totalStickers} uni.</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xl">Descuento aplicado: </span>
          <span className="text-3xl">{discount} %</span>
        </div>
        <div className="w-full flex items-center justify-between ">
          <span className="text-xl">Total: </span>
          <span className="text-3xl">$ {total_price.toFixed(2)}</span>
        </div>
      </div>
      <div className="w-full flex font-mono px-6 items-center justify-center gap-6 ">
        <button
          onClick={() => handleSubmitOrder()}
          disabled={blockButton}
          className={`${
            blockButton
              ? "from-gray-500 via-gray-600 to-gray-700 focus:ring-gray-800 cursor-not-allowed"
              : "from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-800 hover:bg-gradient-to-br cursor-pointer"
          } text-white bg-gradient-to-r focus:ring-4 focus:outline-none shadow-lg font-medium rounded-lg text-md px-5 mt-6 py-2 text-center font-mono flex items-center gap-2 mb-6`}
        >
          <Package size={22} />
          {blockButton ? "Cargando pedido..." : "Crear pedido"}
        </button>
      </div>
    </div>
  );
};
