import {
  Bot, LineChart, Users, Workflow, Activity, Lightbulb, ListChecks,
  FileText, Gauge, BellRing,
} from "lucide-react";

const features = [
  { i: Bot,        t: "AI Automation",         d: "Let agents handle repetitive work — triage, drafts, follow-ups — across your stack." },
  { i: LineChart,  t: "Smart Analytics",       d: "Auto-generated dashboards that explain the why, not just the what." },
  { i: Users,      t: "Team Collaboration",    d: "Threads, mentions and shared spaces that keep everyone in flow." },
  { i: Workflow,   t: "Workflow Optimization", d: "Spot bottlenecks and let NeuroFlow suggest the next best move." },
  { i: Activity,   t: "Real-Time Insights",    d: "Live signals from your apps surface what needs attention right now." },
  { i: Lightbulb,  t: "AI Recommendations",    d: "Proactive nudges for tasks, hires, experiments and pricing." },
  { i: ListChecks, t: "Task Prioritization",   d: "Daily focus lists tuned to deadlines, goals and team capacity." },
  { i: FileText,   t: "Meeting Summaries",     d: "Decisions, action items and owners — captured automatically." },
  { i: Gauge,      t: "Productivity Monitoring", d: "Healthy throughput metrics that respect privacy and craft." },
  { i: BellRing,   t: "Intelligent Notifications", d: "Calm by default. Loud when it actually matters." },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            One workspace. <span className="text-gradient">Ten AI superpowers.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Replace a dozen tabs with a single calm surface that thinks alongside your team.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((f, i) => (
            <div
              key={f.t}
              className="glass hover-lift rounded-2xl p-6 group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-soft border border-primary/20 text-primary group-hover:scale-110 transition-transform">
                <f.i className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{f.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
