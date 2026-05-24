import { Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowBg } from "./GlowBg";
import { DashboardMockup } from "./DashboardMockup";

export function Hero() {
  return (
    <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
      <GlowBg />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Introducing NeuroFlow AI 2.0 — smarter, faster, calmer
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
            Your <span className="text-gradient">AI Workspace</span><br className="hidden sm:block" /> for Smarter Teams
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            NeuroFlow AI unifies tasks, analytics, collaboration and intelligent automation into one beautifully calm workspace — so your team ships more, with less noise.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-brand text-primary-foreground border-0 hover:opacity-90 shadow-[0_20px_60px_-20px_oklch(0.65_0.22_285/60%)]">
                Start Free Trial <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-card/30 backdrop-blur">
                <PlayCircle className="mr-1 h-4 w-4" /> Book Demo
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">No credit card required · Free 14-day trial · Cancel anytime</p>
        </div>

        <div className="relative mt-16 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-x-10 -top-10 -bottom-10 -z-10 bg-gradient-soft blur-3xl opacity-60 rounded-[3rem]" />
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
