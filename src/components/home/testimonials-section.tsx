import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client Experiences"
          title="Real Experiences. Real Transformations."
          align="center"
          className="mx-auto"
        />
        <div className="mt-12">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </Container>
    </section>
  );
}
