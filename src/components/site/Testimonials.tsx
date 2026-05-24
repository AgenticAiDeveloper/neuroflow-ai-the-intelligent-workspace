import { Star } from "lucide-react";

const items = [
  { n: "Maya Tran", r: "Co-founder & CEO", c: "Northwind", q: "NeuroFlow replaced four tools in our stack. Our team finally has one place to think, ship and review work." },
  { n: "Daniel Roy", r: "Head of Ops", c: "Lumina", q: "The AI brief every Monday is honestly worth the whole subscription. It tells me what changed and what to do about it." },
  { n: "Priya Shah", r: "Product Lead", c: "Stratos", q: "It feels like Apple designed Linear's love child with an AI agent inside. Calm, fast, gorgeous." },
  { n: "Marcus Wei", r: "Engineering Manager", c: "Hexa Labs", q: "We cut status meetings by 70%. The async summaries are sharper than anything we wrote ourselves." },
  { n: "Sofia Lindgren", r: "Marketing Director", c: "Vertex", q: "Campaign planning that doesn't suck. The assistant is genuinely good at first drafts." },
  { n: "Ahmed Karim", r: "Founder", c: "Quantica", q: "I run my whole company from NeuroFlow now. Investors keep asking what tool I'm using." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Testimonials</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Loved by <span className="text-gradient">modern teams.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.n} className="glass hover-lift rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-0.5 text-[oklch(0.78_0.17_60)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="flex items-center gap-3 mt-auto">
                <span className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  {t.n.split(" ").map((s) => s[0]).join("")}
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.n}</span>
                  <span className="block text-xs text-muted-foreground">{t.r} · {t.c}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
