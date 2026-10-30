import { Mail } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { GithubIcon } from "@/components/atoms/GithubIcon";
import { Eyebrow, GradientHeading, Lead } from "@/components/atoms/Typography";
import { CvDownload } from "@/components/molecules/CvDownload";
import type { Dictionary } from "@/i18n";
import type { CvFile } from "@/types/content";
import { AmbientBackdrop, LightCurve, Mountains } from "./AmbientBackdrop";

export interface ContactSectionProps {
  email: string;
  githubUrl: string;
  githubUsername: string;
  location: string;
  cvFiles: readonly CvFile[];
  contact: Dictionary["contact"];
  newTabHint: string;
}

export function ContactSection({
  email,
  githubUrl,
  githubUsername,
  location,
  cvFiles,
  contact,
  newTabHint,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative px-4 pt-8 pb-24 sm:px-6 lg:px-8"
    >
      <div className="border-border-subtle bg-emerald-surface/60 relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] border px-6 pt-16 pb-48 sm:px-12 sm:pt-20 sm:pb-56 lg:px-16">
        <AmbientBackdrop intensity="soft" />
        <LightCurve id="contact-curve" flip className="top-[42%] opacity-60" />
        <Mountains id="contact-mountains" />

        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="flex flex-col items-start gap-6" data-reveal>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <GradientHeading
              id="contact-title"
              lead={contact.titleLead}
              highlight={contact.titleHighlight}
            />
            <Lead className="max-w-xl">{contact.description}</Lead>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={`mailto:${email}`} size="lg">
                <Mail aria-hidden="true" className="size-5" />
                {contact.emailLabel}
              </Button>
              <Button
                href={githubUrl}
                newTabHint={newTabHint}
                variant="outline"
                size="lg"
              >
                <GithubIcon className="size-5" />
                {contact.githubLabel}
              </Button>
            </div>
            <dl className="grid gap-1 text-sm">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-ink-muted">{contact.emailTerm}</dt>
                <dd>
                  <a
                    href={`mailto:${email}`}
                    className="text-pearl-white break-all underline-offset-4 hover:underline"
                  >
                    {email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-ink-muted">GitHub</dt>
                <dd className="text-pearl-white">@{githubUsername}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-ink-muted">{contact.locationTerm}</dt>
                <dd className="text-pearl-white">{location}</dd>
              </div>
            </dl>
          </div>

          {cvFiles.length > 0 ? (
            <div
              className="glass-panel flex flex-col gap-4 rounded-2xl p-6 sm:p-8"
              data-reveal
            >
              <h3 className="font-display text-pearl-white text-lg font-semibold">
                {contact.cvTitle}
              </h3>
              <CvDownload
                files={cvFiles}
                primaryLabel={contact.cvPrimary}
                alternateLabel={contact.cvAlternate}
                format={contact.cvFormat}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
