import { AdminUser } from "@/lib/types";

export const seedUsers: AdminUser[] = [
  {
    id: "usr-1",
    name: "Ananya Rao",
    email: "ananya.rao@gmail.com",
    joinedDate: "2026-01-12",
    bookingsCount: 4,
    status: "active",
  },
  {
    id: "usr-2",
    name: "Karan Mehta",
    email: "karan.mehta@gmail.com",
    joinedDate: "2026-02-03",
    bookingsCount: 1,
    status: "active",
  },
  {
    id: "usr-3",
    name: "Fatima Sheikh",
    email: "fatima.sheikh@gmail.com",
    joinedDate: "2025-11-20",
    bookingsCount: 7,
    status: "active",
  },
  {
    id: "usr-4",
    name: "Rohit Verma",
    email: "rohit.verma@gmail.com",
    joinedDate: "2025-09-05",
    bookingsCount: 0,
    status: "suspended",
  },
];
