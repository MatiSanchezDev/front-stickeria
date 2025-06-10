/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { OrderArray } from "@/interface/order.interface";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  pedidos: OrderArray;
}

function agruparIngresosPorMes(pedidos: OrderArray) {
  const resumen: Record<string, number> = {};

  pedidos.forEach(({ total_price, created_at }) => {
    const date = new Date(created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    resumen[key] = (resumen[key] || 0) + total_price;
  });

  return Object.entries(resumen)
    .map(([mes, total]) => ({ mes, total }))
    .sort((a, b) => a.mes.localeCompare(b.mes)); // orden ascendente
}

function totalPedidos(pedidos: OrderArray) {
  return pedidos.reduce((acum, pedido) => acum + pedido.total_price, 0);
}

function obtenerMesActualYTotal(data: { mes: string; total: number }[]) {
  const ahora = new Date();
  const mesActual = `${ahora.getFullYear()}-${String(
    ahora.getMonth() + 1
  ).padStart(2, "0")}`;
  const itemActual = data.find((d) => d.mes === mesActual);
  return {
    mes: format(ahora, "MMMM yyyy", { locale: es }),
    total: itemActual?.total || 0,
  };
}

export default function IngresosChart({ pedidos }: Props) {
  const data = agruparIngresosPorMes(pedidos);
  const actual = obtenerMesActualYTotal(data);
  const total = totalPedidos(pedidos);

  return (
    <div className="p-6 flex flex-col justify-center items-center bg-gray-900">
      <div className="w-full gap-0  md:gap-50 lg:gap-70 flex flex-col md:flex-row justify-center items-center">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-xl md:text-3xl font-mono text-white">
            Ingresos de{" "}
            {actual.mes.charAt(0).toUpperCase() + actual.mes.slice(1)}:
          </h1>
          <span className="text-4xl md:text-7xl font-alfa text-white">
            ${actual.total.toLocaleString()}
          </span>
        </div>
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-xl md:text-3xl font-mono text-white">
            Ingreso Total
          </h1>
          <span className="text-4xl md:text-7xl font-alfa text-white">
            ${total.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-2 w-full h-auto">
        {/* <div className="mt-6 w-full md:w-1/2">
          <table className="bg-gray-800 border border-gray-200 shadow-sm w-full text-white">
            <thead>
              <tr className="bg-gray-800 text-left text-sm font-semibold">
                <th className="py-3 px-4 border-b text-lg">Mes</th>
                <th className="py-3 px-4 border-b text-lg">Total Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const fecha = new Date(`${item.mes}-01`);
                const nombreMes = format(fecha, "MMMM yyyy", { locale: es });

                return (
                  <tr
                    key={item.mes}
                    className="text-sm text-white hover:bg-gray-900 cursor-pointer"
                  >
                    <td className="py-3 px-4 border-b text-lg">
                      {nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}
                    </td>
                    <td className="py-3 px-4 border-b text-lg">
                      ${item.total.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
        <div className="w-full h-96 p-4 shadow-md mt-6 bg-gray-800 border border-white">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#ccc",
                  color: "#000000",
                }}
                labelStyle={{ color: "#4a5565", fontWeight: "bold" }}
                formatter={(value: any) => `$${value.toLocaleString()}`}
              />
              <Bar
                dataKey="total"
                fill="#1c398e"
                activeBar={{ fill: "#2563eb" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
