import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/layout/logo";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="grid min-h-[calc(100svh-4.5rem)] grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 font-serif-display text-3xl text-plum-900">Welcome back</h1>
          <p className="mt-2 text-sm text-plum-soft">
            Login to manage your appointments, saved experts, and wishlist.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src={images.healingHands}
          alt="Hands performing gentle healing work"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-plum-900/30" />
        <div className="absolute bottom-12 left-12 right-12 rounded-3xl border border-ivory/20 bg-ivory/10 p-6 text-ivory backdrop-blur-md">
          <p className="font-serif-display text-xl italic">&ldquo;Your journey toward inner peace starts here.&rdquo;</p>
        </div>
      </div>
    </section>
  );
}
