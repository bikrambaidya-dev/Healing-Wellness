import Link from "next/link";
import { SearchTrigger } from "@/components/search/search-overlay";
import { Container } from "@/components/ui/container";

const quickCategories = [
  { label: "Reiki", href: "/healing/reiki-healing" },
  { label: "Angel Healing", href: "/healing/angel-healing" },
  { label: "Meditation", href: "/healing/meditation" },
  { label: "Chakra", href: "/healing/chakra-balancing" },
  { label: "Crystal Healing", href: "/healing/crystal-healing" },
  { label: "Energy Healing", href: "/healing/sound-healing" },
];

export function DiscoveryBar() {
  return (
    <section className="relative -mt-10 z-20 md:-mt-14">
      <Container>
        <div className="rounded-[2rem] border border-plum/10 bg-ivory/95 p-6 shadow-xl shadow-plum-900/10 backdrop-blur-md md:p-8">
          <h2 className="font-serif-display text-xl text-plum-900 md:text-2xl">
            What are you looking for?
          </h2>
          <div className="mt-5">
            <SearchTrigger variant="bar" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {quickCategories.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="rounded-full border border-plum/15 bg-cream px-4 py-2 text-sm font-medium text-plum-soft transition-all hover:border-sage-dark/40 hover:bg-sage-light/50 hover:text-plum-900"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
