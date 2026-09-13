"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { crystals } from "@/data/crystals";
import { experts } from "@/data/experts";
import { Appointment } from "@/lib/types";

type SavedType = "crystal" | "expert";
type SavedItem = { type: SavedType; slug: string };
type CartItem = { slug: string; qty: number };

type StoreState = {
  saved: SavedItem[];
  isSaved: (type: SavedType, slug: string) => boolean;
  toggleSaved: (type: SavedType, slug: string) => void;
  cart: CartItem[];
  addToCart: (slug: string, qty?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  bookings: Appointment[];
  addBooking: (booking: Appointment) => void;
  cancelBooking: (id: string) => void;
};

const StoreContext = createContext<StoreState | null>(null);

const SAVED_KEY = "amara:saved";
const CART_KEY = "amara:cart";
const BOOKINGS_KEY = "amara:bookings";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen post-mount: the server has no `window`,
    // so hydrating here (instead of in initial state) keeps SSR and the first
    // client render identical, avoiding a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(readStorage(SAVED_KEY, []));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(readStorage(CART_KEY, []));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookings(readStorage(BOOKINGS_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings, hydrated]);

  const addBooking = (booking: Appointment) => {
    setBookings((prev) => [booking, ...prev]);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
  };

  const isSaved = (type: SavedType, slug: string) =>
    saved.some((s) => s.type === type && s.slug === slug);

  const toggleSaved = (type: SavedType, slug: string) => {
    setSaved((prev) =>
      prev.some((s) => s.type === type && s.slug === slug)
        ? prev.filter((s) => !(s.type === type && s.slug === slug))
        : [...prev, { type, slug }]
    );
  };

  const addToCart = (slug: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug, qty }];
    });
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((i) => i.slug !== slug));
  };

  const updateQty = (slug: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartSubtotal = cart.reduce((sum, i) => {
    const crystal = crystals.find((c) => c.slug === i.slug);
    return sum + (crystal ? crystal.price * i.qty : 0);
  }, 0);

  const value = useMemo(
    () => ({
      saved,
      isSaved,
      toggleSaved,
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      cartSubtotal,
      bookings,
      addBooking,
      cancelBooking,
    }),
    [saved, cart, bookings]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}

export function getSavedExperts(saved: SavedItem[]) {
  return saved.filter((s) => s.type === "expert").map((s) => experts.find((e) => e.slug === s.slug)).filter(Boolean);
}

export function getSavedCrystals(saved: SavedItem[]) {
  return saved.filter((s) => s.type === "crystal").map((s) => crystals.find((c) => c.slug === s.slug)).filter(Boolean);
}
