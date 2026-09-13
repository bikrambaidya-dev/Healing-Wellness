import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Skeleton className="h-11 w-full max-w-md rounded-full" />
        <div className="mt-10 flex flex-col gap-8">
          {[0, 1].map((i) => (
            <div key={i} className="grid grid-cols-1 gap-0 overflow-hidden rounded-[2rem] border border-plum/10 md:grid-cols-[0.85fr_1.15fr]">
              <Skeleton className="h-72 w-full rounded-none" />
              <div className="flex flex-col gap-4 p-9">
                <Skeleton className="h-7 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
