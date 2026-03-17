"use client";

import { useRouter } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

export const PaginationControls = ({ page, totalPages }: Props) => {
  const router = useRouter();

  const goTo = (newPage: number) => {
    router.push(`/dashboard?page=${newPage}`, { scroll: false });
    setTimeout(() => {
      document.getElementById("pedidos")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (totalPages <= 1) return null;

  let startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, startPage + 2);
  if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const btnBase = {
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
  };
  const btnDisabled = {
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.05)",
    color: "#334155",
    cursor: "not-allowed" as const,
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      {/* First */}
      <button
        onClick={() => goTo(1)}
        disabled={page === 1}
        title="Primera página"
        className="px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
        style={page === 1 ? btnDisabled : btnBase}
      >
        ⏮
      </button>

      {/* Prev */}
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
        style={page <= 1 ? btnDisabled : btnBase}
      >
        ← Anterior
      </button>

      {/* Page numbers */}
      {pageNumbers.map((n) => (
        <button
          key={n}
          onClick={() => goTo(n)}
          className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
          style={
            n === page
              ? {
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  color: "#fff",
                  border: "1px solid transparent",
                }
              : btnBase
          }
        >
          {n}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
        style={page >= totalPages ? btnDisabled : btnBase}
      >
        Siguiente →
      </button>

      {/* Last */}
      <button
        onClick={() => goTo(totalPages)}
        disabled={page === totalPages}
        title="Última página"
        className="px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
        style={page === totalPages ? btnDisabled : btnBase}
      >
        ⏭
      </button>
    </div>
  );
};
