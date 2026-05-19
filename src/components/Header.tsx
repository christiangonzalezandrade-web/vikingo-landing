"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CountrySelector } from "./CountrySelector";
import { ThemeToggle } from "./ThemeToggle";
import { VikingoLogo } from "./VikingoLogo";
import { ScrollLink } from "./ScrollLink";
import { cn } from "@/lib/utils";
import { CONTACT_MAILTO } from "@/lib/config";

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#solutions", label: t("features") },
    { href: "#industries", label: t("industries") },
    { href: "#platform", label: t("platform") },
    { href: "#pricing", label: t("pricing") },
    { href: CONTACT_MAILTO, label: t("contact") },
    { href: "#careers", label: t("careers") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-slate-200/50 py-3 shadow-sm dark:border-slate-800"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8">
        <Link
          href="/"
          className="relative z-20 flex min-w-[10.5rem] shrink-0 items-center py-1"
          aria-label="Vikingo"
        >
          <VikingoLogo size="md" variant="brand" />
        </Link>

        <nav className="hidden items-center justify-center gap-6 xl:flex" aria-label="Main">
          {links.map((link) => (
            <ScrollLink
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-[#0066ff] dark:text-slate-300 dark:hover:text-[#3d8bff]"
            >
              {link.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <CountrySelector />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 xl:hidden dark:hover:bg-white/10"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-slate-200/50 xl:hidden dark:border-slate-800"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <ScrollLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  {link.label}
                </ScrollLink>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
