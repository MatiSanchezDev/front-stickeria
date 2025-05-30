import { useOrderStore } from "@/store/slices/orderSlice";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export const OrderItems = () => {
  const { items, updateQuantity, removeFromOrder } = useOrderStore();
  console.log(items);

  const handleAddQuantity = (id: number | string, quantity: number) => {
    const newQuantity = quantity + 1;
    updateQuantity(id, newQuantity);
    console.log("nueva cantidad: ", newQuantity);
  };

  const handleDelQuantity = (id: number | string, quantity: number) => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    updateQuantity(id, newQuantity);
    console.log("nueva cantidad: ", newQuantity);
  };

  const handleDelOrder = (id: string | number) => {
    removeFromOrder(id);
    toast("🌟 Sticker eliminado.");
  };

  return (
    <>
      <div className="px-6 w-full border border-white/10 rounded-2xl pt-3 pb-5">
        <h2 className="text-center mb-2 text-md font-bold text-white font-mono tracking-widest">
          🌟 Stickers del pedido 🌟
        </h2>
        {items.map((orden) => (
          <div
            key={orden.id}
            className="rounded-lg border p-5 shadow-sm border-gray-700 bg-gray-800 w-full mb-2"
          >
            <div className="md:flex items-center justify-between gap-6 ">
              <button
                onClick={() => handleDelOrder(orden.id)}
                className="p-2 hover:bg-red-500 rounded-full cursor-pointer"
              >
                <Trash2 size={15} />
              </button>
              <div className="flex items-center justify-end order-3 m-0">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleDelQuantity(orden.id, orden.quantity)}
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 cursor-pointer"
                  >
                    <svg
                      className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <span className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium focus:outline-none focus:ring-0 text-white">
                    {orden.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddQuantity(orden.id, orden.quantity)}
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border focus:outline-none focus:ring-2 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 cursor-pointer"
                  >
                    <svg
                      className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-xl font-mono text-white underline underline-offset-4">
                    $ {orden.price * orden.quantity}
                  </p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md cursor-default">
                <span className="text-xl font-mono underline underline-offset-4 text-white capitalize">
                  {orden.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
