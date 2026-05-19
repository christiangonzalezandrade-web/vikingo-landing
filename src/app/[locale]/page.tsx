import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Trust } from "@/components/Trust";
import { Certifications } from "@/components/Certifications";
import { GlobalCoverage } from "@/components/GlobalCoverage";
import { Solutions } from "@/components/Solutions";
import { Industries } from "@/components/Industries";
import { Benefits } from "@/components/Benefits";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Careers } from "@/components/Careers";
import { ContactForm } from "@/components/ContactForm";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";

const LiveDashboard = dynamic(
  () => import("@/components/LiveDashboard").then((m) => ({ default: m.LiveDashboard })),
  {
    loading: () => (
      /** Sin `id="platform"`: evita duplicado con LiveDashboard real al hidratar. */
      <section className="py-24" aria-busy="true" aria-label="Loading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 h-10 max-w-md animate-pulse rounded-lg bg-slate-200/70 dark:bg-slate-700/50" />
          <div className="mx-auto h-[22rem] max-w-5xl animate-pulse rounded-2xl bg-slate-200/40 dark:bg-slate-800/40" />
        </div>
      </section>
    ),
  }
);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteChrome />
      <Header />
      <main>
        <Hero locale={locale as Locale} />
        <Trust />
        <Certifications />
        <GlobalCoverage />
        <Solutions />
        <Industries />
        <LiveDashboard />
        <Benefits />
        <HowItWorks />
        <Pricing />
        <Testimonials locale={locale as Locale} />
        <FAQ />
        <Careers />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
