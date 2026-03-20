"use client";

import { useCallback, useEffect, useState } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemCard from "./components/ItemCard";
import ActivityFeed from "./components/ActivityFeed";
import StatsPanel from "./components/StatsPanel";

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

interface ActivityEntry {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  item: { id: string; name: string; status: string } | null;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  const refresh = useCallback(async () => {
    const [itemsRes, actRes] = await Promise.all([
      fetch("/api/items"),
      fetch("/api/activity"),
    ]);
    if (itemsRes.ok) setItems(await itemsRes.json());
    if (actRes.ok) setActivities(await actRes.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredItems =
    filter === "ALL" ? items : items.filter((i) => i.status === filter);

  const categories = [...new Set(items.map((i) => i.category))].sort();

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-lg font-bold tracking-wider text-cyan">
              GRAILHUNTER <span className="text-muted">//</span>{" "}
              <span className="text-text">COLLECTOR BOT v4.2</span>
            </h1>
            <p className="mt-1 text-xs text-muted">
              Real-time collectibles monitoring dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <AddItemForm onItemAdded={refresh} />
            <span className="inline-flex items-center gap-1.5 text-xs text-success">
              <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse-dot" />
              SYSTEM ONLINE
            </span>
          </div>
        </header>

        {/* Dashboard grid */}
        <div
          className="grid grid-cols-3 gap-4"
          style={{ minHeight: "calc(100vh - 140px)" }}
        >
          {/* Left column: Items list (spans 2 cols) */}
          <div className="col-span-2 space-y-4">
            {/* Filter bar */}
            <div className="flex items-center gap-2">
              {["ALL", "WATCHING", "ALERT", "PURCHASED", "SOLD", "ARCHIVED"].map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded transition-colors ${
                      filter === s
                        ? "bg-cyan text-panel"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    {s}
                    {s !== "ALL" && (
                      <span className="ml-1 opacity-60">
                        {items.filter((i) =>
                          s === "ALL" ? true : i.status === s,
                        ).length}
                      </span>
                    )}
                  </button>
                ),
              )}
            </div>

            {/* Items grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20 text-xs text-muted">
                Loading items...
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-muted">
                  {items.length === 0
                    ? "No items yet. Click \"+ Add Item\" to start tracking."
                    : "No items match this filter."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} onUpdate={refresh} />
                ))}
              </div>
            )}
          </div>

          {/* Right column: Sidebar */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="rounded-lg border border-border bg-panel p-4">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan">
                Overview
              </h2>
              <StatsPanel items={items} />
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="rounded-lg border border-border bg-panel p-4">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan">
                  Categories
                </h2>
                <div className="space-y-1">
                  {categories.map((cat) => {
                    const count = items.filter(
                      (i) => i.category === cat,
                    ).length;
                    return (
                      <div
                        key={cat}
                        className="flex justify-between text-[11px]"
                      >
                        <span className="text-text">{cat}</span>
                        <span className="text-muted">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Activity feed */}
            <div className="rounded-lg border border-border bg-panel p-4 flex flex-col max-h-[400px]">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan">
                Activity Log
              </h2>
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
