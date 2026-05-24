import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/components/site/Testimonials";
import { TrustLogos } from "@/components/site/TrustLogos";
import { GlowBg } from "@/components/site/GlowBg";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — NeuroFlow AI" },
      { name: "description", content: "How modern teams use NeuroFlow AI to ship faster with less noise." },
      { property: "og:title", content: "Testimonials — NeuroFlow AI" },
      { property: "og:description", content: "Real stories from founders, PMs and ops leaders." },
    ],
  }),
  component: () => (
    <>
      <section className="relative pt-24 pb-4">
        <GlowBg />
        <div className="mx-auto max-w-3xl px-6 text-center relative">
          <p className="text-sm text-primary font-medium">Customers</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Teams in <span className="text-gradient">flow.</span>
          </h1>
        </div>
      </section>
      <Testimonials />
      <TrustLogos />
    </>
  ),
});
