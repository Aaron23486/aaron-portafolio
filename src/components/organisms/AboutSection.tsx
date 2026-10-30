import {
  Building2,
  DatabaseZap,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { Dictionary } from "@/i18n";
import { DecorativeGlow } from "@/components/atoms/DecorativeGlow";
import { WaveDivider } from "./AmbientBackdrop";

const focusIcons: readonly LucideIcon[] = [
  Building2,
  Workflow,
  DatabaseZap,
  ShieldCheck,
];

export function AboutSection({ about }: { about: Dictionary["about"] }) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate"
    >
      <WaveDivider id="about-wave-top" />
      <div className="bg-deep-forest relative overflow-hidden py-20 sm:py-28">
        <DecorativeGlow
          color="jade"
          drift
          className="-top-32 right-[-10%] size-[34rem] opacity-60"
        />
        <DecorativeGlow
          color="emerald"
          className="bottom-[-20%] left-[-10%] size-[28rem] opacity-40"
        />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8">
          <div className="flex flex-col gap-8">
            <SectionHeading
              id="about-title"
              eyebrow={about.eyebrow}
              lead={about.titleLead}
              highlight={about.titleHighlight}
            />
            <div
              className="text-sage-gray flex flex-col gap-5 text-base leading-relaxed text-pretty sm:text-lg"
              data-reveal
            >
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="grid gap-4 sm:grid-cols-3" data-reveal>
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="glass-panel flex flex-col-reverse gap-1 rounded-2xl p-5"
                >
                  <dt className="text-sage-gray text-sm leading-snug">
                    {fact.label}
                  </dt>
                  <dd className="text-gradient font-display text-3xl font-semibold">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-5 lg:pt-24">
            <h3
              className="font-display text-pearl-white text-lg font-semibold"
              data-reveal
            >
              {about.focusTitle}
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {about.focus.map((item, index) => {
                const Icon = focusIcons[index % focusIcons.length] ?? Building2;
                return (
                  <li
                    key={item.title}
                    data-reveal
                    style={
                      { "--reveal-delay": `${index * 90}ms` } as CSSProperties
                    }
                    className="group/focus glass-panel hover:border-neo-emerald/40 rounded-2xl p-5 transition-[border-color,transform] duration-500 motion-safe:hover:-translate-y-1"
                  >
                    <Icon
                      aria-hidden="true"
                      className="text-neo-emerald group-hover/focus:text-mint-glow mb-4 size-6 transition-colors duration-500"
                    />
                    <p className="font-display text-pearl-white font-semibold">
                      {item.title}
                    </p>
                    <p className="text-sage-gray mt-1.5 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <WaveDivider id="about-wave-bottom" flip />
    </section>
  );
}
