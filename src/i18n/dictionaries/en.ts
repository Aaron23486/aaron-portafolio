import type { Dictionary } from "./es";

const en: Dictionary = {
  meta: {
    title: "Aarón Gutiérrez Morales — Software Developer",
    description:
      "Portfolio of Aarón Gutiérrez Morales, software developer: real business applications with their screenshots, technologies and public GitHub repositories.",
    ogImageAlt: "Portfolio of Aarón Gutiérrez Morales, software developer",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNavigation: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitcher: "Site language",
    switchLanguage: "View the site in {language}",
    currentLanguage: "Current language: {language}",
    opensInNewTab: "(opens in a new tab)",
    backToTop: "Back to top",
    decorative: "Composition with real screenshots of the projects",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    technologies: "Technologies",
    contact: "Contact",
    github: "GitHub",
    downloadCv: "Download CV",
  },
  hero: {
    eyebrow: "Software developer",
    titleLead: "I build digital solutions that solve",
    titleHighlight: "real problems.",
    intro:
      "I'm Aarón Gutiérrez Morales. I build business applications and software solutions focused on streamlining processes, meeting real needs and improving the user experience.",
    ctaProjects: "Explore projects",
    ctaGithub: "View GitHub",
    highlights: [
      "4 public applications on GitHub",
      "Systems Engineering student",
      "3+ years of hands-on experience",
    ],
    visualTags: ["Analysis", "Code", "Testing", "Delivery"],
  },
  projects: {
    eyebrow: "Featured projects",
    titleLead: "Real applications for",
    titleHighlight: "real needs.",
    description:
      "Four complete applications, with their code, documentation and tests published on GitHub. Screenshots show fictitious data.",
    viewRepository: "View repository",
    repositoryOf: "View repository of {name} on GitHub",
    technologiesLabel: "{name} technologies",
    webApp: "Web app",
  },
  about: {
    eyebrow: "About me",
    titleLead: "From operational processes to",
    titleHighlight: "software people use.",
    paragraphs: [
      "I'm a software developer and a Computer Systems Engineering student. I have over 3 years of hands-on experience building business applications and automations that turn manual processes into digital, traceable and measurable operations.",
      "I combine functional analysis, development, data management and operational knowledge: I gather requirements, model processes, define business rules and turn them into tested, documented applications.",
      "I build AI into the way I work: I specify with SDD, validate with TDD and orchestrate specialized agents to explore, implement and review. I also automate processes with n8n and connect AI models to tools and data through MCP.",
      "I'm especially interested in cybersecurity and good practices: access control, server-side validation and databases that enforce their own rules.",
    ],
    facts: [
      { value: "3+", label: "years of hands-on experience" },
      {
        value: "60%",
        label: "of Computer Systems Engineering, Universidad Latina",
      },
      { value: "4", label: "public applications on GitHub" },
    ],
    focusTitle: "What I focus on",
    focus: [
      {
        title: "Business applications",
        text: "Solutions aligned with real business needs.",
      },
      {
        title: "Process automation",
        text: "Digital workflows that replace manual controls.",
      },
      {
        title: "Applied AI and agents",
        text: "Agents, MCP and n8n workflows connected to real processes.",
      },
      {
        title: "Specify and test",
        text: "SDD to define before building; TDD to protect what is built.",
      },
      {
        title: "Data and traceability",
        text: "Histories, audit trails and indicators for better decisions.",
      },
      {
        title: "Cybersecurity",
        text: "Defensive practices applied from the design stage.",
      },
    ],
  },
  technologies: {
    eyebrow: "Technologies",
    titleLead: "Tools I",
    titleHighlight: "build with.",
    description:
      "Technologies I have used in real projects and in my professional experience.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Databases and BI",
      ai: "AI and automation",
      tools: "Infrastructure and tools",
      practices: "Security and methods",
    },
  },
  contact: {
    eyebrow: "Contact",
    titleLead: "From code to",
    titleHighlight: "real solutions.",
    description:
      "Looking for a developer for your team? Send me an email or review my code on GitHub.",
    emailLabel: "Email me",
    emailTerm: "Email",
    emailSubject: "Contact from your portfolio",
    copyEmail: "Copy",
    emailCopied: "Copied",
    locationTerm: "Location",
    githubLabel: "GitHub profile",
    cvTitle: "Résumé",
    cvPrimary: "Download English CV",
    cvAlternate: "Descargar CV en español",
    cvFormat: "PDF",
  },
  footer: {
    role: "Software Developer",
    rights: "All rights reserved.",
    builtWith: "Built with Next.js, TypeScript and Tailwind CSS.",
  },
};

export default en;
