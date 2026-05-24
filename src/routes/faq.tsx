import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/components/site/FAQ";
import { GlowBg } from "@/components/site/GlowBg";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — NeuroFlow AI" },
      { name: "description", content: "Answers to common questions about NeuroFlow AI." },
      { property: "og:title", content: "FAQ — NeuroFlow AI" },
      { property: "og:description", content: "How NeuroFlow works, pricing, setup and security." },
    ],
  }),
  component: () => (
    <>
      <section className="relative pt-24 pb-2">
        <GlowBg />
        <div className="mx-auto max-w-3xl px-6 text-center relative">
          <p className="text-sm text-primary font-medium">FAQ</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Frequently <span className="text-gradient">asked.</span>
          </h1>
        </div>
      </section>
      <FAQ />
    </>
  ),
});
