export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-[1800px]">
        {/* Header placeholder */}
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
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-success">
              <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse-dot" />
              SYSTEM ONLINE
            </span>
          </div>
        </header>

        {/* Dashboard grid placeholder */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4" style={{ height: "calc(100vh - 140px)" }}>
          {["LIVE FEED", "ACTIVE TASKS", "ACCOUNTS", "COMMAND LOG", "RECENT PURCHASES", "PROXY STATUS"].map(
            (panel) => (
              <div
                key={panel}
                className="rounded-lg border border-border bg-panel p-4 flex flex-col"
              >
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan">
                  {panel}
                </h2>
                <div className="flex-1 flex items-center justify-center text-xs text-muted">
                  Awaiting data...
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
