import IngresosChart from "@/components/IngresosChart";
import { getOrders } from "@/lib/api/order";
import { cookies } from "next/headers";

export default async function NamePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenAccess")?.value.toString() || "";
  const orders = await getOrders(token);

  return <IngresosChart pedidos={orders.data} />;
}
