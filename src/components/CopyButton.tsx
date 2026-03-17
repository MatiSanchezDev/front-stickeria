"use client";
import { CheckCheck, ClipboardCopy } from "lucide-react";
import { useState } from "react";

const text = `Hola cómo estás?🤗 ya esta listo tu pedido, cuando puedas podes pasar a retirarlo por Castelli 637 entre Belgrano y gobernador Gómez (casa roja). Estoy de 9:00 a 12:30 o de 16:00 a 19:30 ✨`;

export const CopyButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer transition-opacity hover:opacity-80"
      style={
        copied
          ? {
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              color: "#fff",
            }
          : {
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#94a3b8",
            }
      }
    >
      {copied ? <CheckCheck size={15} /> : <ClipboardCopy size={15} />}
      {copied ? "¡Copiado!" : "Copiar agradecimiento"}
    </button>
  );
};
