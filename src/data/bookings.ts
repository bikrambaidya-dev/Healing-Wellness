import { Appointment, Order } from "@/lib/types";

export const seedAppointments: Appointment[] = [
  {
    id: "seed-1",
    expertSlug: "priya-sharma",
    expertName: "Priya Sharma",
    serviceName: "Reiki Healing",
    date: "2026-08-14",
    time: "10:30 AM",
    duration: "60 min",
    price: 2499,
    status: "completed",
  },
  {
    id: "seed-2",
    expertSlug: "aarav-mehta",
    expertName: "Aarav Mehta",
    serviceName: "Sound Healing",
    date: "2026-07-02",
    time: "06:30 PM",
    duration: "45 min",
    price: 1699,
    status: "completed",
  },
];

export const seedOrders: Order[] = [
  {
    id: "AMR-10231",
    date: "2026-08-02",
    items: [{ name: "Amethyst", image: "amethyst", quantity: 1, price: 1299 }],
    total: 1299,
    status: "delivered",
  },
  {
    id: "AMR-10198",
    date: "2026-06-18",
    items: [
      { name: "Rose Quartz", image: "rose-quartz", quantity: 1, price: 999 },
      { name: "Moonstone", image: "moonstone", quantity: 1, price: 1399 },
    ],
    total: 2398,
    status: "delivered",
  },
];
