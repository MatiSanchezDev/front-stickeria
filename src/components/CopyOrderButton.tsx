"use client";
import { copyOrderToClipboardCreated } from "@/helpers/saveClipboard";
import { ClipboardCopy } from "lucide-react";

interface Props { message: string }

export const CopyOrderButton = ({ message }: Props) => {
  return (
    <td className="px-4 py-3 text-center">
      <button
        onClick={() => copyOrderToClipboardCreated(message)}
        title="Copiar mensaje para el cliente"
        className="p-1.5 rounded-lg cursor-pointer transition-colors"
        style={{ color: "#64748b" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#a855f7")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        <ClipboardCopy size={15} />
      </button>
    </td>
  );
};
