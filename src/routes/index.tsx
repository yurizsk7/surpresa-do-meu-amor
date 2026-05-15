import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { StarField } from "@/components/StarField";
import { CursorGlow } from "@/components/CursorGlow";
import { Countdown } from "@/components/Countdown";
import { Typewriter } from "@/components/Typewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O presente do meu amor" },
      { name: "description", content: "Algumas histórias merecem ser eternas." },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&family=Italianno&display=swap",
      } as never,
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=Italianno&display=swap",
      },
    ],
  }),
  component: Page,
});

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${className}`}
    >
      {children}
    </section>
  );
}

function Page() {
  const [started, setStarted] = useState(false);
  const emotionalRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => emotionalRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  return (
    <main className="relative">
      <StarField />
      <CursorGlow />

      {/* aurora overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full blur-3xl animate-aurora"
          style={{ background: "radial-gradient(circle, oklch(0.35 0.18 320 / 0.25), transparent 60%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[70vw] h-[70vw] rounded-full blur-3xl animate-aurora"
          style={{ background: "radial-gradient(circle, oklch(0.4 0.2 15 / 0.2), transparent 60%)", animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <Section className="text-center">
          <p className="text-xs md:text-sm tracking-[0.6em] uppercase text-gold-soft mb-12 animate-fade-up">
            ✦  Para o meu amor  ✦
          </p>
          <h1
            className="font-display text-3xl md:text-6xl lg:text-7xl font-light leading-tight max-w-4xl text-foreground/95 animate-fade-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            Algumas histórias não cabem
            <br />
            <em className="text-gradient-gold not-italic">em um simples presente...</em>
          </h1>
          <p
            className="mt-8 font-display italic text-xl md:text-3xl text-muted-foreground animate-fade-up"
            style={{ animationDelay: "2.2s", animationFillMode: "both" }}
          >
            Elas precisam ser sentidas!!!
          </p>
          <div
            className="mt-16 animate-fade-up"
            style={{ animationDelay: "3.4s", animationFillMode: "both" }}
          >
            <button onClick={handleStart} className="btn-elegant">
              Descobrir
            </button>
          </div>
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-soft/60 text-xs tracking-[0.3em] animate-pulse"
            style={{ animationDuration: "2.5s" }}
          >
            ↓
          </div>
        </Section>

        {started && (
          <>
            <div ref={emotionalRef} />
            {/* EMOTIONAL */}
            <Section>
              <div className="max-w-3xl w-full space-y-12 text-center">
                <Letter delay={0}>Desde que você chegou, tudo ganhou sentido,</Letter>
                <Letter delay={1.2}>Seu sorriso virou meu lugar favorito,</Letter>
                <Letter delay={2.4}>E no seu aniversário…</Letter>
                <Letter delay={3.6}>eu queria te entregar algo especial,</Letter>
                <Letter delay={4.8}>Algo que te fizesse viajar sem sair do lugar!</Letter>
              </div>

              {/* Polaroids */}
              <div className="relative w-full max-w-5xl mt-20 h-[280px] md:h-[340px]">
                {polaroids.map((p, i) => (
                  <div
                    key={i}
                    className="polaroid absolute animate-float-slow"
                    style={{
                      left: p.left,
                      top: p.top,
                      transform: `rotate(${p.rot}deg)`,
                      animationDelay: `${i * 0.7}s`,
                      ["--r" as string]: `${p.rot}deg`,
                    } as React.CSSProperties}
                  >
                    <div className="w-32 h-32 md:w-44 md:h-44 overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={p.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-widest"
                      style={{ fontFamily: "var(--font-script)", color: "#444", fontSize: "1.1rem" }}
                    >
                      {p.caption}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* SUSPENSE */}
            <Section>
              <div className="max-w-2xl text-center space-y-8">
                <Letter delay={0}>Existe um mundo escondido entre páginas…</Letter>
                <Letter delay={1.2}>onde palavras ganham vida,</Letter>
                <Letter delay={2.4}>onde tinta pode carregar sentimentos,</Letter>
                <Letter delay={3.6}>e onde você vai descobrir algo único, em breve…</Letter>
              </div>

              {/* Floating book */}
              <div className="relative mt-20 animate-float-book" style={{ perspective: "1000px" }}>
                <div className="absolute inset-0 blur-3xl rounded-full" style={{ background: "var(--gradient-aurora)", transform: "scale(1.5)" }} />
                <div
                  className="relative w-44 h-60 md:w-56 md:h-72 rounded-sm shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.18 0.08 15), oklch(0.1 0.05 15))",
                    boxShadow:
                      "0 30px 60px oklch(0 0 0 / 0.6), inset 0 0 30px oklch(0.4 0.2 15 / 0.4), 0 0 80px oklch(0.4 0.2 15 / 0.4)",
                    border: "1px solid oklch(0.82 0.12 80 / 0.3)",
                  }}
                >
                  <div className="absolute inset-4 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold/70 text-3xl" style={{ fontFamily: "var(--font-script)" }}>
                      ?
                    </span>
                  </div>
                  <div
                    className="absolute left-0 top-2 bottom-2 w-2"
                    style={{ background: "linear-gradient(90deg, oklch(0.82 0.12 80 / 0.4), transparent)" }}
                  />
                </div>
              </div>
            </Section>

            {/* COUNTDOWN */}
            <Section>
              <p className="font-display italic text-xl md:text-3xl text-center text-foreground/90 mb-12 max-w-2xl">
                Faltam poucos dias pra surpresa chegar até você…
              </p>
              <Countdown />
              <p className="mt-12 text-xs tracking-[0.4em] uppercase text-muted-foreground">
                22 . 05 . 2026
              </p>
            </Section>

            {/* REVEAL */}
            <Reveal />

            {/* FINAL */}
            <Section>
              <div className="max-w-2xl text-center space-y-8">
                <p className="font-display italic text-xl md:text-3xl text-foreground/90 leading-relaxed animate-fade-up">
                  Talvez o tempo atrase as entregas…
                  <br />
                  mas nunca vai atrasar o que eu sinto por você!
                  <br />
                  E cada segundo esperando por isso vale a pena,
                  <br />
                  pois a sua felicidade é a minha!
                </p>
                <div className="pt-12 space-y-3">
                  <p className="text-sm tracking-[0.4em] uppercase text-gold-soft">Com amor,</p>
                  <p
                    className="text-6xl md:text-8xl text-gradient-gold"
                    style={{ fontFamily: "var(--font-script)" }}
                  >
                    Seu futuro...
                    <span className="text-[var(--ink)] ml-2">❤️</span>
                  </p>
                </div>
              </div>
            </Section>
          </>
        )}
      </div>
    </main>
  );
}

function Letter({ children, delay = 0 }: { children: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => setStart(true), delay * 1000);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="font-display text-2xl md:text-4xl text-foreground/90 leading-relaxed min-h-[3em]">
      {start ? <Typewriter text={children} speed={40} /> : <span className="opacity-0">{children}</span>}
    </div>
  );
}

function Reveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase(1);
          setTimeout(() => setPhase(2), 3500);
          setTimeout(() => setPhase(3), 7000);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, oklch(0.04 0.02 15) 30%, oklch(0.02 0.01 15) 100%)" }}
    >
      {phase >= 1 && (
        <p className="font-display italic text-2xl md:text-4xl text-foreground/90 max-w-2xl animate-fade-up">
          Porque algumas histórias merecem ser eternas…
        </p>
      )}
      {phase >= 2 && (
        <h2 className="mt-8 text-5xl md:text-9xl font-display font-semibold tracking-wider text-ink-reveal leading-tight">
          Sangue <br /> de Tinta
        </h2>
      )}
      {phase >= 3 && (
        <p
          className="mt-8 text-lg md:text-2xl text-gold-soft tracking-[0.3em] uppercase animate-fade-up"
        >
          Seu presente está chegando <span className="text-[var(--ink)]">❤️</span>
        </p>
      )}
    </section>
  );
}

const polaroids = [
  { left: "5%", top: "10%", rot: -8, caption: "juntos", image: "/eu-e-meu-amor-2.jpg" },
  { left: "30%", top: "30%", rot: 5, caption: "para", image: "/eu-e-meu-amor-3.jpg" },
  { left: "55%", top: "5%", rot: -4, caption: "sempre", image: "/eu-e-meu-amor-4.jpg" },
  { left: "75%", top: "35%", rot: 8, caption: "meu amor", image: "/eu-e-meu-amor.jpg" },
];
