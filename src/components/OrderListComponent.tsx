import { Order } from "@/interface/order.interface";
import { getOrdersServices } from "@/lib/services/orderService";
import { cookies } from "next/headers";
import { Checkboxs } from "./Checkboxs";
import { DeleteOrder } from "./DeleteOrder";
import { CopyOrderButton } from "./CopyOrderButton";
import { PaginationControls } from "./PaginationControls";

interface Props { page: number }

export const OrderListComponent = async ({ page }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenAccess")?.value.toString() || "";
  const orders = await getOrdersServices(page, 30, token);
  const ordenadosDesc = [...orders.data].sort(
    (a: Order, b: Order) => Number(b.id) - Number(a.id)
  );

  const fmt = (d: string) =>
    new Date(d).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="w-full">
      <h2 className="text-2xl font-alfa text-center pb-5 text-white">
        Tus últimos pedidos
      </h2>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Nro.", "Nombre", "Total", "Fecha", "Pagado", "Entregado", "Copiar", "Eliminar"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#64748b" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordenadosDesc.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm" style={{ color: "#475569" }}>
                    Sin pedidos registrados.
                  </td>
                </tr>
              )}
              {ordenadosDesc.map((order: Order, index: number) => (
                <tr
                  key={order.id}
                  className={index % 2 === 0 ? "bg-transparent" : ""}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <th scope="row" className="px-4 py-3 text-center font-medium whitespace-nowrap">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
                        color: "#a855f7",
                        border: "1px solid rgba(168,85,247,0.2)",
                      }}
                    >
                      #{orders.total - (page - 1) * 30 - index}
                    </span>
                  </th>
                  <td className="px-4 py-3 capitalize font-medium text-white">{order.name}</td>
                  <td className="px-4 py-3 text-center font-semibold font-mono" style={{ color: "#10b981" }}>
                    ${order.total_price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center text-xs" style={{ color: "#64748b" }}>
                    {fmt(order.created_at)}
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

      <PaginationControls page={page} totalPages={orders.totalPages} />
    </div>
  );
};
