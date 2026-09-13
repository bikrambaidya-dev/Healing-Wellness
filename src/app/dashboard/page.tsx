import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "My Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <h1 className="font-serif-display text-3xl text-plum-900 md:text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-plum-soft">Manage your appointments, saved items, and account details.</p>

        <div className="mt-10">
          <DashboardShell />
        </div>
      </Container>
    </section>
  );
}
