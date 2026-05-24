import { DashboardMockup } from "./DashboardMockup";

export function DashboardPreview() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Workspace</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            A dashboard that <span className="text-gradient">thinks with you.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Analytics, tasks, calendar, activity and an always-on AI assistant — composed into one calm view.
          </p>
        </div>
        <div className="mt-12 relative">
          <div className="absolute -inset-x-10 -inset-y-8 -z-10 bg-gradient-soft blur-3xl opacity-50 rounded-[3rem]" />
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
