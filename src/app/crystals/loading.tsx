import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          <Skeleton className="hidden h-96 lg:block" />
          <div>
            <Skeleton className="h-11 w-full max-w-md rounded-full" />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
