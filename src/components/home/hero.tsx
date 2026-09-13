import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";

const stats = [
  { value: "2+", label: "Verified Experts" },
  { value: "10+", label: "Healing Practices" },
  { value: "100+", label: "Sessions Held" },
  { value: "4.9/5", label: "Client Experience" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[94svh] w-full">
        <Image
          src={images.armsOpenSunrise}
          alt="A person standing with arms outstretched to a warm golden sunrise, embracing a new beginning"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-900/85 via-plum-900/35 to-plum-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-plum-900/50 via-transparent to-transparent" />

        <div className="relative z-10 flex min-h-[94svh] flex-col justify-end">
          <div className="container-wide pb-14 pt-32 md:pb-20">
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-ivory/25 bg-ivory/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur-sm">
                A calmer way to heal
              </span>
              <h1 className="mt-6 font-serif-display text-4xl leading-[1.08] text-ivory text-balance sm:text-5xl md:text-6xl lg:text-[4.2rem]">
                Find Your Balance.
                <br />
                Begin Your Healing Journey.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85 md:text-lg">
                Connect with trusted healing experts, explore mindful practices, discover
                healing crystals, and create space for a healthier, more balanced life.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/experts" size="lg" showArrow>
                  Book a Healing Session
                </Button>
                <Button href="/healing" size="lg" variant="ghost" showArrow>
                  Explore Healing
                </Button>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 sm:gap-x-10">
                {stats.map((s) => (
                  <div key={s.label} className="border-l border-ivory/25 pl-4">
                    <dt className="font-serif-display text-2xl text-ivory sm:text-3xl">{s.value}</dt>
                    <dd className="mt-1 text-xs text-ivory/70 sm:text-sm">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-6 top-28 z-10 hidden max-w-xs animate-float rounded-3xl border border-ivory/20 bg-ivory/10 p-5 text-ivory shadow-2xl backdrop-blur-md md:right-12 lg:block">
          <p className="font-serif-display text-lg italic leading-snug">
            &ldquo;Your journey toward inner peace starts here.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
