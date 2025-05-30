"use client";
import { copyOrderToClipboardCreated } from "@/helpers/saveClipboard";
import { ClipboardCopy } from "lucide-react";

interface Props {
  message: string;
}

export const CopyOrderButton = ({ message }: Props) => {
  const copyMessage = async () => {
    const copyOrder = await copyOrderToClipboardCreated(message);
    return copyOrder;
  };
  return (
    <td className="px-6 py-4 capitalize">
      <div
        onClick={() => copyMessage()}
        title="Copiar texto para enviar"
        className="flex justify-center items-center cursor-pointer hover:text-green-400"
      >
        <ClipboardCopy />
      </div>
    </td>
  );
};
