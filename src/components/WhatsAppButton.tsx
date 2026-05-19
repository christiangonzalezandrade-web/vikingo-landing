"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("message"))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-[#20bd5a] md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
