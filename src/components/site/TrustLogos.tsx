const brands = ["Northwind", "Acme Co.", "Lumina", "Stratos", "Hexa Labs", "Vertex", "Quantica", "Nimbus"];

export function TrustLogos() {
  return (
    <section className="relative py-16 border-y border-border bg-card/20 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by modern teams · Helping teams streamline work with AI-powered productivity.
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 items-center gap-6 opacity-70">
          {brands.map((b) => (
            <div key={b} className="font-display text-sm sm:text-base tracking-tight text-muted-foreground hover:text-foreground transition-colors">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
