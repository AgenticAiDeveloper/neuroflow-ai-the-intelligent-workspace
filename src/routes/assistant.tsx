import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles, Plus, Search, Settings, LogOut, Pin, MessageSquare,
  Send, Paperclip, Mic, ChevronDown, Wand2, FileText, BarChart3,
  Lightbulb, ListChecks, Zap, Clock, Bot, User, Copy, ThumbsUp,
  ThumbsDown, RefreshCw, PanelRightOpen, PanelRightClose, Menu, X,
} from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — NeuroFlow AI" },
      { name: "description", content: "A premium AI assistant workspace — chat, plan, summarize and ship with NeuroFlow AI." },
      { property: "og:title", content: "AI Assistant — NeuroFlow AI" },
      { property: "og:description", content: "A ChatGPT-inspired AI workspace for modern teams." },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "ai"; text: string; ts?: string };

const PINNED = [
  { id: "p1", title: "Q4 launch playbook", icon: Pin },
  { id: "p2", title: "Weekly exec briefing", icon: Pin },
];

const HISTORY = [
  { group: "Today", items: [
    { id: "1", title: "Plan tomorrow's standup", icon: MessageSquare },
    { id: "2", title: "Summarize EU launch risks", icon: FileText },
    { id: "3", title: "Draft investor update", icon: Wand2 },
  ]},
  { group: "Yesterday", items: [
    { id: "4", title: "Compare pricing tiers", icon: BarChart3 },
    { id: "5", title: "Roadmap Q1 brainstorm", icon: Lightbulb },
  ]},
  { group: "Previous 7 days", items: [
    { id: "6", title: "Onboarding email rewrite", icon: Wand2 },
    { id: "7", title: "Retention metrics deep-dive", icon: BarChart3 },
    { id: "8", title: "Hiring rubric for design", icon: ListChecks },
    { id: "9", title: "Conference talk outline", icon: FileText },
  ]},
];

const SUGGESTIONS = [
  { i: Wand2,    t: "Draft a launch email",       d: "Polished, on-brand, ready to send." },
  { i: BarChart3,t: "Summarize this week",        d: "Wins, blockers and what's next." },
  { i: Lightbulb,t: "Brainstorm product ideas",   d: "10 fresh angles for our next release." },
  { i: ListChecks,t:"Plan my day",                d: "Prioritized tasks with time blocks." },
];

const DEMO_REPLY = `Here's a focused plan for today — three high-leverage moves:

**1. Ship onboarding v2 (90 min · deep work)**
Wrap the empty-state polish and push to staging. I've drafted the changelog entry.

**2. EU launch risk review (45 min)**
The top three risks worth your call: GDPR data residency, support coverage in CET hours, and Stripe currency rounding. I've prepped a 1-pager.

**3. 1:1 with Priya (30 min)**
Suggested agenda: design hiring rubric, Q1 roadmap themes, and her growth path.

> I've blocked 10:00–11:30 for deep work and moved two low-priority meetings to async. Want me to draft the standup update too?`;

function AssistantPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send(text?: string) {
    const t = (text ?? draft).trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t, ts: "now" }]);
    setDraft("");
    setTyping(true);
    setActiveId((id) => id ?? "1");
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { role: "ai", text: DEMO_REPLY, ts: "now" }]);
    }, 1100);
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background overflow-hidden">
      {/* ambient bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-float-blob" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-float-blob" style={{ animationDelay: "3s" }} />
      </div>

      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-6 py-4 lg:py-6">
        <div className="grid gap-4 lg:gap-5 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_320px] h-[calc(100vh-6rem)]">

          {/* LEFT SIDEBAR */}
          <aside className={`${sidebarOpen ? "fixed inset-0 z-40 p-3" : "hidden"} lg:relative lg:p-0 lg:block`}>
            {sidebarOpen && <div className="absolute inset-0 -z-10 bg-background/70 backdrop-blur-xl lg:hidden" onClick={() => setSidebarOpen(false)} />}
            <div className="glass-strong glow-ring rounded-2xl h-full flex flex-col overflow-hidden">
              <div className="p-3 border-b border-border flex items-center gap-2">
                <button
                  onClick={() => { setActiveId(null); setMsgs([]); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand text-primary-foreground text-sm font-medium px-3 py-2.5 hover:opacity-90 transition shadow-[0_8px_24px_-8px_oklch(0.65_0.22_285/60%)]"
                >
                  <Plus className="h-4 w-4" /> New chat
                </button>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    placeholder="Search chats…"
                    className="w-full bg-background/40 border border-border rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground/70 outline-none focus:border-primary/50 transition"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
                <div>
                  <p className="px-3 mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/70 flex items-center gap-1.5"><Pin className="h-3 w-3" /> Pinned</p>
                  {PINNED.map((p) => (
                    <ChatItem key={p.id} id={p.id} title={p.title} Icon={p.icon} activeId={activeId} setActive={setActiveId} />
                  ))}
                </div>
                {HISTORY.map((g) => (
                  <div key={g.group}>
                    <p className="px-3 mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/70 flex items-center gap-1.5"><Clock className="h-3 w-3" /> {g.group}</p>
                    {g.items.map((it) => (
                      <ChatItem key={it.id} id={it.id} title={it.title} Icon={it.icon} activeId={activeId} setActive={setActiveId} />
                    ))}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-secondary/40 transition cursor-pointer">
                  <div className="relative h-9 w-9 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    A
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-background" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">Alex Morgan</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <span className="inline-block px-1.5 py-0.5 rounded-full bg-gradient-soft border border-primary/20 text-[9px] uppercase tracking-wider text-primary">Pro</span>
                      Founder
                    </p>
                  </div>
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60"><Settings className="h-4 w-4" /></button>
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60"><LogOut className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER CHAT */}
          <section className="glass-strong glow-ring rounded-2xl flex flex-col overflow-hidden min-h-0">
            {/* header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border">
              <div className="flex items-center gap-3 min-w-0">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground">
                  <Menu className="h-4 w-4" />
                </button>
                <div className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-[0_8px_24px_-8px_oklch(0.65_0.22_285/60%)]">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h1 className="font-display text-base font-semibold truncate flex items-center gap-2">
                    NeuroFlow Assistant
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </h1>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    Online · GPT-class · context 200k
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-gradient-soft border border-primary/20 text-primary">Demo</span>
                <button onClick={() => setRightOpen((v) => !v)} className="hidden xl:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                  {rightOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* messages / welcome */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              {msgs.length === 0 ? (
                <WelcomeState onPick={send} />
              ) : (
                <div className="mx-auto max-w-3xl space-y-6">
                  {msgs.map((m, i) => (
                    <MessageBubble key={i} role={m.role} text={m.text} />
                  ))}
                  {typing && <TypingBubble />}
                </div>
              )}
            </div>

            {/* composer */}
            <div className="border-t border-border p-3 sm:p-4">
              <div className="mx-auto max-w-3xl">
                <form
                  onSubmit={(e) => { e.preventDefault(); send(); }}
                  className="group glass rounded-2xl border border-border focus-within:border-primary/40 transition-all p-2 shadow-[0_20px_60px_-30px_oklch(0_0_0/40%)]"
                >
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                    rows={1}
                    placeholder="Message NeuroFlow Assistant…"
                    className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground/70 px-3 py-2 max-h-40"
                  />
                  <div className="flex items-center justify-between px-1 pt-1">
                    <div className="flex items-center gap-1">
                      <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60"><Paperclip className="h-4 w-4" /></button>
                      <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60"><Mic className="h-4 w-4" /></button>
                      <button type="button" className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60">
                        <Wand2 className="h-3.5 w-3.5" /> Prompts
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!draft.trim()}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand text-primary-foreground text-sm font-medium px-3.5 py-2 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_8px_24px_-8px_oklch(0.65_0.22_285/60%)]"
                    >
                      Send <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">NeuroFlow can make mistakes. Verify important info. <kbd className="px-1 py-0.5 rounded border border-border bg-card/40 text-[10px]">Shift</kbd> + <kbd className="px-1 py-0.5 rounded border border-border bg-card/40 text-[10px]">Enter</kbd> for new line.</p>
              </div>
            </div>
          </section>

          {/* RIGHT PANEL */}
          {rightOpen && (
            <aside className="hidden xl:block">
              <div className="glass-strong glow-ring rounded-2xl h-full flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70">Workspace</p>
                  <h3 className="mt-1 font-display text-base font-semibold">AI Insights</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <InsightCard
                    icon={Zap}
                    tone="primary"
                    title="Focus signal"
                    body="You're 32% more productive in 10–12 AM blocks. I've protected tomorrow's morning for deep work."
                  />
                  <InsightCard
                    icon={BarChart3}
                    tone="accent"
                    title="Activation up 18%"
                    body="New onboarding v2 is converting better. Recommend rolling 100% by Friday."
                  />
                  <div className="rounded-xl border border-border bg-card/40 p-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">Recommended actions</p>
                    <ul className="space-y-1.5">
                      {[
                        "Reply to 3 customer threads",
                        "Approve Q1 roadmap draft",
                        "Schedule design 1:1 with Priya",
                      ].map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-foreground/90">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border bg-card/40 p-3">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">Quick templates</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Launch email", "Standup", "1:1 notes", "Spec doc"].map((t) => (
                        <button key={t} onClick={() => send(`Draft a ${t.toLowerCase()}`)} className="text-left text-xs rounded-lg border border-border bg-background/40 px-2.5 py-2 hover:border-primary/40 hover:text-foreground text-muted-foreground transition">
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatItem({ id, title, Icon, activeId, setActive }: { id: string; title: string; Icon: any; activeId: string | null; setActive: (id: string) => void }) {
  const active = activeId === id;
  return (
    <button
      onClick={() => setActive(id)}
      className={`group w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
        active
          ? "bg-gradient-soft border border-primary/20 text-foreground"
          : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40"
      }`}
    >
      <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-primary" : ""}`} />
      <span className="truncate text-left flex-1">{title}</span>
    </button>
  );
}

function WelcomeState({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="mx-auto max-w-3xl pt-6 sm:pt-12 animate-fade-up">
      <div className="text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-[0_20px_60px_-20px_oklch(0.65_0.22_285/60%)]">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
          How can I help you <span className="text-gradient">today</span>?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Pick a prompt or ask anything — I'll do the heavy lifting.</p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.t}
            onClick={() => onPick(s.t)}
            className="group text-left glass hover-lift rounded-2xl p-4 flex items-start gap-3"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-soft border border-primary/20">
              <s.i className="h-4 w-4 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{s.t}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.d}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["Summarize last meeting", "Translate to Spanish", "Find risks in this doc", "Generate test cases"].map((q) => (
          <button key={q} onClick={() => onPick(q)} className="text-xs px-3 py-1.5 rounded-full border border-border bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ role, text }: { role: "user" | "ai"; text: string }) {
  if (role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end animate-fade-up">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-gradient-soft border border-primary/20 px-4 py-2.5 text-sm">
          {text}
        </div>
        <div className="h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3 animate-fade-up">
      <div className="h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center shrink-0 shadow-[0_8px_24px_-8px_oklch(0.65_0.22_285/60%)]">
        <Bot className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="glass rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
          {text.split("\n").map((line, i) => {
            if (line.startsWith("**") && line.endsWith("**")) {
              return <p key={i} className="font-semibold mt-2 first:mt-0">{line.slice(2, -2)}</p>;
            }
            if (line.startsWith("> ")) {
              return <p key={i} className="mt-2 pl-3 border-l-2 border-primary/40 text-muted-foreground italic">{line.slice(2)}</p>;
            }
            return <p key={i} className={line ? "mt-1" : "h-2"}>{line}</p>;
          })}
        </div>
        <div className="mt-1.5 flex items-center gap-1 px-1 text-muted-foreground">
          {[Copy, ThumbsUp, ThumbsDown, RefreshCw].map((Icon, i) => (
            <button key={i} className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-secondary/60 hover:text-foreground transition">
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-start gap-3 animate-fade-up">
      <div className="h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center shrink-0">
        <Bot className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="glass rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: `${i * 200}ms` }} />
        ))}
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, body, tone }: { icon: any; title: string; body: string; tone: "primary" | "accent" }) {
  return (
    <div className="rounded-xl border border-border bg-card/40 p-3 hover-lift">
      <div className="flex items-center gap-2">
        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tone === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
