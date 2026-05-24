import { Rocket, Cog, Megaphone, Layers3, Crown } from "lucide-react";

const cases = [
  { i: Rocket,   t: "Startup Teams",        d: "Move from idea to launch faster with AI handling the busywork."},
  { i: Cog,      t: "Operations Teams",     d: "Standardize SOPs, reduce errors, keep every workflow on rails." },
  { i: Megaphone,t: "Marketing Teams",      d: "Plan campaigns, draft copy, and learn from results in one place." },
  { i: Layers3,  t: "Product Managers",     d: "Specs, roadmaps and standups stay synced — without the meetings." },
  { i: Crown,    t: "Founders & Executives",d: "Daily AI briefings on what changed and what needs your call." },
];

export function UseCases() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Solutions</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Built for every team that ships.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cases.map((c) => (
            <div key={c.t} className="glass hover-lift rounded-2xl p-6">
              <c.i className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-display font-semibold">{c.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.d}</p>
              <p className="mt-4 text-xs text-primary">+34% faster delivery →</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
