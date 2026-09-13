import { Reel } from "@/lib/types";
import { images } from "@/lib/images";

// Seed reels use freely-available, CC0/sample video files as placeholders —
// verified reachable without auth (the old Google GTV sample bucket now
// 403s on anonymous requests, so don't reuse those URLs).
// Replace with real footage any time from Admin → Reels → Upload.
const sampleVideos = {
  flower: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  friday: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
  sintel: "https://media.w3.org/2010/05/sintel/trailer.mp4",
  bigBuckBunny: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4",
  sample5s: "https://download.samplelib.com/mp4/sample-5s.mp4",
  sample10s: "https://download.samplelib.com/mp4/sample-10s.mp4",
};

export const reels: Reel[] = [
  {
    id: "reel-morning-breathwork",
    title: "5-minute morning breathwork",
    caption:
      "Start your day grounded 🌅 Box breathing to settle the nervous system before the day gets loud. Save this for tomorrow morning.",
    tags: ["breathwork", "morning routine", "calm"],
    authorName: "Priya Sharma",
    authorImage: images.expertPriya,
    expertSlug: "priya-sharma",
    videoUrl: sampleVideos.flower,
    poster: images.heroMeditation,
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
    likes: 428,
    shares: 36,
    views: 5210,
    comments: [
      { id: "c1", author: "Meera", text: "Needed this today, thank you 🙏", createdAt: Date.now() - 1000 * 60 * 60 * 5 },
      { id: "c2", author: "Rohan", text: "Doing this every morning now", createdAt: Date.now() - 1000 * 60 * 60 * 3 },
    ],
  },
  {
    id: "reel-crystal-cleanse",
    title: "How to cleanse your crystals",
    caption:
      "Full moon cleansing 101 ✨ Moonlight, sound, and a little intention is all you need to reset your stones.",
    tags: ["crystals", "cleansing", "full moon"],
    authorName: "Serenity Studio",
    authorImage: images.expertPriya,
    videoUrl: sampleVideos.sintel,
    poster: images.galaxyNebula,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    likes: 812,
    shares: 94,
    views: 12040,
    comments: [
      { id: "c1", author: "Ananya", text: "My amethyst needed this so bad", createdAt: Date.now() - 1000 * 60 * 60 * 20 },
    ],
  },
  {
    id: "reel-sunset-yoga-flow",
    title: "10-minute sunset flow",
    caption: "A gentle flow to unwind the day 🧘‍♀️ No mat, no problem — just you and your breath.",
    tags: ["yoga", "flow", "evening"],
    authorName: "Aarav Mehta",
    authorImage: images.expertAarav,
    expertSlug: "aarav-mehta",
    videoUrl: sampleVideos.bigBuckBunny,
    poster: images.yogaSunsetSilhouette,
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
    likes: 1204,
    shares: 151,
    views: 22300,
    comments: [
      { id: "c1", author: "Vikram", text: "This is my favourite reel on here", createdAt: Date.now() - 1000 * 60 * 60 * 28 },
      { id: "c2", author: "Isha", text: "The sunset 😍 where is this?", createdAt: Date.now() - 1000 * 60 * 60 * 25 },
      { id: "c3", author: "Neha", text: "Followed along, felt amazing", createdAt: Date.now() - 1000 * 60 * 60 * 10 },
    ],
  },
  {
    id: "reel-sound-bath",
    title: "Sound bath for deep rest",
    caption: "Singing bowls to melt the tension out of your shoulders. Put headphones on and press play 🎧",
    tags: ["sound healing", "rest", "meditation"],
    authorName: "Aarav Mehta",
    authorImage: images.expertAarav,
    expertSlug: "aarav-mehta",
    videoUrl: sampleVideos.friday,
    poster: images.forestSunbeams,
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
    likes: 967,
    shares: 62,
    views: 15870,
    comments: [
      { id: "c1", author: "Dev", text: "Fell asleep to this last night, 10/10", createdAt: Date.now() - 1000 * 60 * 60 * 40 },
    ],
  },
  {
    id: "reel-gratitude-practice",
    title: "3-line gratitude journaling",
    caption: "The simplest habit that changed my mornings. Three lines, every day, no pressure ✍️",
    tags: ["gratitude", "journaling", "mindset"],
    authorName: "Priya Sharma",
    authorImage: images.expertPriya,
    expertSlug: "priya-sharma",
    videoUrl: sampleVideos.sample5s,
    poster: images.houseplantsInterior,
    createdAt: Date.now() - 1000 * 60 * 60 * 70,
    likes: 655,
    shares: 48,
    views: 9430,
    comments: [],
  },
  {
    id: "reel-spa-ritual",
    title: "At-home spa ritual",
    caption: "Recreate a spa day without leaving your bathroom 🛁 Warm oil, slow strokes, zero rush.",
    tags: ["self care", "spa", "ritual"],
    authorName: "Serenity Studio",
    authorImage: images.expertAaravAlt,
    videoUrl: sampleVideos.sample10s,
    poster: images.spaOilMassage,
    createdAt: Date.now() - 1000 * 60 * 60 * 96,
    likes: 1532,
    shares: 203,
    views: 30110,
    comments: [
      { id: "c1", author: "Kavya", text: "Trying this tonight!", createdAt: Date.now() - 1000 * 60 * 60 * 80 },
      { id: "c2", author: "Simran", text: "The most relaxing account on here", createdAt: Date.now() - 1000 * 60 * 60 * 60 },
    ],
  },
];
