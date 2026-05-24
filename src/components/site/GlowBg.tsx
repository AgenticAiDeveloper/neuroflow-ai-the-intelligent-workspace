export function GlowBg({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute -top-40 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full blur-3xl opacity-40 animate-float-blob"
        style={{ background: "radial-gradient(closest-side, oklch(0.65 0.22 285 / 60%), transparent)" }}
      />
      <div
        className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full blur-3xl opacity-30 animate-float-blob"
        style={{ background: "radial-gradient(closest-side, oklch(0.70 0.18 200 / 60%), transparent)", animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full blur-3xl opacity-30 animate-float-blob"
        style={{ background: "radial-gradient(closest-side, oklch(0.70 0.22 340 / 50%), transparent)", animationDelay: "-8s" }}
      />
    </div>
  );
}
