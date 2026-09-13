"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileSettings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Ananya Iyer",
    email: "ananya@example.com",
    phone: "+91 90000 12345",
  });
  const [notifications, setNotifications] = useState({ email: true, sms: false });

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
          Full Name
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
          Phone
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
          />
        </label>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-plum-900">Notifications</h3>
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex items-center justify-between rounded-xl border border-plum/10 px-4 py-3">
            <span className="text-sm text-plum-soft">Email reminders for upcoming sessions</span>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => setNotifications((n) => ({ ...n, email: e.target.checked }))}
              className="size-4 accent-plum"
            />
          </label>
          <label className="flex items-center justify-between rounded-xl border border-plum/10 px-4 py-3">
            <span className="text-sm text-plum-soft">SMS reminders</span>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) => setNotifications((n) => ({ ...n, sms: e.target.checked }))}
              className="size-4 accent-plum"
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit">Save Changes</Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-dark">
            <Check className="size-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
