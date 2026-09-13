"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { getCollection, saveCollection, logActivity } from "@/lib/admin-store";
import { seedUsers } from "@/data/users";
import { AdminUser } from "@/lib/types";

const STORAGE_KEY = "serenity:admin:users";

export function UsersSection() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsers(getCollection<AdminUser>(STORAGE_KEY, seedUsers));
  }, []);

  function persist(next: AdminUser[]) {
    setUsers(next);
    saveCollection(STORAGE_KEY, next);
  }

  function toggleStatus(id: string) {
    if (!users) return;
    const next = users.map((u) =>
      u.id === id ? { ...u, status: (u.status === "active" ? "suspended" : "active") as AdminUser["status"] } : u
    );
    persist(next);
    const target = next.find((u) => u.id === id);
    logActivity(`User ${target?.name} marked ${target?.status}`);
  }

  function removeUser(id: string) {
    if (!users) return;
    if (!window.confirm("Remove this user?")) return;
    const target = users.find((u) => u.id === id);
    persist(users.filter((u) => u.id !== id));
    logActivity(`User removed: ${target?.name ?? id}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!users) return;
    const entry: AdminUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      joinedDate: new Date().toISOString().slice(0, 10),
      bookingsCount: 0,
      status: "active",
    };
    persist([entry, ...users]);
    logActivity(`New user added: ${entry.name}`);
    setName("");
    setEmail("");
    setShowForm(false);
  }

  if (!users) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif-display text-2xl text-plum-900">Users</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory hover:bg-plum-900"
        >
          <Plus className="size-4" /> New User
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-2xl border border-plum/10 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2 flex items-center justify-between">
            <h3 className="font-serif-display text-lg text-plum-900">New User</h3>
            <button type="button" onClick={() => setShowForm(false)} aria-label="Close" className="rounded-lg p-1.5 text-plum-soft hover:bg-plum/5">
              <X className="size-4" />
            </button>
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            />
          </label>
          <div className="sm:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full px-5 py-2.5 text-sm font-medium text-plum-soft hover:bg-plum/5">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-plum-900">
              Add User
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-plum/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-plum/10 text-plum-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">Bookings</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-plum-soft">
                  No users yet.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-b border-plum/5 last:border-0">
                <td className="px-4 py-3 text-plum-900">{u.name}</td>
                <td className="px-4 py-3 text-plum-soft">{u.email}</td>
                <td className="px-4 py-3 text-plum-soft">{u.joinedDate}</td>
                <td className="px-4 py-3 text-plum-soft">{u.bookingsCount}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      u.status === "active" ? "bg-sage-light text-sage-dark" : "bg-blush-light text-plum-soft"
                    }`}
                  >
                    {u.status === "active" ? "Active" : "Suspended"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => removeUser(u.id)}
                    aria-label="Remove user"
                    className="rounded-lg p-2 text-plum-soft hover:bg-plum/5 hover:text-plum-900"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
