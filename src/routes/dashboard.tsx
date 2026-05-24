import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Folder, BarChart3, Users, Calendar, Bot, Settings,
  Search, Bell, Plus, CheckCircle2, Circle, TrendingUp, Zap, Sparkles,
  ArrowUpRight, Send, MessageSquare, MoreHorizontal,
} from "lucide-react";
import { GlowBg } from "@/components/site/GlowBg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NeuroFlow AI" },
      { name: "description", content: "An interactive preview of the NeuroFlow AI workspace — analytics, tasks, team and your always-on AI assistant." },
      { property: "og:title", content: "Dashboard — NeuroFlow AI" },
      { property: "og:description", content: "A live, polished preview of the NeuroFlow workspace." },
    ],
  }),
  component: Dashboard,
});

const nav = [
  { i: LayoutDashboard, l: "Overview" },
  { i: Folder, l: "Projects" },
  { i: BarChart3, l: "Analytics" },
  { i: Users, l: "Team" },
  { i: Calendar, l: "Calendar" },
  { i: Bot, l: "AI Assistant" },
  { i: Settings, l: "Settings" },
];

/* ----- charts ----- */

function LineChart() {
  const series1 = [20, 28, 24, 36, 30, 44, 38, 52, 48, 60, 56, 72, 68, 84];
  const series2 = [10, 14, 18, 22, 28, 26, 34, 32, 40, 42, 50, 48, 56, 60];
  const w = 600, h = 200, max = 100;
  const stepX = w / (series1.length - 1);
  const path = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - 10 - (v / max) * (h - 30)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-56">
      <defs>
        <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 285)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 285)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1="0" x2={w} y1={h * p} y2={h * p} stroke="oklch(1 0 0 / 6%)" />
      ))}
      <path d={`${path(series1)} L ${w} ${h} L 0 ${h} Z`} fill="url(#ga)" />
      <path d={path(series1)} fill="none" stroke="oklch(0.78 0.16 285)" strokeWidth="2.5" />
      <path d={path(series2)} fill="none" stroke="oklch(0.78 0.16 200)" strokeWidth="2.5" strokeDasharray="4 4" />
    </svg>
  );
}

function Bars() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const bars = [60, 80, 45, 90, 70, 30, 55];
  return (
    <div className="grid grid-cols-7 gap-2 items-end h-40">
      {bars.map((b, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className="w-full rounded-md bg-gradient-to-t from-primary/40 to-accent/90 hover:opacity-90 transition"
            style={{ height: `${b}%` }}
          />
          <span className="text-[10px] text-muted-foreground">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Donut() {
  const segs = [
    { v: 45, c: "oklch(0.72 0.18 285)", l: "Product" },
    { v: 25, c: "oklch(0.75 0.17 200)", l: "Design" },
    { v: 20, c: "oklch(0.78 0.17 150)", l: "Engineering" },
    { v: 10, c: "oklch(0.78 0.17 60)", l: "Ops" },
  ];
  let acc = 0;
  const r = 50, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 130 130" className="h-40 w-40 -rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="14" />
        {segs.map((s, i) => {
          const dash = (s.v / 100) * c;
          const el = (
            <circle key={i} cx="65" cy="65" r={r} fill="none" stroke={s.c}
              strokeWidth="14" strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-acc} strokeLinecap="round" />
          );
          acc += dash;
          return el;
        })}
      </svg>
      <ul className="space-y-2 text-sm">
        {segs.map((s) => (
          <li key={s.l} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: s.c }} />
            <span className="text-muted-foreground">{s.l}</span>
            <span className="ml-auto font-medium">{s.v}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----- page ----- */

function Dashboard() {
  const [active, setActive] = useState("Overview");
  const [tasks, setTasks] = useState([
    { t: "Review Q3 launch brief", d: true },
    { t: "Sync with growth team",  d: false },
    { t: "AI: summarize standup",  d: true },
    { t: "Ship onboarding flow v2", d: false },
    { t: "Refine pricing page copy", d: false },
  ]);
  const [chat, setChat] = useState([
    { r: "ai" as const,   t: "Morning! I've drafted today's brief — 3 wins, 1 risk." },
    { r: "user" as const, t: "What's the risk?" },
    { r: "ai" as const,   t: "Billing API latency is up 22% since Friday. I've opened an issue and pinged Marcus." },
  ]);
  const [draft, setDraft] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function send() {
    if (!draft.trim()) return;
    const u = { r: "user" as const, t: draft.trim() };
    setChat((c) => [...c, u]);
    setDraft("");
    setTimeout(() => setChat((c) => [...c, { r: "ai", t: "On it — drafted a plan and added action items. (Demo)" }]), 500);
  }

  return (
    <div className="relative">
      <GlowBg className="opacity-50" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-12 gap-6">
          {/* sidebar */}
          <aside className="hidden lg:block col-span-2">
            <div className="glass rounded-2xl p-3 sticky top-24">
              <div className="px-2 py-1.5 mb-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Workspace</p>
                <p className="font-display font-semibold mt-0.5">Northwind</p>
              </div>
              <nav className="space-y-1">
                {nav.map((n) => (
                  <button
                    key={n.l}
                    onClick={() => setActive(n.l)}
                    className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      active === n.l
                        ? "bg-gradient-soft border border-primary/20 text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <n.i className="h-4 w-4" /> {n.l}
                  </button>
                ))}
              </nav>
              <div className="mt-4 rounded-xl bg-gradient-brand p-4 text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                <p className="mt-2 text-sm font-semibold">Upgrade to Pro</p>
                <p className="text-xs opacity-90">Unlock unlimited AI actions.</p>
                <Link to="/pricing" className="mt-3 inline-flex text-xs font-medium underline underline-offset-2">View plans</Link>
              </div>
            </div>
          </aside>

          {/* main */}
          <section className="col-span-12 lg:col-span-7 space-y-6">
            {/* topbar */}
            <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1 rounded-lg border border-border bg-background/40 px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input placeholder="Search projects, people, docs…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground" />
                <kbd className="hidden sm:inline text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
              </div>
              <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground text-sm font-semibold">M</div>
            </div>

            {/* greeting */}
            <div>
              <h1 className="font-display text-3xl font-semibold">Good morning, Maya 👋</h1>
              <p className="text-muted-foreground text-sm mt-1">Here's what NeuroFlow surfaced for you today.</p>
            </div>

            {/* KPI cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { l: "Tasks completed", v: "248", d: "+12%", i: CheckCircle2, c: "oklch(0.78 0.17 150)" },
                { l: "Active members",  v: "1,420", d: "+8.2%", i: Users, c: "oklch(0.72 0.18 285)" },
                { l: "AI actions",      v: "92", d: "+34%",  i: Zap, c: "oklch(0.78 0.17 60)" },
                { l: "Time saved (h)",  v: "14.3", d: "+18%", i: TrendingUp, c: "oklch(0.75 0.17 200)" },
              ].map((k) => (
                <div key={k.l} className="glass hover-lift rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{k.l}</span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md" style={{ background: `color-mix(in oklab, ${k.c} 18%, transparent)`, color: k.c }}>
                      <k.i className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <span className="font-display text-3xl font-semibold">{k.v}</span>
                    <span className="text-xs text-[oklch(0.78_0.17_150)] flex items-center gap-0.5">
                      <ArrowUpRight className="h-3 w-3" /> {k.d}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* charts */}
            <div className="grid lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-display font-semibold">Workspace activity</h3>
                    <p className="text-xs text-muted-foreground">Tasks shipped vs AI actions · 14 days</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_285)]" />Tasks</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_200)]" />AI</span>
                  </div>
                </div>
                <LineChart />
              </div>
              <div className="lg:col-span-2 glass rounded-2xl p-6">
                <h3 className="font-display font-semibold">Time by team</h3>
                <p className="text-xs text-muted-foreground mb-4">Last 30 days</p>
                <Donut />
              </div>
            </div>

            {/* tasks + bars */}
            <div className="grid lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3 glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">Today's tasks</h3>
                  <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Plus className="h-3.5 w-3.5" /> Add task
                  </button>
                </div>
                <ul className="space-y-2">
                  {tasks.map((t, i) => (
                    <li
                      key={t.t}
                      className="group flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5 hover:bg-background/60 transition cursor-pointer"
                      onClick={() => setTasks((arr) => arr.map((x, idx) => idx === i ? { ...x, d: !x.d } : x))}
                    >
                      {t.d
                        ? <CheckCircle2 className="h-4 w-4 text-[oklch(0.78_0.17_150)]" />
                        : <Circle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />}
                      <span className={`text-sm flex-1 ${t.d ? "line-through text-muted-foreground" : ""}`}>{t.t}</span>
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2 glass rounded-2xl p-6">
                <h3 className="font-display font-semibold">Weekly throughput</h3>
                <p className="text-xs text-muted-foreground mb-4">Tasks shipped</p>
                <Bars />
              </div>
            </div>

            {/* schedule + activity */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold">Today's schedule</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    { t: "09:30", l: "Standup", c: "oklch(0.72 0.18 285)" },
                    { t: "11:00", l: "Design review · Onboarding v2", c: "oklch(0.78 0.17 150)" },
                    { t: "14:00", l: "1:1 with Priya", c: "oklch(0.75 0.17 200)" },
                    { t: "16:30", l: "Investor sync", c: "oklch(0.78 0.17 60)" },
                  ].map((e) => (
                    <li key={e.l} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5">
                      <span className="text-xs font-mono text-muted-foreground w-12">{e.t}</span>
                      <span className="h-2 w-2 rounded-full" style={{ background: e.c }} />
                      <span className="text-sm">{e.l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-semibold">Recent activity</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    { who: "DR", n: "Daniel", a: "shipped",  o: "Billing fixes",        ago: "2m" },
                    { who: "PS", n: "Priya",  a: "commented on", o: "Onboarding v2",   ago: "12m" },
                    { who: "AI", n: "NeuroFlow", a: "summarized", o: "Standup notes",  ago: "1h", ai: true },
                    { who: "MW", n: "Marcus", a: "merged",  o: "PR #482",              ago: "2h" },
                    { who: "SL", n: "Sofia",  a: "created", o: "Campaign brief",        ago: "5h" },
                  ].map((a, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-semibold ${a.ai ? "bg-gradient-brand text-primary-foreground" : "bg-secondary text-foreground"}`}>
                        {a.who}
                      </span>
                      <p className="text-sm">
                        <span className="font-medium">{a.n}</span>{" "}
                        <span className="text-muted-foreground">{a.a}</span>{" "}
                        <span>{a.o}</span>
                      </p>
                      <span className="ml-auto text-xs text-muted-foreground">{a.ago}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* AI insights panel */}
          <aside className="col-span-12 lg:col-span-3 space-y-4">
            <div className="glass-strong glow-ring rounded-2xl p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </span>
                <h3 className="font-display font-semibold">AI Insights</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {[
                  "Onboarding completion up 18% this week",
                  "3 risks flagged for the EU launch",
                  "Marcus has 2 PRs awaiting review",
                  "Suggested: postpone Friday sync",
                ].map((s) => (
                  <li key={s} className="rounded-lg border border-border bg-background/40 p-3 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="font-display font-semibold">Team online</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["MA","DR","PS","MW","SL","AK","JT"].map((i) => (
                  <li key={i} className="relative h-9 w-9 rounded-full bg-gradient-brand text-primary-foreground text-xs font-semibold flex items-center justify-center">
                    {i}
                    <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.17_150)] ring-2 ring-background" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-5 flex flex-col">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" /> Assistant
              </h3>
              <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
                {chat.map((m, i) => (
                  <div key={i} className={`max-w-[90%] text-sm rounded-2xl px-3 py-2 ${
                    m.r === "ai"
                      ? "bg-gradient-soft border border-primary/20 mr-auto rounded-tl-sm"
                      : "bg-background/60 border border-border ml-auto rounded-tr-sm"
                  }`}>{m.t}</div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Plan my day","Find blockers","Draft email"].map((s) => (
                  <button key={s} onClick={() => setDraft(s)} className="text-[11px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
                    {s}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-background/40 px-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask anything…" className="bg-transparent outline-none text-sm py-2 flex-1 placeholder:text-muted-foreground" />
                <button type="submit" className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-brand text-primary-foreground">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// suppress unused warning during build
export const _p = (s: string) => s;
void _p(useRouterState as unknown as string);
