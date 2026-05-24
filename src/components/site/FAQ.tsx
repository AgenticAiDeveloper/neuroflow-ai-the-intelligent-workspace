import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What does NeuroFlow AI do?", a: "NeuroFlow AI is a smart business workspace that unifies tasks, analytics, collaboration and AI automation — so your team gets more done with less noise." },
  { q: "Is there a free trial?", a: "Yes. Every plan starts with a 14-day free trial. No credit card required." },
  { q: "Can teams collaborate in real time?", a: "Absolutely. Shared spaces, mentions, live cursors and async updates keep everyone in flow without endless meetings." },
  { q: "Does the AI assistant require setup?", a: "Not really. Connect your tools in a few clicks and the assistant starts surfacing insights and drafts immediately." },
  { q: "Is the dashboard customizable?", a: "Fully. Build dashboards by dragging widgets, or just ask the AI to compose one for you." },
  { q: "Is NeuroFlow AI suitable for startups?", a: "It's our happy place. NeuroFlow scales from a 2-person founding team to a 2,000-person org." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Questions, <span className="text-gradient">answered.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 glass rounded-2xl px-2 sm:px-4">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium py-5 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
