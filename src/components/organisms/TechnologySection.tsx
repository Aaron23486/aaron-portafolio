import {
  Database,
  Layers,
  MonitorSmartphone,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { TechnologyBadgeList } from "@/components/molecules/TechnologyBadgeList";
import { localize, type Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { TechnologyGroup, TechnologyGroupId } from "@/types/content";

const groupIcons: Record<TechnologyGroupId, LucideIcon> = {
  frontend: MonitorSmartphone,
  backend: Server,
  data: Database,
  tools: Wrench,
  practices: Layers,
};

export interface TechnologySectionProps {
  locale: Locale;
  groups: readonly TechnologyGroup[];
  labels: Dictionary["technologies"];
}

export function TechnologySection({
  locale,
  groups,
  labels,
}: TechnologySectionProps) {
  return (
    <section
      id="technologies"
      aria-labelledby="technologies-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="technologies-title"
          eyebrow={labels.eyebrow}
          lead={labels.titleLead}
          highlight={labels.titleHighlight}
          description={labels.description}
          align="center"
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {groups.map((group, index) => {
            const Icon = groupIcons[group.id];
            const name = labels.groups[group.id];
            return (
              <li
                key={group.id}
                data-reveal
                style={
                  {
                    "--reveal-delay": `${(index % 3) * 100}ms`,
                  } as CSSProperties
                }
                // Tres tarjetas arriba y dos más anchas abajo en escritorio.
                className={`group/tech glass-panel hover:border-electric-violet/50 relative overflow-hidden rounded-(--radius-card) p-6 transition-[border-color,box-shadow,transform] duration-500 hover:shadow-[0_20px_60px_-30px_rgb(139_108_255/0.9)] motion-safe:hover:-translate-y-1 ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              >
                <div
                  aria-hidden="true"
                  className="bg-aurora absolute inset-x-6 top-0 h-px opacity-40 transition-opacity duration-500 group-hover/tech:opacity-100"
                />
                <h3 className="font-display text-mist-white mb-5 flex items-center gap-3 text-lg font-semibold">
                  <span className="border-border-subtle bg-midnight-navy/70 text-aurora-cyan group-hover/tech:text-soft-magenta grid size-10 place-items-center rounded-xl border transition-colors duration-500">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  {name}
                </h3>
                <TechnologyBadgeList
                  label={name}
                  items={group.items.map((item) => localize(item, locale))}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
