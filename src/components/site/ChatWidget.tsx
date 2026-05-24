import { useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

const seed = [
  { role: "ai" as const, text: "Hey 👋 I'm your NeuroFlow assistant. Ask me anything — try “Plan my day” or “Summarize this week”." },
  { role: "user" as const, text: "Plan my day" },
  { role: "ai" as const, text: "Top 3 for today: 1) ship onboarding v2, 2) review the EU launch risks, 3) 1:1 with Priya. I've blocked 90 minutes of deep work between 10–11:30." },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState(seed);

  function send() {
    if (!draft.trim()) return;
    const user = { role: "user" as const, text: draft.trim() };
    setMsgs((m) => [...m, user]);
    setDraft("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai" as const, text: "Got it — I've drafted a plan and added action items to your board. (Demo response.)" }]);
    }, 600);
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-4 py-3 text-sm font-medium shadow-[0_20px_60px_-20px_oklch(0.65_0.22_285/60%)] hover:opacity-95 transition"
        >
          <Sparkles className="h-4 w-4" /> Ask NeuroFlow
        </button>
      )}
      {open && (
        <div className="fixed bottom-5 right-5 z-40 w-[360px] max-w-[calc(100vw-2rem)] glass-strong glow-ring rounded-2xl overflow-hidden flex flex-col animate-fade-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-brand">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
              NeuroFlow Assistant
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-4 py-4 space-y-2 max-h-[380px] overflow-y-auto">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] text-sm rounded-2xl px-3 py-2 ${
                m.role === "ai"
                  ? "bg-gradient-soft border border-primary/20 mr-auto rounded-tl-sm"
                  : "bg-background/60 border border-border ml-auto rounded-tr-sm"
              }`}>{m.text}</div>
            ))}
          </div>
          <div className="px-3 pb-3 flex flex-wrap gap-1.5">
            {["Summarize standups", "Draft launch email", "Find risks"].map((s) => (
              <button key={s} onClick={() => setDraft(s)} className="text-[11px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="border-t border-border p-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground ml-1" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground py-1.5"
            />
            <button type="submit" className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-brand text-primary-foreground">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
