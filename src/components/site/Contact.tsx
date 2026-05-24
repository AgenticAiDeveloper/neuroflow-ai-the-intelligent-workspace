import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarCheck, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(fd.get("name") || "").trim()) next.name = "Required";
    const email = String(fd.get("email") || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Enter a valid email";
    if (!String(fd.get("message") || "").trim()) next.message = "Tell us a bit";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 glass-strong rounded-2xl p-8">
          <p className="text-sm font-medium text-primary">Contact</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Let's get your team into <span className="text-gradient">flow.</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Tell us about your team — we usually reply within a few hours.</p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Ada Lovelace" />
                {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@company.com" />
                {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="Acme, Inc." />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} placeholder="What are you hoping NeuroFlow could solve?" />
              {errors.message && <span className="text-xs text-destructive">{errors.message}</span>}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" className="bg-gradient-brand text-primary-foreground border-0 hover:opacity-90">
                <Send className="mr-1 h-4 w-4" /> Send message
              </Button>
              {sent && (
                <span className="text-sm text-[oklch(0.78_0.17_150)] flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Thanks — we'll be in touch.
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 grid gap-4">
          <div className="glass rounded-2xl p-6">
            <CalendarCheck className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-display font-semibold">Book a demo</h3>
            <p className="text-sm text-muted-foreground mt-1">
              30 minutes with a NeuroFlow specialist. Walk through workflows tailored to your team.
            </p>
            <Button variant="outline" className="mt-5 w-full">Pick a time</Button>
          </div>
          <div className="glass rounded-2xl p-6">
            <Mail className="h-5 w-5 text-accent" />
            <h3 className="mt-4 font-display font-semibold">Sales</h3>
            <p className="text-sm text-muted-foreground mt-1">sales@neuroflow.ai</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <MessageCircle className="h-5 w-5 text-[oklch(0.78_0.17_150)]" />
            <h3 className="mt-4 font-display font-semibold">Support</h3>
            <p className="text-sm text-muted-foreground mt-1">help.neuroflow.ai · 24/7 live chat</p>
          </div>
        </div>
      </div>
    </section>
  );
}
