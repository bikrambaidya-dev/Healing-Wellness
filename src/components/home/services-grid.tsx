import Image from "next/image";
import Link from "next/link";
import { Hand, Sparkles, CircleDot, CircleDashed, Gem, Waves, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

const icons = { Hand, Sparkles, CircleDot, CircleDashed, Gem, Waves };

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Healing Practices"
          title="Explore Healing & Wellness"
          subtitle="Discover practices designed to support your mind, energy, and inner wellbeing."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Link
                key={service.slug}
                href={`/healing/${service.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-plum/10 bg-ivory shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-plum-900/10 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum-900/70 via-plum-900/5 to-transparent" />
                  <div className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-full bg-ivory/90 text-plum-900 shadow-sm backdrop-blur-sm">
                    {Icon && <Icon className="size-5" strokeWidth={1.6} />}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-sage-dark">
                    {service.tagline}
                  </span>
                  <h3 className="font-serif-display text-2xl text-plum-900">{service.name}</h3>
                  <p className="text-sm leading-relaxed text-plum-soft">{service.shortDescription}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum-900">
                    Explore
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
