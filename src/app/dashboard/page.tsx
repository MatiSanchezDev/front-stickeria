import { CreateSticker } from "@/components/CreateSticker";
import { OrderListComponent } from "@/components/OrderListComponent";
import { SectionCardSticker } from "@/components/SectionCardSticker";
import { SectionOrderSticker } from "@/components/SectionOrderSticker";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard - Stickeria",
  description: "Dashboard - Stickeria",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <section className="p-3 md:p-6 w-full h-auto">
      {/* Hero */}
      <div className="relative w-full flex flex-col items-center py-10 mb-2 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 100%)",
          }}
        />
        <span className="text-7xl cursor-default mb-4 relative">🦄</span>
        <h1
          className="relative text-4xl md:text-6xl font-bold font-alfa cursor-default text-center"
          style={{
            background: "linear-gradient(135deg, #a855f7 0%, #ec4899 55%, #f8fafc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Stickeria App
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#64748b" }}>
          — control panel —
        </p>
      </div>

      <CreateSticker />

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 mt-2">
        <div className="flex flex-col">
          <hr className="block md:hidden mb-4" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
          <h2
            className="font-alfa text-2xl text-center mb-4"
            style={{
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🎨 Stickers
          </h2>
          <SectionCardSticker />
        </div>

        <div className="flex flex-col">
          <hr className="block md:hidden my-4" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
          <h2
            className="font-alfa text-2xl text-center mb-4 mt-4 md:mt-0"
            style={{
              background: "linear-gradient(135deg, #ec4899, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            📦 Nuevo Pedido
          </h2>
          <SectionOrderSticker />
        </div>
      </div>

      {/* Divider */}
      <div className="px-4 md:px-20 mt-8">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(236,72,153,0.4), transparent)",
          }}
        />
      </div>

      <div id="pedidos" className="mt-8">
        <OrderListComponent page={page} />
      </div>
    </section>
  );
}
