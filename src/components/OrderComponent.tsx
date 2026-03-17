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
    items, client, discount,
    calculateTotal,
    total_price, clearTotalOrder,
  } = useOrderStore();

  const [blockButton, setBlockButton] = useState<boolean>(false);
  const token = getCookie("tokenAccess")?.toString() || "";
  const router = useRouter();

  useEffect(() => { calculateTotal(); }, [items, calculateTotal, discount]);

  const totalStickers = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmitOrder = async () => {
    setBlockButton(true);
    if (client.length < 3) {
      toast.warning("Falta nombre del cliente.");
      setBlockButton(false);
      return;
    }
    try {
      const copyMessage = await copyOrderToClipboard(client, items, total_price);
      const data: OrderInput = { name: client, total_price, prepaid: false, delivered: false, message_client: copyMessage };
      const orden = await createOrder(data, token);
      if (orden.success) {
        clearTotalOrder();
        router.refresh();
        toast.success("📝 Mensaje copiado");
        toast.success("✨ Pedido creado!");
      }
      setBlockButton(false);
    } catch (error) {
      toast.error("Token expirado. Debe logearse de nuevo.");
      console.log(error);
    }
  };

  const handleDeleteTotalOrder = () => {
    Swal.fire({
      title: "¿Cancelar el pedido?",
      text: "Se eliminarán todos los stickers y el descuento.",
      icon: "warning",
      theme: "dark",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      cancelButtonColor: "#374151",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "Volver",
    }).then((result) => {
      if (result.isConfirmed) {
        clearTotalOrder();
        toast("Pedido cancelado.");
      }
    });
  };

  const inputStyle = {
    backgroundColor: "#0f0f1e",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9",
    outline: "none",
  };
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)");
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");

  return (
    <div
      className="w-full rounded-2xl p-5"
      style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Cancel */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDeleteTotalOrder}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
          style={{ color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.borderColor = "rgba(248,113,113,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <Trash2 size={14} />
          Cancelar Pedido
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: "#94a3b8" }}>
            🌟 Nombre del Cliente
          </label>
          <input
            onChange={(e) => useOrderStore.getState().addClient(e.target.value.trim())}
            type="text"
            placeholder="Ingresá el nombre"
            className="w-full px-4 py-2.5 rounded-xl text-sm transition-all"
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: "#94a3b8" }}>
            🌟 Agregar descuento %
          </label>
          <input
            onChange={(e) => useOrderStore.getState().addDiscount(Number(e.target.value.trim()))}
            type="number"
            placeholder="Descuento %"
            className="w-full px-4 py-2.5 rounded-xl text-sm transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={inputBlur}
          />
        </div>
      </div>

      <OrderItems />

      {/* Summary */}
      <div
        className="rounded-xl p-4 mt-4 flex flex-col gap-2"
        style={{ backgroundColor: "#0f0f1e", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h3 className="text-center text-sm font-semibold text-white mb-1">Resumen del Pedido</h3>
        {[
          { label: "Cliente", value: client || "—", accent: "#f1f5f9" },
          { label: "Stickers", value: `${totalStickers} uni.`, accent: "#a855f7" },
          { label: "Descuento", value: `${discount}%`, accent: "#ec4899" },
          { label: "Total", value: `$${total_price.toFixed(2)}`, accent: "#10b981" },
        ].map(({ label, value, accent }) => (
          <div key={label} className="flex justify-between text-sm">
            <span style={{ color: "#64748b" }}>{label}</span>
            <span className="font-semibold capitalize" style={{ color: accent }}>{value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmitOrder}
        disabled={blockButton}
        className="w-full mt-4 py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity"
        style={{
          background: blockButton
            ? "rgba(168,85,247,0.4)"
            : "linear-gradient(135deg, #a855f7, #ec4899)",
          cursor: blockButton ? "not-allowed" : "pointer",
          opacity: blockButton ? 0.7 : 1,
        }}
      >
        <Package size={16} />
        {blockButton ? "Cargando pedido..." : "Crear pedido"}
      </button>
    </div>
  );
};
