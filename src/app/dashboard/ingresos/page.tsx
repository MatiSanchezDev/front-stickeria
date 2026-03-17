import IngresosChart from "@/components/IngresosChart";
import { getOrdersServices } from "@/lib/services/orderService";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function IngresosPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenAccess")?.value.toString() || "";
  const orders = await getOrdersServices(1, 9999, token);

  return (
    <section className="p-3 md:p-6 w-full">
      <IngresosChart pedidos={orders.data} />
    </section>
  );
}
