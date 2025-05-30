import { Order } from "@/interface/order.interface";
import { getOrders } from "@/lib/api/order";
import { cookies } from "next/headers";
import { Checkboxs } from "./Checkboxs";
import { ClipboardCopy } from "lucide-react";
import { DeleteOrder } from "./DeleteOrder";

export const OrderListComponent = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenAccess")?.value.toString() || "";
  const orders = await getOrders(token);
  const ordenadosDesc = [...orders.data].sort((a, b) => b.id - a.id);

  const formatToBuenosAiresTime = (utcDateString: string) => {
    return new Date(utcDateString).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-alfa text-center pb-5">
        Tus ultimos pedidos
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-10 font-mono">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 text-center">
                Codigo del pedido
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Precio Total
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Fecha de creación
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Pagado
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Entregado
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Copiar Mensaje
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {ordenadosDesc.length === 0 && (
              <tr className="text-lg border-b border-gray-300 dark:border-gray-600">
                <th
                  scope="row"
                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  # ---
                </th>
                <td className="px-6 py-4 capitalize text-center">---</td>
                <td className="px-6 py-4 text-center text-xl">$ ---</td>
                <td className="px-6 py-4 text-center text-md">---</td>
                <td className="px-6 py-4 text-center text-md">----</td>
                <td className="px-6 py-4 capitalize text-center">---</td>
                <td className="px-6 py-4 text-center text-md">---</td>
                <td className="px-6 py-4 text-center text-md">---</td>
              </tr>
            )}
            {ordenadosDesc.map((order: Order) => (
              <tr
                key={order.id}
                className="text-lg border-b border-gray-300 dark:border-gray-600"
              >
                <th
                  scope="row"
                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                  #{order.id}
                </th>
                <td className="px-6 py-4 capitalize">{order.name}</td>
                <td className="px-6 py-4 text-center text-xl">
                  $ {order.total_price}
                </td>
                <td className="px-6 py-4 text-center text-md">
                  {formatToBuenosAiresTime(order.created_at)}
                </td>
                <Checkboxs order={order} token={token} />
                <td className="px-6 py-4 capitalize">
                  <div
                    title="Copiar texto para enviar"
                    className="flex justify-center items-center cursor-pointer hover:text-green-400"
                  >
                    <ClipboardCopy />
                  </div>
                </td>
                <DeleteOrder id={Number(order.id)} token={token} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
