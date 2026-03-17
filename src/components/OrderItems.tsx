import { useOrderStore } from "@/store/slices/orderSlice";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface ItemRowProps {
  orden: OrderItem;
  onDelete: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, qty: number) => void;
}

const ItemRow = ({ orden, onDelete, onUpdateQuantity }: ItemRowProps) => {
  const [inputVal, setInputVal] = useState(String(orden.quantity));
  const isInvalid = inputVal === "" || Number(inputVal) <= 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw !== "" && !/^\d+$/.test(raw)) return;
    setInputVal(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num > 0) onUpdateQuantity(orden.id, num);
  };

  const handleBlur = () => {
    const num = parseInt(inputVal, 10);
    if (isNaN(num) || num <= 0) {
      setInputVal(String(orden.quantity));
      toast.warning("La cantidad debe ser mayor a 0.");
    }
  };

  const decrement = () => {
    if (orden.quantity <= 1) return;
    const next = orden.quantity - 1;
    setInputVal(String(next));
    onUpdateQuantity(orden.id, next);
  };

  const increment = () => {
    const next = orden.quantity + 1;
    setInputVal(String(next));
    onUpdateQuantity(orden.id, next);
  };

  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3 mb-2"
      style={{
        backgroundColor: "#1a1a2e",
        border: `1px solid ${isInvalid ? "rgba(248,113,113,0.3)" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      <button
        onClick={() => onDelete(orden.id)}
        className="p-1.5 rounded-lg cursor-pointer transition-colors flex-shrink-0"
        style={{ color: "#64748b" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        <Trash2 size={13} />
      </button>

      <span className="flex-1 text-sm capitalize truncate text-white">{orden.name}</span>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={decrement}
          disabled={orden.quantity <= 1}
          className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            color: orden.quantity <= 1 ? "#334155" : "#94a3b8",
            cursor: orden.quantity <= 1 ? "not-allowed" : "pointer",
          }}
        >
          −
        </button>

        <input
          type="text"
          inputMode="numeric"
          value={inputVal}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-10 text-center text-sm font-semibold rounded-lg outline-none [appearance:textfield]"
          style={{
            backgroundColor: "#0f0f1e",
            border: `1px solid ${isInvalid ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
            color: isInvalid ? "#f87171" : "#f1f5f9",
            padding: "2px 4px",
          }}
        />

        <button
          onClick={increment}
          className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold cursor-pointer"
          style={{ backgroundColor: "rgba(168,85,247,0.15)", color: "#a855f7" }}
        >
          +
        </button>

        <span
          className="w-16 text-right text-sm font-semibold font-mono"
          style={{ color: isInvalid ? "#475569" : "#10b981" }}
        >
          {isInvalid ? "—" : `$${orden.price * orden.quantity}`}
        </span>
      </div>
    </div>
  );
};

export const OrderItems = () => {
  const { items, updateQuantity, removeFromOrder } = useOrderStore();

  const handleDelOrder = (id: string | number) => {
    removeFromOrder(id);
    toast("Sticker quitado del pedido.");
  };

  return (
    <div
      className="w-full rounded-xl p-3 mt-4"
      style={{ backgroundColor: "#0f0f1e", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <h2 className="text-center mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
        Stickers del pedido
      </h2>
      {items.map((orden) => (
        <ItemRow
          key={orden.id}
          orden={orden}
          onDelete={handleDelOrder}
          onUpdateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
};
