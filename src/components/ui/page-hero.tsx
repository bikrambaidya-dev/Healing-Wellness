import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs: Crumb[];
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-plum/10">
      {image && (
        <>
          <div className="absolute inset-0">
            <Image src={image} alt={imageAlt ?? ""} fill sizes="100vw" className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-plum-900/85 via-plum-900/55 to-plum-900/35" />
        </>
      )}
      <Container className={image ? "relative py-20 md:py-28" : "py-14 md:py-20"}>
        <Breadcrumbs items={breadcrumbs} light={Boolean(image)} />
        <div className="mt-5 flex flex-col gap-4">
          {eyebrow && <Eyebrow className={image ? "text-ivory/80" : undefined}>{eyebrow}</Eyebrow>}
          <h1
            className={`font-serif-display text-4xl leading-[1.1] text-balance sm:text-5xl md:text-[3.25rem] ${
              image ? "text-ivory" : "text-plum-900"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className={`max-w-xl text-base leading-relaxed md:text-lg ${image ? "text-ivory/85" : "text-plum-soft"}`}>
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
