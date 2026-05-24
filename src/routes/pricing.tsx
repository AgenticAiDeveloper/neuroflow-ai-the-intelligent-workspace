import { createFileRoute } from "@tanstack/react-router";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { GlowBg } from "@/components/site/GlowBg";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — NeuroFlow AI" },
      { name: "description", content: "Simple, transparent pricing. Start free, upgrade when your team feels the lift." },
      { property: "og:title", content: "Pricing — NeuroFlow AI" },
      { property: "og:description", content: "Starter, Pro and Enterprise plans for every team size." },
    ],
  }),
  component: () => (
    <>
      <section className="relative pt-24 pb-4">
        <GlowBg />
        <div className="mx-auto max-w-3xl px-6 text-center relative">
          <p className="text-sm text-primary font-medium">Pricing</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Fair pricing. <span className="text-gradient">Outsized value.</span>
          </h1>
        </div>
      </section>
      <Pricing />
      <FAQ />
    </>
  ),
});
