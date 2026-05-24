import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const plans = [
  {
    name: "Starter", price: "$0", cadence: "/mo",
    blurb: "Everything to try NeuroFlow with a small team.",
    cta: "Start free",
    features: ["Up to 5 users", "AI assistant (50/day)", "3 dashboards", "Community support"],
  },
  {
    name: "Pro", price: "$24", cadence: "/user/mo",
    blurb: "For growing teams that want serious leverage.",
    cta: "Start free trial", highlight: true,
    features: ["Unlimited users", "Unlimited AI actions", "Custom dashboards", "Advanced automations", "Priority support"],
  },
  {
    name: "Enterprise", price: "Custom", cadence: "",
    blurb: "Security, scale and white-glove onboarding.",
    cta: "Book a call",
    features: ["SSO & SAML", "Audit logs", "Custom AI models", "Dedicated CSM", "99.99% uptime SLA"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Simple plans. <span className="text-gradient">Serious value.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when your team feels the lift.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 ${p.highlight ? "glass-strong glow-ring" : "glass"} hover-lift`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full bg-gradient-brand text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.65_0.22_285/60%)]">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-muted-foreground text-sm">{p.cadence}</span>
              </div>
              <Link to="/contact" className="block mt-6">
                <Button className={`w-full ${p.highlight ? "bg-gradient-brand text-primary-foreground border-0 hover:opacity-90" : ""}`} variant={p.highlight ? "default" : "outline"}>
                  {p.cta}
                </Button>
              </Link>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
