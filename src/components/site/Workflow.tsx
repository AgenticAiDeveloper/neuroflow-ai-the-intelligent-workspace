import { Zap, Brain, Users, MinusCircle, TrendingUp } from "lucide-react";

const items = [
  { i: Zap,         t: "Faster execution",        d: "Ship work in hours, not weeks. NeuroFlow drafts, routes and closes loops automatically." },
  { i: Brain,       t: "Better decisions",        d: "Live insights with reasoning — so you know what to do, not just what changed." },
  { i: Users,       t: "Unified collaboration",   d: "One shared context for every team. No more pinging across five tools." },
  { i: MinusCircle, t: "Less manual work",        d: "AI agents handle the 40% of work nobody enjoys — quietly, in the background." },
  { i: TrendingUp,  t: "AI-driven productivity",  d: "Daily focus, smart nudges and momentum that compounds." },
];

export function Workflow() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-primary">Productivity</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            The calmest way to <span className="text-gradient">ship faster.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            NeuroFlow doesn't just dashboard your work — it helps you do it. The result is a quieter inbox, sharper focus and a team that hits its numbers.
          </p>
          <ul className="mt-8 space-y-4">
            {items.map((it) => (
              <li key={it.t} className="flex gap-4 glass rounded-xl p-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-soft border border-primary/20 text-primary">
                  <it.i className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-sm">{it.t}</h3>
                  <p className="text-sm text-muted-foreground">{it.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-strong rounded-2xl p-6 space-y-4 relative">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-semibold">Weekly AI brief</h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary">Auto</span>
          </div>

          {[
            { l: "Onboarding flow v2 ready for review", c: "oklch(0.78 0.17 150)" },
            { l: "Billing API errors trending down 42%",  c: "oklch(0.72 0.18 285)" },
            { l: "3 risks flagged for the EU launch",     c: "oklch(0.78 0.17 60)" },
            { l: "AI drafted Q4 OKRs from your notes",    c: "oklch(0.75 0.17 200)" },
          ].map((r) => (
            <div key={r.l} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5">
              <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ background: r.c }} />
              <span className="text-sm">{r.l}</span>
            </div>
          ))}

          <div className="rounded-xl bg-gradient-soft border border-primary/20 p-4">
            <p className="text-xs text-muted-foreground">Time saved this week</p>
            <p className="font-display text-3xl font-semibold mt-1">14h 22m</p>
            <p className="text-xs text-primary mt-1">+38% vs last week</p>
          </div>
        </div>
      </div>
    </section>
  );
}
