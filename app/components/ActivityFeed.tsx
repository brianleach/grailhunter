"use client";

interface ActivityEntry {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  item: { id: string; name: string; status: string } | null;
}

const TYPE_COLORS: Record<string, string> = {
  ITEM_ADDED: "text-success",
  ITEM_REMOVED: "text-error",
  PRICE_CHANGE: "text-warning",
  STATUS_CHANGE: "text-purple",
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000,
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ActivityFeed({
  activities,
}: {
  activities: ActivityEntry[];
}) {
  if (activities.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-xs text-muted">
        No activity yet. Add an item to get started.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-1.5">
      {activities.map((a) => (
        <div key={a.id} className="animate-feed-in flex gap-2 text-[11px]">
          <span className="shrink-0 text-muted">{timeAgo(a.createdAt)}</span>
          <span className={TYPE_COLORS[a.type] ?? "text-text"}>
            {a.message}
          </span>
        </div>
      ))}
    </div>
  );
}
