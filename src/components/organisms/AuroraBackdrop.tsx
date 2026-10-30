import { DecorativeGlow } from "@/components/atoms/DecorativeGlow";
import { cn } from "@/lib/cn";

/** Cortinas de aurora: bandas de gradiente cónico que derivan lentamente. Solo decoración. */
export function AuroraBackdrop({
  className,
  intensity = "full",
}: {
  className?: string;
  intensity?: "full" | "soft";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "animate-aurora-drift absolute -top-1/3 -left-1/4 h-[85%] w-[90%] rounded-[50%] bg-[conic-gradient(from_200deg_at_60%_40%,transparent_0deg,rgb(79_209_255/0.35)_60deg,rgb(139_108_255/0.4)_120deg,transparent_200deg)] blur-3xl max-md:blur-2xl",
          intensity === "soft" ? "opacity-40" : "opacity-80",
        )}
      />
      <div
        className={cn(
          "animate-aurora-drift-slow absolute -top-1/4 -right-1/4 h-[80%] w-[75%] rounded-[50%] bg-[conic-gradient(from_20deg_at_40%_50%,transparent_0deg,rgb(214_107_255/0.32)_70deg,rgb(139_108_255/0.3)_140deg,transparent_220deg)] blur-3xl max-md:hidden",
          intensity === "soft" ? "opacity-30" : "opacity-70",
        )}
      />
      <DecorativeGlow
        color="cyan"
        className="top-[18%] left-[8%] size-72 opacity-50"
      />
      <DecorativeGlow
        color="magenta"
        className="right-[6%] bottom-[12%] size-96 opacity-40 max-md:hidden"
      />
    </div>
  );
}

/** Siluetas de montañas en el horizonte, con luz de aurora en la cresta. */
export function Mountains({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 260"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full sm:h-56",
        className,
      )}
    >
      <defs>
        <linearGradient id={`${id}-light`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4fd1ff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#8b6cff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d66bff" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0f1f33" />
          <stop offset="1" stopColor="#08111f" />
        </linearGradient>
      </defs>
      <path
        d="M0 170 L120 120 L220 150 L340 80 L470 140 L560 110 L690 160 L820 90 L940 140 L1060 70 L1190 130 L1300 100 L1440 140 L1440 260 L0 260 Z"
        fill="#0b1729"
        opacity="0.8"
      />
      <path
        d="M0 200 L140 150 L260 185 L380 130 L520 190 L640 150 L760 200 L900 140 L1030 190 L1150 150 L1290 195 L1440 160 L1440 260 L0 260 Z"
        fill={`url(#${id}-fill)`}
      />
      <path
        d="M0 200 L140 150 L260 185 L380 130 L520 190 L640 150 L760 200 L900 140 L1030 190 L1150 150 L1290 195 L1440 160"
        fill="none"
        stroke={`url(#${id}-light)`}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Trazo de luz curvo que cruza una sección; la luz recorre la curva despacio. */
export function LightCurve({
  id,
  className,
  flip = false,
}: {
  id: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-56 w-full",
        flip && "-scale-x-100",
        className,
      )}
    >
      <defs>
        <linearGradient id={`${id}-curve`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4fd1ff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#4fd1ff" stopOpacity="0.7" />
          <stop offset="0.7" stopColor="#8b6cff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#d66bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M-20 260 C 320 120, 620 300, 900 170 S 1300 40, 1460 90"
        fill="none"
        stroke={`url(#${id}-curve)`}
        strokeWidth="1.5"
      />
      <path
        d="M-20 260 C 320 120, 620 300, 900 170 S 1300 40, 1460 90"
        fill="none"
        stroke="#eaf4ff"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="90 1110"
        className="animate-light-flow"
      />
    </svg>
  );
}

/** Onda de transición entre secciones. */
export function WaveDivider({
  id,
  className,
  flip = false,
}: {
  id: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none block h-16 w-full sm:h-24",
        flip && "rotate-180",
        className,
      )}
    >
      <defs>
        <linearGradient id={`${id}-wave`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4fd1ff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#8b6cff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#d66bff" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M0 70 C 240 10, 480 120, 720 64 S 1200 0, 1440 50 L1440 120 L0 120 Z"
        fill="#0b1729"
        fillOpacity="0.75"
      />
      <path
        d="M0 70 C 240 10, 480 120, 720 64 S 1200 0, 1440 50"
        fill="none"
        stroke={`url(#${id}-wave)`}
        strokeWidth="1.5"
      />
    </svg>
  );
}
