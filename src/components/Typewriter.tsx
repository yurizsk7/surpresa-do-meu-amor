import { useEffect, useState } from "react";

export function Typewriter({ text, speed = 45, className = "", onDone }: { text: string; speed?: number; className?: string; onDone?: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
  }, [text]);
  useEffect(() => {
    if (i >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setI((x) => x + 1), speed);
    return () => clearTimeout(t);
  }, [i, text, speed, onDone]);
  return (
    <span className={className}>
      {text.slice(0, i)}
      <span className="inline-block w-[2px] h-[0.9em] align-middle bg-gold ml-1 animate-pulse" />
    </span>
  );
}
