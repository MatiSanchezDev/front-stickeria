"use client";
import { CheckCheck, ClipboardCopy } from "lucide-react";
import { useState } from "react";

const text = `*GRACIAS POR SU COMPRA*

Recordá que el pedido tiene una demora de 3 dias aprox, (puede extenderse por dias feriados o casos extraordinarios). Nos comunicaremos cuando su pedido esté listo para retirar.

*Retirar por:*
Castelli 637 - Entre Belgrano y Gobernador Gomez - Casa roja portón negro.`;

export const CopyButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // mensaje temporal
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <>
      {copied ? (
        <button
          onClick={handleCopy}
          className="from-green-500 via-green-600 to-green-700 focus:ring-green-800 shadow-green-800/80 text-white bg-gradient-to-r hover:bg-gradient-to-br focus:ring-4 focus:outline-none  shadow-lg font-medium rounded-lg text-md px-5 mt-6 py-2 text-center font-mono cursor-pointer flex items-center gap-2 mb-6"
        >
          <CheckCheck size={20} />
          ¡Copiado!
        </button>
      ) : (
        <button
          onClick={handleCopy}
          className="from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-800 shadow-blue-800/80 text-white bg-gradient-to-r hover:bg-gradient-to-br focus:ring-4 focus:outline-none  shadow-lg font-medium rounded-lg text-md px-5 mt-6 py-2 text-center font-mono cursor-pointer flex items-center gap-2 mb-6"
        >
          <ClipboardCopy size={16} />
          Copiar agradecimiento
        </button>
      )}
    </>
  );
};
