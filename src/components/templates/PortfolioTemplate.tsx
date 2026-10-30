import { AboutSection } from "@/components/organisms/AboutSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { HeroSection } from "@/components/organisms/HeroSection";
import { Navbar } from "@/components/organisms/Navbar";
import { ProjectsSection } from "@/components/organisms/ProjectsSection";
import { TechnologySection } from "@/components/organisms/TechnologySection";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { CvFile, Project, TechnologyGroup } from "@/types/content";
import { MotionProvider } from "./MotionProvider";
import { RevealObserver } from "./RevealObserver";

export interface PortfolioContent {
  locale: Locale;
  dictionary: Dictionary;
  site: {
    name: string;
    shortName: string;
    githubUrl: string;
    githubUsername: string;
    email: string;
  };
  projects: readonly Project[];
  technologyGroups: readonly TechnologyGroup[];
  cvFiles: readonly CvFile[];
}

/** Composición de la página: recibe todo el contenido ya resuelto y solo lo distribuye. */
export function PortfolioTemplate({
  locale,
  dictionary: t,
  site,
  projects,
  technologyGroups,
  cvFiles,
}: PortfolioContent) {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="bg-aurora text-midnight-navy fixed top-3 left-3 z-[60] -translate-y-24 rounded-full px-5 py-3 font-semibold transition-transform focus-visible:translate-y-0"
      >
        {t.a11y.skipToContent}
      </a>
      <Navbar
        locale={locale}
        brandName={site.shortName}
        githubUrl={site.githubUrl}
        nav={t.nav}
        a11y={t.a11y}
      />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <HeroSection
          locale={locale}
          githubUrl={site.githubUrl}
          hero={t.hero}
          a11y={t.a11y}
        />
        <ProjectsSection
          locale={locale}
          projects={projects}
          labels={t.projects}
          newTabHint={t.a11y.opensInNewTab}
        />
        <AboutSection about={t.about} />
        <TechnologySection
          locale={locale}
          groups={technologyGroups}
          labels={t.technologies}
        />
        <ContactSection
          email={site.email}
          githubUrl={site.githubUrl}
          githubUsername={site.githubUsername}
          cvFiles={cvFiles}
          contact={t.contact}
          newTabHint={t.a11y.opensInNewTab}
        />
      </main>
      <Footer
        name={site.name}
        githubUrl={site.githubUrl}
        email={site.email}
        footer={t.footer}
        a11y={t.a11y}
        githubLabel={t.nav.github}
      />
      <RevealObserver />
    </MotionProvider>
  );
}
