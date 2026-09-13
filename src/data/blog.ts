import { BlogPost } from "@/lib/types";
import { images } from "@/lib/images";

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-reiki",
    title: "Understanding Reiki: What Actually Happens in a Session",
    category: "Reiki",
    excerpt:
      "Reiki is one of the most requested — and most misunderstood — healing practices. Here's what a session really involves, and why so many people return to it.",
    image: images.healingHands,
    date: "2026-02-18",
    readingTime: 6,
    tags: ["reiki", "energy healing", "beginners"],
    author: { name: "Priya Sharma", role: "Reiki & Angel Healing Practitioner", image: images.expertPriya },
    content: [
      {
        heading: "What is Reiki, really?",
        body: [
          "Reiki is a Japanese energy-healing technique developed in the early 1900s by Mikao Usui. The word combines 'rei' (universal) and 'ki' (life energy) — the idea being that a subtle life force flows through all living things, and that this energy can become blocked or depleted by stress, illness, or emotional strain.",
          "A Reiki practitioner is trained to channel this energy through light touch, typically with hands resting gently on or just above the body. It's not a religious practice, and it doesn't require any particular belief system to receive — most people describe it simply as deeply relaxing.",
        ],
      },
      {
        heading: "Inside a typical session",
        body: [
          "You'll stay fully clothed, lying down or seated comfortably. Your practitioner will usually ask a few questions beforehand — what's been on your mind, where you're holding tension, what you're hoping to feel afterward. This isn't small talk; it shapes where the session focuses.",
          "During the session itself, most clients describe warmth, subtle tingling, or a wave-like sense of release moving through the body. It's common to feel emotional, sleepy, or unexpectedly clear-headed afterward. There's no 'wrong' way to experience it.",
        ],
      },
      {
        heading: "What Reiki can support",
        body: [
          "Clients most often come to Reiki for stress relief, emotional processing, and general restoration during demanding seasons of life. It pairs well with therapy and medical care — it's a complement, not a replacement, for either.",
          "If you're new to energy work, Reiki is one of the gentlest entry points. There's very little to 'do' — your only job is to receive.",
        ],
      },
    ],
  },
  {
    slug: "finding-the-right-crystal",
    title: "Finding the Right Crystal: A Beginner's Guide to Intentions",
    category: "Crystals",
    excerpt:
      "With hundreds of crystals to choose from, it's easy to feel overwhelmed. Here's a simple way to choose based on what you actually need right now.",
    image: images.treeReflection,
    date: "2026-02-05",
    readingTime: 5,
    tags: ["crystals", "beginners", "intention setting"],
    author: { name: "Priya Sharma", role: "Reiki & Angel Healing Practitioner", image: images.expertPriya },
    content: [
      {
        heading: "Start with a feeling, not a shopping list",
        body: [
          "The most common mistake beginners make is trying to memorize dozens of crystal properties before choosing anything. Instead, start with a single question: what do I need more of right now? Calm? Confidence? Clarity? Protection?",
          "From there, a small handful of crystals will usually cover most needs — Amethyst for calm and clarity, Rose Quartz for emotional healing, Citrine for confidence and motivation, and Black Tourmaline for grounding and protection.",
        ],
      },
      {
        heading: "How to actually use a crystal",
        body: [
          "Crystals work best as a tactile anchor for intention — something you hold during a moment of stress, keep on your desk as a visual reminder, or place by your bed to support sleep. Some people meditate with a crystal in hand; others simply carry one in a pocket.",
          "There's no strict ritual required. Consistency matters more than ceremony — a crystal you actually see and touch daily will do far more than one left in a drawer.",
        ],
      },
      {
        heading: "Caring for your crystals",
        body: [
          "Most crystals benefit from occasional cleansing — running water, moonlight, or a light pass through smoke — to keep their energy feeling 'fresh' to you. Softer stones like Rose Quartz should avoid harsh sunlight, which can fade their color over time.",
        ],
      },
    ],
  },
  {
    slug: "5-minutes-of-daily-meditation",
    title: "5 Minutes of Daily Meditation: A Realistic Place to Start",
    category: "Meditation",
    excerpt:
      "You don't need an hour or a silent retreat. Here's a five-minute practice you can actually stick with — and why consistency beats duration.",
    image: images.yogaSunsetSilhouette,
    date: "2026-01-22",
    readingTime: 4,
    tags: ["meditation", "mindfulness", "habits"],
    author: { name: "Aarav Mehta", role: "Meditation & Energy Healing Guide", image: images.expertAarav },
    content: [
      {
        heading: "Why five minutes works better than sixty",
        body: [
          "Most people quit meditation not because it doesn't work, but because they set an unsustainable bar. A daily five-minute practice you'll actually keep beats a weekly hour you keep skipping. Consistency is what rewires the nervous system over time — not duration.",
        ],
      },
      {
        heading: "The practice",
        body: [
          "Sit comfortably and set a timer for five minutes. Close your eyes and take three slow breaths, extending the exhale longer than the inhale. For the remaining time, simply notice your breath without changing it — when your mind wanders (it will), gently return attention to the breath, without judgment.",
          "That return — noticing you've drifted, and coming back — is the entire practice. It's not a failure; it's the rep.",
        ],
      },
      {
        heading: "Making it stick",
        body: [
          "Anchor it to an existing habit — right after you brush your teeth, or before you open your laptop. Within two to three weeks, most people notice they default to calmer reactions during stressful moments, even outside the practice itself.",
        ],
      },
    ],
  },
  {
    slug: "what-is-angel-healing",
    title: "What Is Angel Healing? A Gentle Introduction",
    category: "Angel Healing",
    excerpt:
      "Angel Healing blends guided meditation with energy work to offer comfort during transitions. Here's what to expect from your first session.",
    image: images.armsOpenSunrise,
    date: "2026-01-10",
    readingTime: 5,
    tags: ["angel healing", "spiritual wellness", "beginners"],
    author: { name: "Priya Sharma", role: "Reiki & Angel Healing Practitioner", image: images.expertPriya },
    content: [
      {
        heading: "A practice rooted in comfort",
        body: [
          "Angel Healing is a guided spiritual practice that combines meditation, gentle energy work, and intention-setting to help you feel supported, protected, and less alone — especially during grief, big transitions, or seasons of fear and doubt.",
          "You don't need a specific religious background to receive it. Most clients describe it less as a belief system and more as permission to feel held during a hard moment.",
        ],
      },
      {
        heading: "What a session feels like",
        body: [
          "Sessions typically begin with a short conversation about what's weighing on you, followed by guided visualization and light energy work. Many clients describe a physical sense of warmth or lightness, and often leave with a clearer sense of what they need to release.",
        ],
      },
    ],
  },
  {
    slug: "beginners-guide-to-chakras",
    title: "A Beginner's Guide to the Seven Chakras",
    category: "Chakras",
    excerpt:
      "From root to crown, here's a simple map of the body's seven energy centers — and what it means when one feels out of balance.",
    image: images.galaxyNebula,
    date: "2025-12-14",
    readingTime: 7,
    tags: ["chakras", "energy healing", "beginners"],
    author: { name: "Priya Sharma", role: "Reiki & Angel Healing Practitioner", image: images.expertPriya },
    content: [
      {
        heading: "The seven centers, briefly",
        body: [
          "Root (security and stability), Sacral (creativity and emotion), Solar Plexus (confidence), Heart (love and connection), Throat (expression), Third Eye (intuition), and Crown (spiritual connection). Each is associated with a region of the body and a set of emotional themes.",
        ],
      },
      {
        heading: "Noticing an imbalance",
        body: [
          "An 'imbalance' often shows up as a familiar emotional pattern — chronic self-doubt (solar plexus), difficulty speaking up (throat), or trouble feeling safe even when nothing is objectively wrong (root). You don't need special sensitivity to notice these; most people already recognize the pattern once it's named.",
        ],
      },
      {
        heading: "Simple ways to start",
        body: [
          "A Chakra Balancing session with a practitioner is the most direct starting point, but daily practices help too — grounding walks for the root chakra, journaling for the throat chakra, or simply pairing a relevant crystal with a few minutes of quiet intention each day.",
        ],
      },
    ],
  },
  {
    slug: "building-a-spiritual-wellness-routine",
    title: "Building a Spiritual Wellness Routine That Actually Fits Your Life",
    category: "Spiritual Wellness",
    excerpt:
      "You don't need an hour of ritual every morning. Here's how to build a spiritual practice around a real, busy schedule.",
    image: images.saunaInterior,
    date: "2025-11-30",
    readingTime: 6,
    tags: ["spiritual wellness", "routine", "habits"],
    author: { name: "Aarav Mehta", role: "Meditation & Energy Healing Guide", image: images.expertAarav },
    content: [
      {
        heading: "Start smaller than feels meaningful",
        body: [
          "Most spiritual routines fail not from lack of sincerity, but from being designed for a life you don't actually have. A sustainable routine is boring by design — small enough that skipping it feels harder than doing it.",
        ],
      },
      {
        heading: "A simple weekly structure",
        body: [
          "Consider one grounding practice daily (a few minutes of breathwork or a crystal touchpoint), one deeper practice weekly (a guided meditation or healing session), and one reflective practice monthly (journaling on what's shifted). This rhythm builds depth without demanding constant effort.",
        ],
      },
    ],
  },
  {
    slug: "mindfulness-for-busy-professionals",
    title: "Mindfulness for Busy Professionals: Small Resets That Actually Work",
    category: "Mindfulness",
    excerpt:
      "You don't need a retreat to reset your nervous system. Here are three micro-practices that fit inside an ordinary workday.",
    image: images.bridgeForest,
    date: "2025-11-08",
    readingTime: 5,
    tags: ["mindfulness", "workplace", "stress relief"],
    author: { name: "Aarav Mehta", role: "Meditation & Energy Healing Guide", image: images.expertAarav },
    content: [
      {
        heading: "The two-minute reset",
        body: [
          "Between meetings, try box breathing: inhale for four counts, hold for four, exhale for four, hold for four. Repeat for two minutes. It's discreet enough to do at your desk and effective enough to notice within a single cycle.",
        ],
      },
      {
        heading: "The transition ritual",
        body: [
          "Create a short physical cue that marks the end of the workday — even something as simple as closing your laptop and taking three deliberate breaths before standing up. This helps your nervous system register the shift, rather than carrying office tension straight into your evening.",
        ],
      },
      {
        heading: "When to go deeper",
        body: [
          "If these resets feel like they're not enough, that's often a sign to book a full session rather than push harder on micro-practices alone. A guided Meditation or Sound Healing session can recalibrate a nervous system that's been running hot for weeks.",
        ],
      },
    ],
  },
  {
    slug: "sound-healing-explained",
    title: "Sound Healing, Explained: Why Vibration Helps You Relax",
    category: "Meditation",
    excerpt:
      "Sound healing looks simple from the outside — but the effect on the nervous system is well worth understanding before your first session.",
    image: images.forestSunbeams,
    date: "2025-10-19",
    readingTime: 5,
    tags: ["sound healing", "meditation", "nervous system"],
    author: { name: "Aarav Mehta", role: "Meditation & Energy Healing Guide", image: images.expertAarav },
    content: [
      {
        heading: "The nervous system loves rhythm",
        body: [
          "Slow, resonant sound — like that of singing bowls — naturally encourages slower breathing and a drop in heart rate, nudging the body from a 'fight or flight' state toward rest. This is part of why sound healing can feel effective even for people who find silent meditation difficult.",
        ],
      },
      {
        heading: "What to expect physically",
        body: [
          "Many clients feel a subtle vibration in the chest or stomach during a session, along with a heaviness in the limbs as the body relaxes. It's common to lose track of time entirely — a sign the nervous system has settled into a deeply restful state.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
