"use client";

import { Download, Menu, X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BrandMark } from "@/components/atoms/BrandMark";
import { Button } from "@/components/atoms/Button";
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { NavigationItem } from "@/components/molecules/NavigationItem";
import { SocialLink } from "@/components/molecules/SocialLink";
import { sections } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import type { CvFile } from "@/types/content";

export interface NavbarProps {
  locale: Locale;
  brandName: string;
  githubUrl: string;
  /** CV del idioma activo; si el PDF no existe no se muestra el botón. */
  cv?: CvFile;
  cvFormat: string;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
}

const sectionIds = sections.map((section) => section.id);

export function Navbar({
  locale,
  brandName,
  githubUrl,
  cv,
  cvFormat,
  nav,
  a11y,
}: NavbarProps) {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menú móvil: Escape cierra y devuelve el foco; el foco entra al primer enlace al abrir.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) closeMenu(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeMenu]);

  const switcher = (
    <LanguageSwitcher
      current={locale}
      label={a11y.languageSwitcher}
      switchTemplate={a11y.switchLanguage}
      currentTemplate={a11y.currentLanguage}
    />
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-border-subtle bg-midnight-navy/75 border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-(--header-height) max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="rounded-xl">
          <BrandMark name={brandName} />
        </a>

        <nav aria-label={a11y.mainNavigation} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <NavigationItem
                  href={`#${section.id}`}
                  label={nav[section.label]}
                  active={active === section.id}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {switcher}
          <SocialLink
            kind="github"
            href={githubUrl}
            label={nav.github}
            newTabHint={a11y.opensInNewTab}
          />
          {cv ? (
            <Button
              href={cv.href}
              download
              hrefLang={cv.locale}
              variant="outline"
              size="md"
            >
              <Download aria-hidden="true" className="size-4" />
              {nav.downloadCv}
              <span className="sr-only">({cvFormat})</span>
            </Button>
          ) : null}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="border-border-subtle bg-deep-space/70 text-mist-white grid size-11 place-items-center rounded-xl border lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? a11y.closeMenu : a11y.openMenu}
          onClick={() => (open ? closeMenu(false) : setOpen(true))}
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={menuRef}
            id={menuId}
            key="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-border-subtle bg-midnight-navy/95 border-t px-4 pt-4 pb-6 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label={a11y.mainNavigation}>
              <ul className="flex flex-col gap-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <NavigationItem
                      variant="menu"
                      href={`#${section.id}`}
                      label={nav[section.label]}
                      active={active === section.id}
                      onNavigate={() => closeMenu(false)}
                    />
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-border-subtle mt-5 flex items-center justify-between gap-3 border-t pt-5">
              {switcher}
              <SocialLink
                kind="github"
                href={githubUrl}
                label={nav.github}
                newTabHint={a11y.opensInNewTab}
                showLabel
                className="px-3"
              />
            </div>
            {cv ? (
              <Button
                href={cv.href}
                download
                hrefLang={cv.locale}
                className="mt-4 w-full"
              >
                <Download aria-hidden="true" className="size-4" />
                {nav.downloadCv}
                <span className="sr-only">({cvFormat})</span>
              </Button>
            ) : null}
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
