"use client";

import { useState } from "react";

const CATEGORIES = [
  "Sneakers",
  "Vinyl",
  "Trading Cards",
  "Figures",
  "Electronics",
  "Clothing",
  "Art",
  "Other",
];

export default function AddItemForm({
  onItemAdded,
}: {
  onItemAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      source: form.get("source"),
      sourceUrl: form.get("sourceUrl"),
      imageUrl: form.get("imageUrl"),
      category: form.get("category"),
      targetPrice: form.get("targetPrice")
        ? parseFloat(form.get("targetPrice") as string)
        : null,
      currentPrice: form.get("currentPrice")
        ? parseFloat(form.get("currentPrice") as string)
        : null,
      notes: form.get("notes"),
    };

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (res.ok) {
      setOpen(false);
      onItemAdded();
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-bold uppercase tracking-widest text-panel bg-cyan px-3 py-1.5 rounded hover:bg-cyan/80 transition-colors"
      >
        + Add Item
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg border border-border bg-panel p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-cyan">
            Add New Item
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-muted hover:text-text text-lg leading-none"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs text-muted mb-1">Name *</label>
            <input
              name="name"
              required
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan"
            />
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">Source</label>
            <input
              name="source"
              placeholder="e.g. eBay, StockX"
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan"
            />
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">Category</label>
            <select
              name="category"
              defaultValue="Other"
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">
              Current Price
            </label>
            <input
              name="currentPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan"
            />
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">
              Target Price
            </label>
            <input
              name="targetPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs text-muted mb-1">Source URL</label>
            <input
              name="sourceUrl"
              type="url"
              placeholder="https://..."
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs text-muted mb-1">Image URL</label>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://..."
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs text-muted mb-1">Notes</label>
            <textarea
              name="notes"
              rows={2}
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-cyan resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-xs text-muted hover:text-text transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-panel bg-cyan rounded hover:bg-cyan/80 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
