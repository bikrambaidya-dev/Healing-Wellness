import { HealingService } from "@/lib/types";
import { images } from "@/lib/images";

export const services: HealingService[] = [
  {
    slug: "reiki-healing",
    name: "Reiki Healing",
    tagline: "Energy • Balance • Relaxation",
    keywords: ["reiki", "energy healing", "hands-on healing"],
    shortDescription:
      "A gentle, hands-on energy practice that clears blockages and restores natural balance.",
    description:
      "Reiki is a Japanese energy-healing technique built on the idea that a life force flows through all of us. During a session, your practitioner uses light touch to channel calming energy through the body, easing tension, encouraging emotional release, and supporting the body's own capacity to heal. Sessions are fully clothed, quiet, and deeply restorative.",
    image: images.healingHands,
    icon: "Hand",
    benefits: [
      "Releases stored tension and stress",
      "Supports emotional balance and clarity",
      "Encourages deep, restorative relaxation",
      "Complements medical and therapeutic care",
    ],
    durations: [
      { label: "Focused Session", minutes: 30, priceFrom: 1499 },
      { label: "Full Session", minutes: 60, priceFrom: 2499 },
      { label: "Deep Restoration", minutes: 90, priceFrom: 3499 },
    ],
    priceFrom: 1499,
    color: "sage",
  },
  {
    slug: "angel-healing",
    name: "Angel Healing",
    tagline: "Guidance • Protection • Positive Energy",
    keywords: ["angel healing", "spiritual guidance", "protection energy"],
    shortDescription:
      "A guided spiritual practice inviting clarity, protection, and gentle emotional healing.",
    description:
      "Angel Healing draws on guided meditation and energy work to help you feel supported, protected, and aligned with your higher intentions. Your practitioner creates a calm, sacred space to help release fear and self-doubt, replacing it with clarity, comfort, and quiet confidence — especially supportive during transitions or emotionally heavy seasons.",
    image: images.armsOpenSunrise,
    icon: "Sparkles",
    benefits: [
      "Brings emotional comfort during transitions",
      "Encourages a sense of protection and safety",
      "Helps release fear, doubt, and grief",
      "Deepens spiritual connection and trust",
    ],
    durations: [
      { label: "Guided Session", minutes: 45, priceFrom: 1999 },
      { label: "Full Session", minutes: 60, priceFrom: 2799 },
    ],
    priceFrom: 1999,
    color: "lavender",
  },
  {
    slug: "meditation",
    name: "Meditation",
    tagline: "Mindfulness • Calm • Clarity",
    keywords: ["meditation", "mindfulness", "guided meditation"],
    shortDescription:
      "Guided mindfulness practices to quiet the mind and reconnect with the present moment.",
    description:
      "Meditation sessions are guided one-on-one to meet you exactly where you are — whether you're brand new to stillness or deepening an existing practice. Through breathwork, visualization, and mindful awareness, you'll build tools to manage stress, sharpen focus, and return to a calmer baseline in daily life.",
    image: images.yogaSunsetSilhouette,
    icon: "CircleDot",
    benefits: [
      "Reduces stress and anxious thinking",
      "Improves focus and mental clarity",
      "Builds a sustainable daily practice",
      "Supports better sleep and emotional regulation",
    ],
    durations: [
      { label: "Guided Session", minutes: 30, priceFrom: 1199 },
      { label: "Deep Practice", minutes: 60, priceFrom: 1999 },
    ],
    priceFrom: 1199,
    color: "sand",
  },
  {
    slug: "chakra-balancing",
    name: "Chakra Balancing",
    tagline: "Energy • Alignment • Balance",
    keywords: ["chakra balancing", "energy alignment", "chakra healing"],
    shortDescription:
      "A restorative practice to align your body's seven energy centers for whole-body balance.",
    description:
      "Chakra Balancing works to identify and clear blockages across your body's seven energy centers, from root to crown. Using guided breathwork, gentle touch, and intention-setting, this session helps restore the free flow of energy — often leaving clients feeling lighter, more grounded, and more emotionally even.",
    image: images.galaxyNebula,
    icon: "CircleDashed",
    benefits: [
      "Restores energetic balance across the body",
      "Reduces feelings of being stuck or blocked",
      "Grounds and stabilizes the nervous system",
      "Pairs beautifully with crystal healing",
    ],
    durations: [
      { label: "Focused Session", minutes: 45, priceFrom: 1799 },
      { label: "Full Alignment", minutes: 75, priceFrom: 2999 },
    ],
    priceFrom: 1799,
    color: "lavender",
  },
  {
    slug: "crystal-healing",
    name: "Crystal Healing",
    tagline: "Energy • Intention • Harmony",
    keywords: ["crystal healing", "crystal therapy", "gemstone healing"],
    shortDescription:
      "Curated crystals placed with intention to support energetic harmony and focus.",
    description:
      "Crystal Healing sessions use carefully chosen stones — placed on and around the body — to support specific intentions, from grounding and protection to clarity and calm. Your practitioner will guide the session around what you need most right now, often pairing it with breathwork or gentle meditation.",
    image: images.treeReflection,
    icon: "Gem",
    benefits: [
      "Supports specific intentions and goals",
      "Deepens relaxation and focus",
      "Introduces you to crystals suited to your energy",
      "A gentle entry point to energy work",
    ],
    durations: [
      { label: "Focused Session", minutes: 30, priceFrom: 1399 },
      { label: "Full Session", minutes: 60, priceFrom: 2299 },
    ],
    priceFrom: 1399,
    color: "blush",
  },
  {
    slug: "sound-healing",
    name: "Sound Healing",
    tagline: "Vibration • Relaxation • Peace",
    keywords: ["sound healing", "sound bath", "vibrational therapy"],
    shortDescription:
      "Immersive sound and vibration work to quiet the mind and release deep tension.",
    description:
      "Sound Healing uses resonant tones — from singing bowls to layered ambient vibration — to guide your nervous system into a deeply restful state. Many clients describe it as meditation made effortless: the sound does the work of quieting the mind, while the body settles into stillness.",
    image: images.forestSunbeams,
    icon: "Waves",
    benefits: [
      "Calms the nervous system quickly",
      "Supports deep, meditative rest",
      "Helps release tension without effort",
      "A gentle option for meditation beginners",
    ],
    durations: [
      { label: "Sound Bath", minutes: 45, priceFrom: 1699 },
      { label: "Full Immersion", minutes: 60, priceFrom: 2399 },
    ],
    priceFrom: 1699,
    color: "sage",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
