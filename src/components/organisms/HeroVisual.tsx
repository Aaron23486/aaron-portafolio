"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { BrowserFrame } from "@/components/molecules/BrowserFrame";
import type { Locale } from "@/i18n/config";
import type { Screenshot } from "@/types/content";

export interface HeroVisualProps {
  locale: Locale;
  shots: { label: string; shot: Screenshot }[];
  tags: readonly string[];
  label: string;
}

const spring = { stiffness: 80, damping: 20, mass: 0.6 };

/**
 * Composición en profundidad con capturas reales. Reacciona muy levemente al cursor
 * solo con puntero fino y sin preferencia de movimiento reducido.
 */
export function HeroVisual({ locale, shots, tags, label }: HeroVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, spring);
  const y = useSpring(py, spring);

  const backX = useTransform(x, (v) => v * -10);
  const backY = useTransform(y, (v) => v * -8);
  const midX = useTransform(x, (v) => v * 6);
  const midY = useTransform(y, (v) => v * 5);
  const frontX = useTransform(x, (v) => v * 16);
  const frontY = useTransform(y, (v) => v * 12);
  const tilt = useTransform(x, (v) => v * 3);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const interactive = finePointer && !reduceMotion;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    py.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  const [back, mid, front] = shots;

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto aspect-[5/4] w-full max-w-[640px] [perspective:1400px] lg:aspect-[6/5]"
    >
      {back ? (
        <motion.div
          style={{ x: backX, y: backY }}
          className="absolute top-[9%] left-0 w-[64%] max-sm:hidden"
        >
          <div className="relative [transform:rotateY(14deg)_rotateX(4deg)]">
            <BrowserFrame
              shot={back.shot}
              locale={locale}
              label={back.label}
              sizes="(min-width: 1024px) 360px, 60vw"
            />
            {/* Oscurece la capa del fondo para dar profundidad sin bajar el contraste del texto con `opacity`. */}
            <div
              aria-hidden="true"
              className="bg-midnight-navy/30 pointer-events-none absolute inset-0 rounded-2xl"
            />
          </div>
        </motion.div>
      ) : null}

      {mid ? (
        <motion.div
          style={{ x: midX, y: midY, rotateY: tilt }}
          className="absolute top-[14%] right-0 w-[84%] sm:top-[22%] sm:w-[78%]"
        >
          <div className="animate-float">
            <div className="aurora-border [transform:rotateY(-10deg)_rotateX(5deg)] rounded-2xl shadow-[0_40px_120px_-30px_rgb(139_108_255/0.55)]">
              <BrowserFrame
                shot={mid.shot}
                locale={locale}
                label={mid.label}
                sizes="(min-width: 1024px) 500px, 80vw"
                priority
              />
            </div>
          </div>
        </motion.div>
      ) : null}

      {front ? (
        <motion.div
          style={{ x: frontX, y: frontY }}
          className="absolute bottom-[2%] left-[6%] w-[52%] sm:bottom-[4%]"
        >
          <div className="[transform:rotateY(-6deg)_rotateX(6deg)]">
            <BrowserFrame
              shot={front.shot}
              locale={locale}
              label={front.label}
              sizes="(min-width: 1024px) 330px, 50vw"
              className="shadow-[0_30px_80px_-20px_rgb(79_209_255/0.45)]"
            />
          </div>
        </motion.div>
      ) : null}

      {/* Paneles de cristal decorativos con las etapas del trabajo. */}
      <ul
        aria-hidden="true"
        className="absolute top-0 right-0 flex max-w-[46%] flex-wrap justify-end gap-2 max-sm:hidden"
      >
        {tags.map((tag, index) => (
          <li
            key={tag}
            style={{
              animationDelay: `${index * 0.8}s`,
            }}
            className="glass-panel animate-float text-ink-secondary rounded-lg px-3 py-1.5 font-mono text-[0.7rem] tracking-wide"
          >
            <span className="text-aurora-cyan mr-1.5">›</span>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
