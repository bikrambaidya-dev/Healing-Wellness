import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

const steps = [
  { number: "01", title: "Explore", description: "Discover healing practices and experts that match your needs." },
  { number: "02", title: "Choose", description: "View expert profiles, experience, services, reviews, and pricing." },
  { number: "03", title: "Book", description: "Select your preferred date and available time." },
  { number: "04", title: "Begin", description: "Attend your session and start your journey." },
];

export function HowItWorks() {
  return (
    <section className="bg-cream/60 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Simple & Guided"
          title="Your Healing Journey, Simplified"
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-plum/15 to-transparent lg:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center px-4">
              <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-plum/15 bg-ivory font-serif-display text-lg text-plum-900 shadow-sm">
                {step.number}
              </div>
              <h3 className="mt-5 font-serif-display text-xl text-plum-900">{step.title}</h3>
              <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-plum-soft">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
