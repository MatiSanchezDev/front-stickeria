"use client";

import { useState, useMemo } from "react";
import { OrderArray } from "@/interface/order.interface";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  AreaChart, Area, LineChart, Line,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingBag, Award, AlertCircle, Truck } from "lucide-react";

const MESES_CORTOS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const MESES_LARGOS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const TOOLTIP_STYLE = {
  backgroundColor: "#0f0f1e",
  border: "1px solid rgba(168,85,247,0.3)",
  borderRadius: "12px",
  color: "#f1f5f9",
};

interface Props { pedidos: OrderArray }

export default function IngresosChart({ pedidos }: Props) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState("");

  const inputStyle: React.CSSProperties = {
    backgroundColor: "#0f0f1e",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#f1f5f9",
    outline: "none",
  };

  // ── Años disponibles ──────────────────────────────────────────────────────
  const years = useMemo(() => {
    const set = new Set(pedidos.map((o) => new Date(o.created_at).getFullYear().toString()));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [pedidos]);

  // ── Filtrados ─────────────────────────────────────────────────────────────
  const filteredByYear = useMemo(() =>
    pedidos.filter((o) => new Date(o.created_at).getFullYear().toString() === selectedYear),
    [pedidos, selectedYear]
  );

  const filtered = useMemo(() => {
    if (!selectedMonth) return filteredByYear;
    return filteredByYear.filter(
      (o) => String(new Date(o.created_at).getMonth() + 1).padStart(2, "0") === selectedMonth
    );
  }, [filteredByYear, selectedMonth]);

  // ── Datos del gráfico de barras (por mes del año seleccionado) ────────────
  const chartData = useMemo(() => {
    const resumen: Record<string, number> = {};
    filteredByYear.forEach((o) => {
      const m = String(new Date(o.created_at).getMonth() + 1).padStart(2, "0");
      resumen[m] = (resumen[m] || 0) + o.total_price;
    });
    return Object.entries(resumen)
      .map(([mesNum, total]) => ({ mes: MESES_CORTOS[Number(mesNum) - 1], mesNum, total }))
      .sort((a, b) => a.mesNum.localeCompare(b.mesNum));
  }, [filteredByYear]);

  // ── Acumulado del año (área) ───────────────────────────────────────────────
  const cumulativeData = useMemo(() => {
    let running = 0;
    return chartData.map((d) => {
      running += d.total;
      return { mes: d.mes, acumulado: running };
    });
  }, [chartData]);

  // ── Ticket promedio por mes (línea) ───────────────────────────────────────
  const ticketData = useMemo(() =>
    chartData.map((d) => {
      const pedidosMes = filteredByYear.filter(
        (o) => String(new Date(o.created_at).getMonth() + 1).padStart(2, "0") === d.mesNum
      );
      return { mes: d.mes, promedio: pedidosMes.length > 0 ? Math.round(d.total / pedidosMes.length) : 0 };
    }),
    [chartData, filteredByYear]
  );

  // ── Top 5 clientes (histórico global) ────────────────────────────────────
  const topClientes = useMemo(() => {
    const map: Record<string, { total: number; count: number }> = {};
    pedidos.forEach((o) => {
      const key = o.name.trim().toLowerCase();
      if (!map[key]) map[key] = { total: 0, count: 0 };
      map[key].total += o.total_price;
      map[key].count += 1;
    });
    return Object.entries(map)
      .map(([name, d]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), ...d }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [pedidos]);

  // ── Stats principales ─────────────────────────────────────────────────────
  const totalFiltered = filtered.reduce((a, o) => a + o.total_price, 0);
  const totalGeneral = pedidos.reduce((a, o) => a + o.total_price, 0);
  const countFiltered = filtered.length;
  const avgPerOrder = countFiltered > 0 ? totalFiltered / countFiltered : 0;
  const bestMonth = chartData.length > 0
    ? chartData.reduce((best, cur) => (cur.total > best.total ? cur : best))
    : null;

  // ── Operacionales (siempre sobre todos los pedidos) ───────────────────────
  const porCobrar = pedidos.filter((o) => !o.prepaid).reduce((a, o) => a + o.total_price, 0);
  const sinEntregar = pedidos.filter((o) => !o.delivered).length;

  // ── Comparativa período anterior ──────────────────────────────────────────
  const prevTotal = useMemo(() => {
    if (selectedMonth) {
      const m = Number(selectedMonth);
      const prevM = m === 1 ? 12 : m - 1;
      const prevY = m === 1 ? String(Number(selectedYear) - 1) : selectedYear;
      return pedidos
        .filter((o) => {
          const d = new Date(o.created_at);
          return d.getFullYear().toString() === prevY &&
            String(d.getMonth() + 1).padStart(2, "0") === String(prevM).padStart(2, "0");
        })
        .reduce((a, o) => a + o.total_price, 0);
    }
    const prevY = String(Number(selectedYear) - 1);
    return pedidos
      .filter((o) => new Date(o.created_at).getFullYear().toString() === prevY)
      .reduce((a, o) => a + o.total_price, 0);
  }, [pedidos, selectedYear, selectedMonth]);

  const diffPercent = prevTotal > 0 ? ((totalFiltered - prevTotal) / prevTotal) * 100 : null;

  const periodLabel = selectedMonth
    ? `${MESES_LARGOS[Number(selectedMonth) - 1]} ${selectedYear}`
    : `Año ${selectedYear}`;

  const prevPeriodLabel = selectedMonth
    ? (() => {
        const m = Number(selectedMonth);
        return `${MESES_LARGOS[(m === 1 ? 12 : m - 1) - 1]} ${m === 1 ? Number(selectedYear) - 1 : selectedYear}`;
      })()
    : `Año ${Number(selectedYear) - 1}`;

  return (
    <div className="flex flex-col gap-6">

      {/* Título */}
      <div className="text-center">
        <h1
          className="text-4xl md:text-5xl font-alfa cursor-default"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          Ingresos
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>Resumen financiero de tus pedidos</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center p-4 rounded-2xl" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}>
        <span className="text-sm font-medium" style={{ color: "#64748b" }}>Filtrar por:</span>
        <select value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setSelectedMonth(""); }} className="px-4 py-2 rounded-xl text-sm cursor-pointer" style={inputStyle}>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-4 py-2 rounded-xl text-sm cursor-pointer" style={inputStyle}>
          <option value="">Todos los meses</option>
          {MESES_LARGOS.map((m, i) => <option key={i} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
        </select>
        {selectedMonth && (
          <button onClick={() => setSelectedMonth("")} className="px-3 py-2 rounded-xl text-xs cursor-pointer" style={{ color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}>
            Limpiar
          </button>
        )}
      </div>

      {/* Stat cards — período */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <DollarSign size={20} />, label: `Total — ${periodLabel}`, value: `$${totalFiltered.toLocaleString()}`, accent: "#a855f7", diff: diffPercent, sub: diffPercent !== null ? `vs ${prevPeriodLabel}` : null },
          { icon: <TrendingUp size={20} />, label: "Total histórico", value: `$${totalGeneral.toLocaleString()}`, accent: "#10b981", diff: null, sub: null },
          { icon: <ShoppingBag size={20} />, label: `Pedidos — ${periodLabel}`, value: countFiltered.toString(), accent: "#ec4899", diff: null, sub: null },
          { icon: <Award size={20} />, label: "Promedio por pedido", value: `$${Math.round(avgPerOrder).toLocaleString()}`, accent: "#f59e0b", diff: null, sub: null },
        ].map(({ icon, label, value, accent, diff, sub }) => (
          <div key={label} className="rounded-2xl p-5 flex flex-col gap-3" style={{ backgroundColor: "#1a1a2e", border: `1px solid ${accent}33` }}>
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: accent + "22", color: accent }}>{icon}</div>
              {diff !== null && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: diff >= 0 ? "rgba(16,185,129,0.15)" : "rgba(248,113,113,0.15)", color: diff >= 0 ? "#10b981" : "#f87171", border: `1px solid ${diff >= 0 ? "rgba(16,185,129,0.25)" : "rgba(248,113,113,0.25)"}` }}>
                  {diff >= 0 ? "▲" : "▼"} {Math.abs(diff).toFixed(1)}%
                </span>
              )}
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: "#64748b" }}>{label}</p>
              <p className="text-2xl font-bold font-mono" style={{ color: accent }}>{value}</p>
              {sub && <p className="text-xs mt-1" style={{ color: "#475569" }}>{sub}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Stat cards — operacionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(248,113,113,0.2)" }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(248,113,113,0.12)", color: "#f87171" }}>
            <AlertCircle size={22} />
          </div>
          <div className="flex-1">
            <p className="text-xs mb-0.5" style={{ color: "#64748b" }}>Monto por cobrar (prepago pendiente)</p>
            <p className="text-2xl font-bold font-mono" style={{ color: "#f87171" }}>${porCobrar.toLocaleString()}</p>
            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{pedidos.filter(o => !o.prepaid).length} pedidos sin pagar</p>
          </div>
        </div>
        <div className="rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(245,158,11,0.2)" }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>
            <Truck size={22} />
          </div>
          <div className="flex-1">
            <p className="text-xs mb-0.5" style={{ color: "#64748b" }}>Pedidos sin entregar</p>
            <p className="text-2xl font-bold font-mono" style={{ color: "#f59e0b" }}>{sinEntregar}</p>
            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>pendientes de entrega</p>
          </div>
        </div>
      </div>

      {/* Gráficos — fila 1: barras + acumulado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Bar chart */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Ingresos por mes — {selectedYear}</h2>
            {bestMonth && !selectedMonth && (
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}>
                Mejor: {bestMonth.mes}
              </span>
            )}
          </div>
          {chartData.length === 0
            ? <div className="h-52 flex items-center justify-center text-sm" style={{ color: "#475569" }}>Sin datos</div>
            : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="mes" stroke="#475569" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} width={40} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, "Ingresos"]} />
                  <Bar dataKey="total" fill="url(#barGrad)" radius={[5, 5, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )
          }
        </div>

        {/* Area chart — acumulado */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}>
          <h2 className="text-sm font-semibold text-white mb-4">Acumulado del año — {selectedYear}</h2>
          {cumulativeData.length === 0
            ? <div className="h-52 flex items-center justify-center text-sm" style={{ color: "#475569" }}>Sin datos</div>
            : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={cumulativeData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="mes" stroke="#475569" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} width={40} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, "Acumulado"]} />
                  <Area type="monotone" dataKey="acumulado" stroke="#a855f7" strokeWidth={2} fill="url(#areaGrad)" dot={{ fill: "#a855f7", r: 3 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            )
          }
        </div>
      </div>

      {/* Gráficos — fila 2: ticket promedio + top clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Line chart — ticket promedio */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}>
          <h2 className="text-sm font-semibold text-white mb-4">Ticket promedio por mes — {selectedYear}</h2>
          {ticketData.length === 0
            ? <div className="h-52 flex items-center justify-center text-sm" style={{ color: "#475569" }}>Sin datos</div>
            : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={ticketData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="mes" stroke="#475569" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v.toLocaleString()}`} width={50} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, "Promedio"]} />
                  <Line type="monotone" dataKey="promedio" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            )
          }
        </div>

        {/* Top 5 clientes */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}>
          <h2 className="text-sm font-semibold text-white mb-5">Top 5 clientes — histórico</h2>
          {topClientes.length === 0
            ? <div className="h-52 flex items-center justify-center text-sm" style={{ color: "#475569" }}>Sin datos</div>
            : (
              <div className="flex flex-col gap-4">
                {topClientes.map((c, i) => {
                  const pct = (c.total / topClientes[0].total) * 100;
                  const ACCENTS = ["#a855f7","#ec4899","#06b6d4","#10b981","#f59e0b"];
                  const accent = ACCENTS[i];
                  return (
                    <div key={c.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: accent + "22", color: accent }}>
                            {i + 1}
                          </span>
                          <span className="font-medium text-white capitalize">{c.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-semibold" style={{ color: "#10b981" }}>${c.total.toLocaleString()}</span>
                          <span className="text-xs ml-2" style={{ color: "#475569" }}>{c.count} pedidos</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: accent }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>
      </div>

      {/* Tabla mensual */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <h2 className="text-base font-semibold text-white">Desglose mensual — {selectedYear}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Mes", "Ingresos", "Pedidos", "Promedio por pedido"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chartData.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-sm" style={{ color: "#475569" }}>Sin datos para {selectedYear}</td></tr>
              ) : (
                [...chartData].sort((a, b) => b.total - a.total).map((row, i) => {
                  const pedidosMes = filteredByYear.filter(
                    (o) => String(new Date(o.created_at).getMonth() + 1).padStart(2, "0") === row.mesNum
                  );
                  const avg = pedidosMes.length > 0 ? row.total / pedidosMes.length : 0;
                  return (
                    <tr key={row.mesNum} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td className="px-5 py-3 font-medium text-white">
                        <div className="flex items-center gap-2">
                          {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}>#1</span>}
                          {MESES_LARGOS[Number(row.mesNum) - 1]}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-bold font-mono" style={{ color: "#10b981" }}>${row.total.toLocaleString()}</td>
                      <td className="px-5 py-3 font-medium" style={{ color: "#94a3b8" }}>{pedidosMes.length}</td>
                      <td className="px-5 py-3 font-mono text-xs" style={{ color: "#64748b" }}>${Math.round(avg).toLocaleString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
