import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { GlowBg } from "@/components/site/GlowBg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NeuroFlow AI" },
      { name: "description", content: "Talk to the NeuroFlow team. Book a demo or send a message." },
      { property: "og:title", content: "Contact — NeuroFlow AI" },
      { property: "og:description", content: "We usually reply within a few hours." },
    ],
  }),
  component: () => (
    <>
      <section className="relative pt-24 pb-2">
        <GlowBg />
        <div className="mx-auto max-w-3xl px-6 text-center relative">
          <p className="text-sm text-primary font-medium">Contact</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            Let's <span className="text-gradient">talk.</span>
          </h1>
        </div>
      </section>
      <Contact />
    </>
  ),
});
