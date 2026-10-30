import { ArrowDown, Check } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/atoms/Button";
import { GithubIcon } from "@/components/atoms/GithubIcon";
import { Eyebrow, GradientHeading, Lead } from "@/components/atoms/Typography";
import { heroShots } from "@/data/hero";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { AmbientBackdrop, LightCurve, Mountains } from "./AmbientBackdrop";
import { HeroVisual } from "./HeroVisual";

export interface HeroSectionProps {
  locale: Locale;
  githubUrl: string;
  hero: Dictionary["hero"];
  a11y: Dictionary["a11y"];
}

const enterDelay = (ms: number) =>
  ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export function HeroSection({
  locale,
  githubUrl,
  hero,
  a11y,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate overflow-hidden pt-[calc(var(--header-height)+2.5rem)] pb-28 sm:pb-36 lg:min-h-[100svh] lg:pt-[calc(var(--header-height)+4rem)]"
    >
      <AmbientBackdrop />
      <LightCurve
        id="hero-curve-top"
        flip
        className="top-2 opacity-50 max-md:hidden"
      />
      <LightCurve id="hero-curve" className="top-[38%] opacity-80" />
      <Mountains id="hero-mountains" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <div className="hero-enter" style={enterDelay(0)}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <div className="hero-enter-soft">
            <GradientHeading
              as="h1"
              id="home-title"
              lead={hero.titleLead}
              highlight={hero.titleHighlight}
            />
          </div>
          <div className="hero-enter-soft max-w-xl">
            <Lead>{hero.intro}</Lead>
          </div>
          <div
            className="hero-enter flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={enterDelay(360)}
          >
            <Button href="#projects" size="lg">
              {hero.ctaProjects}
              <ArrowDown
                aria-hidden="true"
                className="size-5 transition-transform duration-300 group-hover/button:translate-y-0.5"
              />
            </Button>
            <Button
              href={githubUrl}
              newTabHint={a11y.opensInNewTab}
              variant="outline"
              size="lg"
            >
              <GithubIcon className="size-5" />
              {hero.ctaGithub}
            </Button>
          </div>
          <ul
            className="hero-enter text-sage-gray mt-2 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6"
            style={enterDelay(480)}
          >
            {hero.highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="text-seafoam size-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-enter" style={enterDelay(300)}>
          <HeroVisual
            locale={locale}
            shots={heroShots}
            tags={hero.visualTags}
            label={a11y.decorative}
          />
        </div>
      </div>
    </section>
  );
}
