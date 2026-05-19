"use client";

import { useEffect, useState } from "react";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [end]);
  return (
    <>
      {val.toLocaleString()}
      {suffix}
    </>
  );
}

type Props = {
  machines: string;
  transactions: string;
  uptimeLabel: string;
  countriesLabel: string;
};

export function HeroAnimatedStats({
  machines,
  transactions,
  uptimeLabel,
  countriesLabel,
}: Props) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-base font-bold leading-snug text-[#0066ff] md:text-lg">{machines}</p>
      </div>
      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-base font-bold leading-snug text-[#0066ff] md:text-lg">{transactions}</p>
      </div>
      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-2xl font-bold text-[#0066ff] md:text-3xl">
          99.9%
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{uptimeLabel}</p>
      </div>
      <div className="glass rounded-2xl p-6 text-center">
        <p className="text-2xl font-bold text-[#0066ff] md:text-3xl">
          <AnimatedCounter end={35} />+
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{countriesLabel}</p>
      </div>
    </div>
  );
}
