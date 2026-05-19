"use client";

import { CountryGate } from "./CountryGate";
import { WhatsAppButton } from "./WhatsAppButton";
import { CareersButton } from "./CareersButton";

export function SiteChrome() {
  return (
    <>
      <CountryGate />
      <CareersButton />
      <WhatsAppButton />
    </>
  );
}
