import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { TrustLogos } from "@/components/site/TrustLogos";
import { Features } from "@/components/site/Features";
import { UseCases } from "@/components/site/UseCases";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { Workflow } from "@/components/site/Workflow";
import { Pricing } from "@/components/site/Pricing";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroFlow AI — The AI Workspace for Smarter Teams" },
      { name: "description", content: "Tasks, analytics, automation and AI insights in one calm workspace built for modern teams." },
      { property: "og:title", content: "NeuroFlow AI — The AI Workspace for Smarter Teams" },
      { property: "og:description", content: "Smarter work, on autopilot. One workspace for tasks, analytics, collaboration and AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <Features />
      <UseCases />
      <DashboardPreview />
      <Workflow />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
