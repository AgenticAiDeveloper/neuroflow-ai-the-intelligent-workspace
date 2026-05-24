import { createFileRoute } from "@tanstack/react-router";
import { Features } from "@/components/site/Features";
import { UseCases } from "@/components/site/UseCases";
import { Workflow } from "@/components/site/Workflow";
import { GlowBg } from "@/components/site/GlowBg";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — NeuroFlow AI" },
      { name: "description", content: "Explore every NeuroFlow AI feature: automation, analytics, collaboration, prioritization, summaries and more." },
      { property: "og:title", content: "Features — NeuroFlow AI" },
      { property: "og:description", content: "Ten AI superpowers in one calm workspace." },
    ],
  }),
  component: () => (
    <>
      <section className="relative pt-24 pb-8">
        <GlowBg />
        <div className="mx-auto max-w-4xl px-6 text-center relative">
          <p className="text-sm text-primary font-medium">Features</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Everything your team needs, <span className="text-gradient">nothing it doesn't.</span>
          </h1>
          <p className="mt-5 text-muted-foreground">A complete tour of what NeuroFlow can do for your team.</p>
        </div>
      </section>
      <Features />
      <UseCases />
      <Workflow />
    </>
  ),
});
