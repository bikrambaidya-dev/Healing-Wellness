import { Expert } from "@/lib/types";
import { images } from "@/lib/images";

export const experts: Expert[] = [
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    email: "priya@serenitywellness.com",
    password: "Priya@123",
    title: "Verified Reiki & Angel Healing Practitioner",
    specialties: ["Reiki Healing", "Angel Healing", "Chakra Balancing"],
    bio: "Priya brings warmth and quiet precision to every session, helping clients feel safe enough to truly let go.",
    longBio: [
      "Priya's journey into energy healing began during a period of personal burnout, when a single Reiki session shifted something she couldn't explain — and couldn't ignore. That experience led her to train formally under Reiki Masters in Rishikesh and Kyoto, and later to deepen her practice in Angel Healing and chakra work.",
      "Over eight years, Priya has held space for clients navigating grief, anxiety, major life transitions, and simply the accumulated weight of modern life. Her approach is gentle but focused: she listens closely before every session and lets that guide the energy work, rather than following a fixed script.",
      "Clients often describe her sessions as the first time they've felt fully 'unclenched' in years. She holds a warm, unhurried presence that makes even first-timers feel instantly at ease.",
    ],
    approach:
      "I don't believe healing should feel complicated or performative. My sessions are quiet, unhurried, and built entirely around what your energy needs that day — not a fixed formula.",
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 128,
    sessionsCount: 120,
    languages: ["English", "Hindi", "Marathi"],
    location: "Mumbai, India (Online & In-Person)",
    certifications: [
      "Usui Reiki Master Teacher",
      "Certified Angel Healing Practitioner",
      "Advanced Chakra Therapy, Rishikesh",
    ],
    image: images.expertPriya,
    gallery: [images.saunaInterior, images.treeReflection, images.houseplantsInterior],
    priceFrom: 1499,
    available: true,
    nextAvailable: "Tomorrow, 10:00 AM",
    servicesOffered: [
      {
        serviceSlug: "reiki-healing",
        name: "Reiki Healing",
        duration: "60 min",
        price: 2499,
        description: "A full hands-on energy session to release tension and restore balance.",
      },
      {
        serviceSlug: "angel-healing",
        name: "Angel Healing",
        duration: "60 min",
        price: 2799,
        description: "Guided spiritual healing for clarity, protection, and emotional comfort.",
      },
      {
        serviceSlug: "chakra-balancing",
        name: "Chakra Balancing",
        duration: "45 min",
        price: 1799,
        description: "Align your seven energy centers for whole-body balance.",
      },
    ],
    availability: [
      { day: "Monday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: false },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: false },
      ] },
      { day: "Tuesday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: false }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: true },
      ] },
      { day: "Wednesday", slots: [
        { time: "09:00 AM", available: false }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: false }, { time: "06:30 PM", available: true },
      ] },
      { day: "Thursday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: false },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: true },
      ] },
      { day: "Friday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: false }, { time: "06:30 PM", available: false },
      ] },
      { day: "Saturday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: false }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: true },
      ] },
      { day: "Sunday", slots: [] },
    ],
  },
  {
    slug: "aarav-mehta",
    name: "Aarav Mehta",
    email: "aarav@serenitywellness.com",
    password: "Aarav@123",
    title: "Meditation & Energy Healing Guide",
    specialties: ["Meditation", "Sound Healing", "Reiki Healing"],
    bio: "Aarav blends traditional meditation training with modern energy work to help clients build a lasting sense of calm.",
    longBio: [
      "Aarav spent six years studying meditation and pranayama under teachers in Dharamshala before turning his attention to sound and energy healing. He believes stillness is a skill — one that can be taught, practiced, and rebuilt even in the busiest lives.",
      "His sessions are known for their structure and warmth: clear guidance for beginners, real depth for experienced practitioners, and always a moment at the end to reflect on what came up. Many of his regular clients started with a single sound healing session and now maintain an ongoing weekly practice with him.",
      "Aarav also trains corporate teams in workplace mindfulness, but says one-on-one healing work remains the most meaningful part of what he does.",
    ],
    approach:
      "Calm isn't something I hand you — it's something we build together, one session at a time, until it becomes part of how you move through the world.",
    experienceYears: 6,
    rating: 4.8,
    reviewCount: 96,
    sessionsCount: 100,
    languages: ["English", "Hindi", "Gujarati"],
    location: "Pune, India (Online & In-Person)",
    certifications: [
      "500-Hour Certified Meditation Teacher",
      "Usui Reiki Practitioner",
      "Sound Healing Certification, Dharamshala",
    ],
    image: images.expertAarav,
    gallery: [images.forestSunbeams, images.bridgeForest, images.mountainRange],
    priceFrom: 1199,
    available: true,
    nextAvailable: "Today, 6:30 PM",
    servicesOffered: [
      {
        serviceSlug: "meditation",
        name: "Meditation",
        duration: "60 min",
        price: 1999,
        description: "A guided one-on-one practice built around your specific needs.",
      },
      {
        serviceSlug: "sound-healing",
        name: "Sound Healing",
        duration: "45 min",
        price: 1699,
        description: "Immersive resonant sound work to quiet the mind and body.",
      },
      {
        serviceSlug: "reiki-healing",
        name: "Reiki Healing",
        duration: "60 min",
        price: 2299,
        description: "Gentle hands-on energy work to release tension and restore flow.",
      },
    ],
    availability: [
      { day: "Monday", slots: [
        { time: "09:00 AM", available: false }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: true },
      ] },
      { day: "Tuesday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: false },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: false }, { time: "06:30 PM", available: true },
      ] },
      { day: "Wednesday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: false },
      ] },
      { day: "Thursday", slots: [
        { time: "09:00 AM", available: false }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: false }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: true },
      ] },
      { day: "Friday", slots: [
        { time: "09:00 AM", available: true }, { time: "10:30 AM", available: true },
        { time: "12:00 PM", available: true }, { time: "04:00 PM", available: true }, { time: "06:30 PM", available: true },
      ] },
      { day: "Saturday", slots: [] },
      { day: "Sunday", slots: [
        { time: "10:30 AM", available: true }, { time: "12:00 PM", available: true }, { time: "04:00 PM", available: true },
      ] },
    ],
  },
];

export function getExpertBySlug(slug: string) {
  return experts.find((e) => e.slug === slug);
}
