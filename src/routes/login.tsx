import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlowBg } from "@/components/site/GlowBg";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — NeuroFlow AI" },
      { name: "description", content: "Sign in to your NeuroFlow workspace." },
      { property: "og:title", content: "Login — NeuroFlow AI" },
      { property: "og:description", content: "Welcome back to your AI workspace." },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 px-4">
      <GlowBg />
      <div className="relative w-full max-w-md glass-strong glow-ring rounded-2xl p-8">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your workspace</p>
        </div>
        <form className="mt-8 grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="bg-gradient-brand text-primary-foreground border-0 hover:opacity-90">Sign in</Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/contact" className="text-primary hover:underline">Start a free trial</Link>
        </p>
      </div>
    </section>
  );
}
