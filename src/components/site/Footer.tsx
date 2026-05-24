import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-semibold">
              NeuroFlow <span className="text-gradient">AI</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">
            The AI workspace for smarter teams. Automate work, surface insight, and ship faster — all from one calm, unified place.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Product", items: [["Features","/features"],["Dashboard","/dashboard"],["Pricing","/pricing"],["Testimonials","/testimonials"]] },
          { title: "Company", items: [["About","#"],["Customers","#"],["Careers","#"],["Contact","/contact"]] },
          { title: "Resources", items: [["Docs","#"],["Changelog","#"],["Status","#"],["FAQ","/faq"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-3">
              {col.items.map(([label, href]) => (
                <li key={label}>
                  <Link to={href as string} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NeuroFlow AI. Crafted for modern teams.</p>
          <p>Smarter work, on autopilot.</p>
        </div>
      </div>
    </footer>
  );
}
