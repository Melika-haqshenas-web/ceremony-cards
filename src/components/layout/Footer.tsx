"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { RevealText } from "@/components/fx/RevealText";
import { Reveal } from "@/components/fx/Reveal";
import { Eyebrow } from "../fx/Eyebrow";

const EXPLORE = [
  { href: "/cards", key: "cards" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const year = 2026;

  // Hidden inside the full-screen live invitation experience.
  if (pathname.startsWith("/invite/")) return null;

  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--line)] bg-ink-950">
      {/* Oversized wordmark */}
      <div className="mx-auto max-w-[88rem] px-6 pt-24 sm:px-10">
        <p className="mt-4 max-w-sm font-sans text-sm text-bone/50">
          {t("footer.tagline")}
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-[88rem] gap-12 px-6 pb-12 sm:px-10 md:grid-cols-[1.4fr_0.5fr_0.5fr_0.8fr]">
        {/* Newsletter */}
        <div>
          <div className="mt-8">
            <Eyebrow center>{t("footer.newsletterTitle")}</Eyebrow>
          </div>
          <form
            className="mt-5 flex max-w-sm items-center gap-3 border-b border-bone/20 pb-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder={t("footer.newsletterPlaceholder")}
              className="w-full bg-transparent py-1 text-sm text-bone outline-none placeholder:text-bone/40"
            />
            <button
              type="submit"
              className="shrink-0 text-[11px] font-semibold uppercase tracking-widest text-accent transition hover:text-bone"
            >
              {t("footer.subscribe")}
            </button>
          </form>
        </div>

        {/* Explore */}
        <nav className="flex flex-col gap-3">
          <p className="kicker mb-2">{t("footer.explore")}</p>
          {EXPLORE.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="link-underline self-start text-sm uppercase tracking-wider text-bone/70 hover:text-bone"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <nav className="flex flex-col gap-3">
          <p className="kicker mb-2">{t("footer.company")}</p>
          {["Instagram", "Twitter", "Pinterest"].map((s) => (
            <a
              key={s}
              href="#"
              className="link-underline self-start text-sm uppercase tracking-wider text-bone/70 hover:text-bone"
            >
              {s}
            </a>
          ))}
        </nav>

        {/* Contact */}
        <Reveal className="flex flex-col gap-2 md:items-end md:text-right">
          <p className="kicker mb-2">{t("contact.email_label")}</p>
          <a
            href="mailto:hello@meli.cards"
            className="text-sm text-bone/70 hover:text-accent"
            dir="ltr"
          >
            hello@meli.cards
          </a>
          <span className="text-sm text-bone/40" dir="ltr">
            Tehran · Spring St.
          </span>
        </Reveal>
      </div>

      <div className="border-t border-[color:var(--line)]">
        <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-2 px-6 py-6 text-[11px] uppercase tracking-widest text-bone/40 sm:flex-row sm:px-10">
          <p>
            © {year} Meli — {t("footer.rights")}
          </p>
          <p>{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
