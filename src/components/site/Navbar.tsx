import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Sparkles, X, ArrowRight } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/pricing", label: "Pricing" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`absolute inset-0 -z-10 transition-all duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-12px_oklch(0_0_0/40%)]"
            : "bg-background/30 backdrop-blur-md border-b border-transparent"
        }`}
      />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-[0_8px_30px_-8px_oklch(0.65_0.22_285/70%)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            NeuroFlow <span className="text-gradient">AI</span>
          </span>
        </Link>

        <ul className="hidden xl:flex items-center gap-0.5 glass rounded-full px-1.5 py-1">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`relative px-3.5 py-1.5 text-[13px] rounded-full transition-all ${
                    active
                      ? "text-foreground bg-secondary/70 shadow-inner"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/50 backdrop-blur text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Login</Button>
          </Link>
          <Link to="/contact" className="hidden sm:inline-flex">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-90 border-0 shadow-[0_8px_24px_-8px_oklch(0.65_0.22_285/60%)]">
              Get Started <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="xl:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/50 backdrop-blur text-foreground hover:border-primary/40 transition-colors"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] sm:w-[400px] p-0 border-l border-border bg-background/80 backdrop-blur-2xl [&>button]:hidden"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-60" />
              <div className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </span>
                    <span className="font-display text-base font-semibold">
                      NeuroFlow <span className="text-gradient">AI</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <p className="px-3 mb-3 text-[11px] uppercase tracking-widest text-muted-foreground/70">Menu</p>
                  <ul className="space-y-1">
                    {links.map((l, i) => {
                      const active = pathname === l.to;
                      return (
                        <li key={l.to} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                          <Link
                            to={l.to}
                            onClick={() => setOpen(false)}
                            className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                              active
                                ? "bg-gradient-soft text-foreground border border-primary/20 shadow-[inset_0_1px_0_oklch(1_0_0/8%)]"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              {active && <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.72_0.18_285/80%)]" />}
                              {l.label}
                            </span>
                            <ArrowRight className={`h-4 w-4 transition-all ${active ? "text-primary translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="px-4 pb-6 pt-4 border-t border-border space-y-2.5">
                  <Link to="/login" onClick={() => setOpen(false)} className="block">
                    <Button variant="outline" className="w-full bg-card/40 backdrop-blur border-border h-11">Login</Button>
                  </Link>
                  <Link to="/contact" onClick={() => setOpen(false)} className="block">
                    <Button className="w-full bg-gradient-brand text-primary-foreground border-0 h-11 shadow-[0_8px_24px_-8px_oklch(0.65_0.22_285/60%)]">
                      Get Started <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                  <p className="pt-2 text-center text-[11px] text-muted-foreground">No credit card · 14-day free trial</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
