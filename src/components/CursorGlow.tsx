import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let last = 0;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const now = Date.now();
      if (now - last > 1800 && Math.random() > 0.7) {
        last = now;
        const id = now;
        setHearts((h) => [...h, { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 3000);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="cursor-glow hidden md:block" style={{ left: pos.x, top: pos.y }} />
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none text-[var(--ink)] text-lg z-50"
          style={{
            left: h.x,
            top: h.y,
            animation: "heart-rise 3s ease-out forwards",
          }}
        >
          ♥
        </div>
      ))}
    </>
  );
}
