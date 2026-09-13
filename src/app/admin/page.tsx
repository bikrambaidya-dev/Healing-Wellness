import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="py-10 md:py-16">
      <Container>
        <h1 className="font-serif-display text-3xl text-plum-900 md:text-4xl">Admin Panel</h1>
        <p className="mt-2 text-sm text-plum-soft">Manage bookings, experts, users, and platform settings.</p>

        <div className="mt-10">
          <AdminShell />
        </div>
      </Container>
    </section>
  );
}
