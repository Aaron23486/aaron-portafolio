/**
 * Diccionario en español. Es la referencia de tipos: el diccionario en inglés
 * debe tener exactamente las mismas claves (`Dictionary`).
 */
const es = {
  meta: {
    title: "Aarón Gutiérrez Morales — Desarrollador de Software",
    description:
      "Portafolio de Aarón Gutiérrez Morales, desarrollador de software: aplicaciones empresariales reales con sus capturas, tecnologías y repositorios públicos en GitHub.",
    ogImageAlt:
      "Aurora Digital — portafolio de Aarón Gutiérrez Morales, desarrollador de software",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
    mainNavigation: "Navegación principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageSwitcher: "Idioma del sitio",
    switchLanguage: "Ver el sitio en {language}",
    currentLanguage: "Idioma actual: {language}",
    opensInNewTab: "(se abre en una pestaña nueva)",
    backToTop: "Volver al inicio",
    decorative: "Composición con capturas reales de los proyectos",
  },
  nav: {
    home: "Inicio",
    projects: "Proyectos",
    about: "Sobre mí",
    technologies: "Tecnologías",
    contact: "Contacto",
    github: "GitHub",
    talk: "Hablemos",
  },
  hero: {
    eyebrow: "Desarrollador de software",
    titleLead: "Construyo soluciones digitales que resuelven",
    titleHighlight: "problemas reales.",
    intro:
      "Soy Aarón Gutiérrez Morales. Desarrollo aplicaciones empresariales y soluciones de software enfocadas en optimizar procesos, resolver necesidades reales y mejorar la experiencia de usuario.",
    ctaProjects: "Explorar proyectos",
    ctaGithub: "Ver GitHub",
    highlights: [
      "4 aplicaciones públicas en GitHub",
      "Ingeniería en Sistemas en curso",
      "Más de 3 años de experiencia práctica",
    ],
    visualTags: ["Análisis", "Código", "Pruebas", "Entrega"],
  },
  projects: {
    eyebrow: "Proyectos destacados",
    titleLead: "Aplicaciones reales para",
    titleHighlight: "necesidades reales.",
    description:
      "Cuatro aplicaciones completas, con su código, documentación y pruebas publicados en GitHub. Las capturas muestran datos ficticios.",
    viewRepository: "Ver repositorio",
    repositoryOf: "Ver repositorio de {name} en GitHub",
    technologiesLabel: "Tecnologías de {name}",
    webApp: "Aplicación web",
  },
  about: {
    eyebrow: "Sobre mí",
    titleLead: "Del proceso operativo a",
    titleHighlight: "software que se usa.",
    paragraphs: [
      "Soy desarrollador de software y estudiante de Ingeniería en Sistemas Computacionales. Tengo más de 3 años de experiencia práctica creando aplicaciones empresariales y automatizaciones que convierten procesos manuales en operaciones digitales, trazables y medibles.",
      "Combino análisis funcional, desarrollo, gestión de datos y conocimiento de la operación: levanto requerimientos, modelo procesos, defino reglas de negocio y las llevo a aplicaciones probadas y documentadas.",
      "Me interesa especialmente la ciberseguridad y las buenas prácticas: control de acceso, validaciones en el servidor y bases de datos que protegen sus propias reglas.",
    ],
    facts: [
      { value: "3+", label: "años de experiencia práctica" },
      {
        value: "60 %",
        label: "de Ingeniería en Sistemas Computacionales, Universidad Latina",
      },
      { value: "4", label: "aplicaciones públicas en GitHub" },
    ],
    focusTitle: "En qué me enfoco",
    focus: [
      {
        title: "Aplicaciones empresariales",
        text: "Soluciones alineadas con las necesidades reales del negocio.",
      },
      {
        title: "Automatización de procesos",
        text: "Flujos digitales que reemplazan controles manuales.",
      },
      {
        title: "Datos y trazabilidad",
        text: "Historiales, auditoría e indicadores para decidir mejor.",
      },
      {
        title: "Ciberseguridad",
        text: "Prácticas defensivas aplicadas desde el diseño.",
      },
    ],
  },
  technologies: {
    eyebrow: "Tecnologías",
    titleLead: "Herramientas con las que",
    titleHighlight: "construyo.",
    description:
      "Tecnologías que he utilizado en proyectos reales y en mi experiencia profesional.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Bases de datos y BI",
      tools: "Herramientas",
      practices: "Arquitectura y buenas prácticas",
    },
  },
  contact: {
    eyebrow: "Contacto",
    titleLead: "Del código a",
    titleHighlight: "soluciones reales.",
    description:
      "¿Buscas un desarrollador para tu equipo? Escríbeme por correo o revisa mi código en GitHub.",
    emailLabel: "Escríbeme",
    emailTerm: "Correo",
    locationTerm: "Ubicación",
    githubLabel: "Perfil de GitHub",
    cvTitle: "Currículum",
    cvPrimary: "Descargar CV en español",
    cvAlternate: "Download English CV",
    cvFormat: "PDF",
  },
  footer: {
    role: "Desarrollador de Software",
    rights: "Todos los derechos reservados.",
    builtWith: "Hecho con Next.js, TypeScript y Tailwind CSS.",
  },
};

export default es;

export type Dictionary = typeof es;
