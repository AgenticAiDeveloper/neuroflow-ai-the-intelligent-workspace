import {
  LayoutDashboard, Bot, MessageSquare, Calendar, Bell, Search, Plus,
  CheckCircle2, Circle, TrendingUp, Users, Zap, Sparkles, ArrowUpRight,
  Folder, BarChart3, Settings, Send,
} from "lucide-react";

/* ---------- shared mini widgets ---------- */

function MiniLine() {
  // hand-tuned SVG line + area chart
  const pts = [10, 22, 18, 30, 24, 40, 36, 50, 44, 64, 58, 70, 72, 82];
  const w = 280, h = 90, max = Math.max(...pts), min = Math.min(...pts);
  const stepX = w / (pts.length - 1);
  const norm = (v: number) => h - 8 - ((v - min) / (max - min)) * (h - 20);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${norm(p)}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      <defs>
        <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 285)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 285)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lg)" />
      <path d={path} fill="none" stroke="oklch(0.78 0.16 285)" strokeWidth="2" />
    </svg>
  );
}

function MiniBars() {
  const bars = [40, 65, 30, 78, 52, 88, 60];
  return (
    <div className="flex items-end gap-2 h-24">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 rounded-md bg-gradient-to-t from-primary/30 to-accent/80" style={{ height: `${b}%` }} />
      ))}
    </div>
  );
}

function Donut() {
  const segs = [
    { v: 45, c: "oklch(0.72 0.18 285)" },
    { v: 25, c: "oklch(0.75 0.17 200)" },
    { v: 20, c: "oklch(0.78 0.17 150)" },
    { v: 10, c: "oklch(0.78 0.17 60)" },
  ];
  let acc = 0;
  const r = 32, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 90 90" className="h-24 w-24 -rotate-90">
      <circle cx="45" cy="45" r={r} fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="10" />
      {segs.map((s, i) => {
        const dash = (s.v / 100) * c;
        const el = (
          <circle key={i} cx="45" cy="45" r={r} fill="none" stroke={s.c}
                  strokeWidth="10" strokeDasharray={`${dash} ${c - dash}`}
                  strokeDashoffset={-acc} strokeLinecap="round" />
        );
        acc += dash;
        return el;
      })}
    </svg>
  );
}

/* ---------- main dashboard mockup ---------- */

export function DashboardMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`glass-strong glow-ring rounded-2xl overflow-hidden ${compact ? "" : "shadow-[0_50px_120px_-30px_oklch(0.55_0.22_285/40%)]"}`}>
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-background/40">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.22_25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.17_60)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.17_150)]" />
        <div className="ml-3 text-[11px] text-muted-foreground font-mono">app.neuroflow.ai / workspace</div>
      </div>

      <div className="grid grid-cols-12">
        {/* sidebar */}
        <aside className="col-span-2 hidden md:flex flex-col gap-1 p-3 border-r border-border bg-background/30">
          {[
            { i: LayoutDashboard, l: "Overview", active: true },
            { i: Folder, l: "Projects" },
            { i: BarChart3, l: "Analytics" },
            { i: Users, l: "Team" },
            { i: Calendar, l: "Calendar" },
            { i: Bot, l: "AI" },
            { i: Settings, l: "Settings" },
          ].map((it, idx) => (
            <div key={idx} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${it.active ? "bg-primary/15 text-foreground" : "text-muted-foreground"}`}>
              <it.i className="h-3.5 w-3.5" />
              <span className="truncate">{it.l}</span>
            </div>
          ))}
        </aside>

        {/* main */}
        <div className="col-span-12 md:col-span-7 p-4 space-y-3">
          {/* topbar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 rounded-md border border-border bg-background/40 px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">Search workspace…</span>
            </div>
            <Bell className="h-4 w-4 text-muted-foreground" />
            <div className="h-6 w-6 rounded-full bg-gradient-brand" />
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "Tasks done", v: "248", d: "+12%", i: CheckCircle2 },
              { l: "Active users", v: "1.4k", d: "+8.2%", i: Users },
              { l: "AI actions", v: "92", d: "+34%", i: Zap },
            ].map((k) => (
              <div key={k.l} className="rounded-lg border border-border bg-background/40 p-2.5">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{k.l}</span>
                  <k.i className="h-3 w-3" />
                </div>
                <div className="mt-1 flex items-end justify-between">
                  <span className="font-display text-lg font-semibold">{k.v}</span>
                  <span className="text-[10px] text-[oklch(0.78_0.17_150)] flex items-center gap-0.5">
                    <TrendingUp className="h-2.5 w-2.5" /> {k.d}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* charts row */}
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 rounded-lg border border-border bg-background/40 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium">Workspace activity</span>
                <span className="text-[10px] text-muted-foreground">Last 14 days</span>
              </div>
              <MiniLine />
            </div>
            <div className="col-span-2 rounded-lg border border-border bg-background/40 p-3">
              <div className="text-[11px] font-medium mb-1">Time by team</div>
              <div className="flex items-center gap-3">
                <Donut />
                <ul className="text-[10px] space-y-1 text-muted-foreground">
                  <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[oklch(0.72_0.18_285)]"/>Product 45%</li>
                  <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[oklch(0.75_0.17_200)]"/>Design 25%</li>
                  <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[oklch(0.78_0.17_150)]"/>Eng 20%</li>
                  <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[oklch(0.78_0.17_60)]"/>Ops 10%</li>
                </ul>
              </div>
            </div>
          </div>

          {/* tasks + bars */}
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 rounded-lg border border-border bg-background/40 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium">Today's tasks</span>
                <Plus className="h-3 w-3 text-muted-foreground" />
              </div>
              <ul className="space-y-1.5">
                {[
                  { t: "Review Q3 launch brief", d: true },
                  { t: "Sync with growth team", d: false },
                  { t: "AI: summarize standup", d: true },
                  { t: "Ship onboarding flow v2", d: false },
                ].map((t) => (
                  <li key={t.t} className="flex items-center gap-2 text-[11px]">
                    {t.d ? <CheckCircle2 className="h-3.5 w-3.5 text-[oklch(0.78_0.17_150)]" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground" />}
                    <span className={t.d ? "line-through text-muted-foreground" : ""}>{t.t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 rounded-lg border border-border bg-background/40 p-3">
              <div className="text-[11px] font-medium mb-2">Throughput</div>
              <MiniBars />
            </div>
          </div>
        </div>

        {/* AI panel */}
        <aside className="col-span-12 md:col-span-3 p-3 border-l border-border bg-background/30 space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-brand">
              <Sparkles className="h-3 w-3 text-primary-foreground" />
            </span>
            NeuroFlow Assistant
          </div>

          <div className="space-y-1.5">
            <div className="rounded-lg rounded-tl-sm bg-background/50 border border-border p-2 text-[10.5px]">
              Summarize this week's standups
            </div>
            <div className="rounded-lg rounded-tr-sm bg-gradient-soft border border-primary/20 p-2 text-[10.5px]">
              Done. Top themes: <b>onboarding polish</b>, <b>billing bug</b>, <b>API rate limits</b>. 3 blockers, 2 wins.
            </div>
            <div className="rounded-lg rounded-tr-sm bg-gradient-soft border border-primary/20 p-2 text-[10.5px] flex items-start gap-1.5">
              <ArrowUpRight className="h-3 w-3 mt-0.5 text-accent" />
              I drafted a Loom-style update for the team.
            </div>
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            {["Plan my day", "Draft email", "Find risks"].map((p) => (
              <span key={p} className="text-[10px] px-2 py-1 rounded-full border border-border text-muted-foreground">{p}</span>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background/40 px-2 py-1.5">
            <MessageSquare className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10.5px] text-muted-foreground flex-1">Ask anything…</span>
            <Send className="h-3 w-3 text-primary" />
          </div>
        </aside>
      </div>
    </div>
  );
}
