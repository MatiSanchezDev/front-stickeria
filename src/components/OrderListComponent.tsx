import { Order } from "@/interface/order.interface";
import { getOrders } from "@/lib/api/order";
import { cookies } from "next/headers";
import { Checkboxs } from "./Checkboxs";
import { DeleteOrder } from "./DeleteOrder";
import { CopyOrderButton } from "./CopyOrderButton";

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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-0 md:px-10 font-mono">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs uppercase b bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 text-center">
                Pedido Nro.
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
              <tr className="text-lg border-b  border-gray-600">
                <th
                  scope="row"
                  className="px-2 py-4 font-medium whitespace-nowrap text-white text-center"
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
            {ordenadosDesc.map((order: Order, index: number) => (
              <tr key={order.id} className="text-lg border-b  border-gray-600">
                <th
                  scope="row"
                  className="px-2 py-4 font-medium whitespace-nowrap text-white text-center"
                >
                  #{ordenadosDesc.length - index}
                </th>
                <td className="px-6 py-4 capitalize">{order.name}</td>
                <td className="px-6 py-4 text-center text-xl items-start">
                  $ {order.total_price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center text-md">
                  {formatToBuenosAiresTime(order.created_at)}
                </td>
                <Checkboxs order={order} token={token} />
                <CopyOrderButton message={order.message_client} />
                <DeleteOrder id={Number(order.id)} token={token} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
