"use client";

interface Item {
  status: string;
  currentPrice: number | null;
  targetPrice: number | null;
}

export default function StatsPanel({ items }: { items: Item[] }) {
  const watching = items.filter((i) => i.status === "WATCHING").length;
  const alerts = items.filter((i) => i.status === "ALERT").length;
  const purchased = items.filter((i) => i.status === "PURCHASED").length;
  const targetHits = items.filter(
    (i) =>
      i.targetPrice != null &&
      i.currentPrice != null &&
      i.currentPrice <= i.targetPrice,
  ).length;

  const stats = [
    { label: "WATCHING", value: watching, color: "text-cyan" },
    { label: "ALERTS", value: alerts, color: "text-warning" },
    { label: "PURCHASED", value: purchased, color: "text-success" },
    { label: "TARGETS HIT", value: targetHits, color: "text-purple" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded border border-border bg-bg p-3">
          <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-muted">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
