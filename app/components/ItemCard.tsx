"use client";

import { useState } from "react";

interface Item {
  id: string;
  name: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  category: string;
  targetPrice: number | null;
  currentPrice: number | null;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  WATCHING: "text-cyan border-cyan/30",
  ALERT: "text-warning border-warning/30",
  PURCHASED: "text-success border-success/30",
  SOLD: "text-purple border-purple/30",
  ARCHIVED: "text-muted border-muted/30",
};

const STATUS_OPTIONS = ["WATCHING", "ALERT", "PURCHASED", "SOLD", "ARCHIVED"];

export default function ItemCard({
  item,
  onUpdate,
}: {
  item: Item;
  onUpdate: () => void;
}) {
  const [updating, setUpdating] = useState(false);

  const priceHit =
    item.targetPrice != null &&
    item.currentPrice != null &&
    item.currentPrice <= item.targetPrice;

  async function updateStatus(status: string) {
    setUpdating(true);
    await fetch(`/api/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(false);
    onUpdate();
  }

  async function deleteItem() {
    setUpdating(true);
    await fetch(`/api/items/${item.id}`, { method: "DELETE" });
    setUpdating(false);
    onUpdate();
  }

  return (
    <div
      className={`rounded border bg-bg p-3 space-y-2 animate-feed-in ${STATUS_STYLES[item.status] ?? "border-border"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-bold text-text">
              {item.name}
            </h3>
            {priceHit && (
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-success bg-success/10 px-1.5 py-0.5 rounded">
                Target Hit
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
            {item.source && <span>{item.source}</span>}
            {item.category !== "Other" && (
              <span className="border-l border-border pl-2">
                {item.category}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={deleteItem}
          disabled={updating}
          className="shrink-0 text-xs text-muted hover:text-error transition-colors disabled:opacity-50"
          title="Remove item"
        >
          &times;
        </button>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-3">
          {item.currentPrice != null && (
            <span className="text-lg font-bold text-text">
              ${item.currentPrice.toFixed(2)}
            </span>
          )}
          {item.targetPrice != null && (
            <span className="text-xs text-muted">
              target ${item.targetPrice.toFixed(2)}
            </span>
          )}
        </div>

        <select
          value={item.status}
          onChange={(e) => updateStatus(e.target.value)}
          disabled={updating}
          className="rounded border border-border bg-panel px-2 py-1 text-[11px] text-text outline-none focus:border-cyan disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {item.notes && (
        <p className="text-[11px] text-muted leading-relaxed">{item.notes}</p>
      )}

      {item.sourceUrl && (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[11px] text-cyan hover:underline"
        >
          View listing &rarr;
        </a>
      )}
    </div>
  );
}
