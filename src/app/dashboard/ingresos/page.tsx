import IngresosChart from "@/components/IngresosChart";
import { getOrdersServices } from "@/lib/services/orderService";
import { cookies } from "next/headers";

export default async function NamePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenAccess")?.value.toString() || "";
  const orders = await getOrdersServices(1, 100, token);

  return <IngresosChart pedidos={orders.data} />;
}
