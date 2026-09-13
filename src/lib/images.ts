// Curated, verified Unsplash photography. Each entry has been visually checked
// so its content matches its intended use across the site.
function unsplash(id: string, w = 1600, q = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const images = {
  heroMeditation: unsplash("1506126613408-eca07ce68773"), // silhouette meditating at sunrise, palm trees
  heroMeditationAlt: unsplash("1600618528240-fb9fc964b853"), // same shoot, alternate angle
  healingHands: unsplash("1519823551278-64ac92734fb1"), // hands performing healing work on a back
  armsOpenSunrise: unsplash("1499209974431-9dddcece7f88"), // silhouette, arms outstretched to sunrise
  galaxyNebula: unsplash("1465101162946-4377e57745c3"), // cosmic purple/blue nebula
  treeReflection: unsplash("1518241353330-0f7941c2d9b5"), // golden tree reflected in still water
  yogaSunsetSilhouette: unsplash("1544367567-0f2fcb009e0b"), // yoga pose silhouette at sunset by the sea
  forestSunbeams: unsplash("1523712999610-f77fbcfc3843"), // autumn forest, sunbeams through trees
  saunaInterior: unsplash("1583416750470-965b2707b355"), // warm minimal spa / sauna interior
  bridgeForest: unsplash("1447752875215-b2761acb3c5d"), // wooden bridge leading into forest
  houseplantsInterior: unsplash("1521334884684-d80222895322"), // cozy plant-filled interior
  mountainRange: unsplash("1517021897933-0e0319cfbc28"), // alpine mountain range, wide vista
  cloudsMountainSummit: unsplash("1519834785169-98be25ec3f84"), // person on summit, arms raised above clouds
  spaOilMassage: unsplash("1544161515-4ab6ce6db874"), // oil massage treatment, spa hands

  expertPriya: unsplash("1544005313-94ddf0286df2", 900), // professional woman portrait, warm tone
  expertAarav: unsplash("1500648767791-00dcc994a43e", 900), // professional man portrait, grey sweater

  testimonial1: unsplash("1494790108377-be9c29b29330", 400), // laughing woman
  testimonial2: unsplash("1544725176-7c40e5a71c5e", 400), // smiling woman, turquoise necklace
  testimonial3: unsplash("1524250502761-1ac6f2e30d43", 400), // joyful woman in golden light
  testimonial4: unsplash("1438761681033-6461ffad8d80", 400), // young woman portrait by a lake
  testimonial5: unsplash("1560250097-0b93528c311a", 400), // man with glasses, portrait
  testimonial6: unsplash("1531384441138-2736e62e0919", 400), // man with warm smile, portrait
  testimonial7: unsplash("1573497019940-1c28c88b4f3e", 400), // woman, professional portrait
  expertAaravAlt: unsplash("1507003211169-0a1dd7228f2d", 900), // alternate warm male portrait
} as const;

export type ImageKey = keyof typeof images;
