import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-22T00:00:00").getTime();

export function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const items = [
    { v: t.d, l: "Dias" },
    { v: t.h, l: "Horas" },
    { v: t.m, l: "Minutos" },
    { v: t.s, l: "Segundos" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {items.map((it) => (
        <div key={it.l} className="glass-card rounded-xl px-5 py-6 md:px-8 md:py-8 min-w-[90px] md:min-w-[120px] text-center">
          <div className="text-4xl md:text-6xl font-display text-gradient-gold animate-shimmer tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground">
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}
