import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./social-icons";
import { Logo } from "./logo";
import { SITE, FOOTER_LINKS } from "@/lib/site";
import { NewsletterForm } from "./newsletter-form";

export default function Footer() {
  return (
    <footer className="border-t border-plum/10 bg-cream/60">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="font-serif-display text-xl italic text-plum-soft">{SITE.tagline}</p>
            <p className="max-w-xs text-sm leading-relaxed text-plum-soft">{SITE.description}</p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE.social.instagram}
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-plum/15 text-plum-soft transition-colors hover:border-plum hover:text-plum-900"
              >
                <InstagramIcon className="size-4.5" />
              </a>
              <a
                href={SITE.social.facebook}
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-plum/15 text-plum-soft transition-colors hover:border-plum hover:text-plum-900"
              >
                <FacebookIcon className="size-4.5" />
              </a>
              <a
                href={SITE.social.youtube}
                aria-label="YouTube"
                className="flex size-10 items-center justify-center rounded-full border border-plum/15 text-plum-soft transition-colors hover:border-plum hover:text-plum-900"
              >
                <YoutubeIcon className="size-4.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-plum-900">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-plum-soft hover:text-plum-900 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-plum-900">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.support.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-plum-soft hover:text-plum-900 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-plum-900">
              Stay connected to your wellbeing
            </h3>
            <p className="mb-4 text-sm text-plum-soft">
              Gentle reminders, new practices, and seasonal rituals — no more than twice a month.
            </p>
            <NewsletterForm />
            <p className="mt-4 text-xs text-plum-soft/80">{SITE.contact.email}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-plum/10 pt-8 text-xs text-plum-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.fullName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-plum-900">Terms</Link>
            <Link href="/privacy" className="hover:text-plum-900">Privacy</Link>
            <Link href="/faqs" className="hover:text-plum-900">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
