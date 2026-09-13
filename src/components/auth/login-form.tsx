"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_CREDENTIALS, isAdminCredentials, setAdminSession } from "@/lib/admin-auth";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (mode === "login" && isAdminCredentials(email, password)) {
      setAdminSession();
      setTimeout(() => router.push("/admin"), 600);
      return;
    }

    setTimeout(() => router.push("/dashboard"), 600);
  }

  return (
    <div>
      <div className="mb-6 flex rounded-full border border-plum/15 p-1">
        <button
          onClick={() => setMode("login")}
          className={cn(
            "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
            mode === "login" ? "bg-plum text-ivory" : "text-plum-soft"
          )}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={cn(
            "flex-1 rounded-full py-2 text-sm font-semibold transition-colors",
            mode === "signup" ? "bg-plum text-ivory" : "text-plum-soft"
          )}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
            Full Name
            <input
              required
              className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
              placeholder="Your full name"
            />
          </label>
        )}
        <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            placeholder="you@email.com"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-plum-900">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-plum/15 bg-ivory px-4 py-3 text-sm outline-none focus:border-plum/40"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-plum px-6 py-3.5 text-sm font-semibold text-ivory transition-opacity hover:bg-plum-900 disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-plum-soft">
        By continuing, you agree to Amara&apos;s Terms and Privacy Policy.
      </p>

      {mode === "login" && (
        <button
          type="button"
          onClick={() => {
            setEmail(ADMIN_CREDENTIALS.email);
            setPassword(ADMIN_CREDENTIALS.password);
          }}
          className="mt-4 w-full rounded-xl bg-plum/5 px-4 py-3 text-center text-xs text-plum-soft transition-colors hover:bg-plum/10"
        >
          Demo admin login: <span className="font-medium text-plum-900">{ADMIN_CREDENTIALS.email}</span> /{" "}
          <span className="font-medium text-plum-900">{ADMIN_CREDENTIALS.password}</span>
          <span className="mt-1 block text-[11px] text-plum-soft/70">Click to autofill</span>
        </button>
      )}
    </div>
  );
}
