export type HealingService = {
  slug: string;
  name: string;
  tagline: string;
  keywords: string[];
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  benefits: string[];
  durations: { label: string; minutes: number; priceFrom: number }[];
  priceFrom: number;
  color: "sage" | "lavender" | "blush" | "sand";
};

export type ExpertService = {
  serviceSlug: string;
  name: string;
  duration: string;
  price: number;
  description: string;
};

export type Expert = {
  slug: string;
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  longBio: string[];
  approach: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  sessionsCount: number;
  languages: string[];
  location: string;
  certifications: string[];
  image: string;
  gallery: string[];
  priceFrom: number;
  available: boolean;
  nextAvailable: string;
  servicesOffered: ExpertService[];
  availability: { day: string; slots: { time: string; available: boolean }[] }[];
};

export type Crystal = {
  slug: string;
  name: string;
  category: "healing-crystal" | "bracelet" | "raw-stone" | "gift-set";
  purpose: string[];
  chakra: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  careInstructions: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: { heading: string; body: string[] }[];
  author: { name: string; role: string; image: string };
  date: string;
  readingTime: number;
  image: string;
  tags: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  image: string;
  service: string;
  rating: number;
  quote: string;
  date: string;
};

export type Appointment = {
  id: string;
  expertSlug: string;
  expertName: string;
  serviceName: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: "upcoming" | "completed" | "cancelled";
};

export type Order = {
  id: string;
  date: string;
  items: { name: string; image: string; quantity: number; price: number }[];
  total: number;
  status: "processing" | "shipped" | "delivered";
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  bookingsCount: number;
  status: "active" | "suspended";
};

export type ActivityEntry = {
  id: string;
  message: string;
  timestamp: number;
};
