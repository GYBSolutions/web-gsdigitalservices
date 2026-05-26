export type Lang = "en" | "es";

export const translations = {
  en: {
    nav: {
      services: "Services",
      caseStudies: "Case Studies",
      about: "About",
      blog: "Blog",
      bookConsultation: "Book Consultation",
    },
    hero: {
      badge: "Available for new projects",
      heading: "Engineering",
      headingHighlight: "Digital Products",
      headingEnd: "That Scale",
      subtitle:
        "Senior software engineer with 10+ years building iOS apps, scalable backends, and AI-powered systems for startups and enterprises. I turn complex ideas into products people use daily.",
      ctaPrimary: "Book Consultation",
      ctaSecondary: "View Projects",
      openBadge: "Open to new projects",
      stats: {
        years: "Years engineering",
        apps: "Apps shipped",
        users: "Users served",
        uptime: "Uptime delivered",
      },
    },
    trust: {
      marqueeLabel: "Expertise across the full stack",
      achievements: [
        { value: "10+", label: "Years of experience", description: "From UIKit to SwiftUI, from REST to AI" },
        { value: "50+", label: "Projects delivered", description: "iOS apps, SaaS platforms, AI systems" },
        { value: "5", label: "Industries served", description: "FinTech, Health, E-commerce, Logistics, Media" },
        { value: "< 400ms", label: "Avg app load time", description: "Performance is a non-negotiable" },
      ],
    },
    services: {
      eyebrow: "What I Build",
      title: "Full-Spectrum Engineering",
      titleHighlight: "Expertise",
      description:
        "From native iOS apps to AI-powered backends — I bring deep expertise across the entire product development lifecycle, with a focus on architecture that scales.",
      viewAll: "View all services with detailed information",
    },
    projects: {
      eyebrow: "Featured Work",
      title: "Products Built to",
      titleHighlight: "Last",
      description:
        "Selected projects showcasing architecture decisions, technical challenges overcome, and measurable outcomes delivered.",
      viewAll: "View all case studies",
      filterAll: "All",
    },
    process: {
      eyebrow: "How I Work",
      title: "A Process Designed for",
      titleHighlight: "Clarity",
      description:
        "No surprises, no scope creep. A rigorous engineering process that keeps projects on track and delivers software that works as specified.",
      steps: [
        {
          title: "Discovery",
          description:
            "Deep dive into your business goals, user needs, and technical constraints. I ask the hard questions upfront so we build the right thing.",
          duration: "1–2 weeks",
          deliverables: ["Requirements document", "Technical scope", "Risk assessment"],
        },
        {
          title: "Architecture",
          description:
            "Design the system before writing code. Architecture decisions made here determine if the product scales or stalls at growth inflection points.",
          duration: "1 week",
          deliverables: ["Architecture diagram", "Tech stack selection", "ADRs"],
        },
        {
          title: "Design",
          description:
            "UI/UX design with engineering constraints in mind. Every interaction designed for implementation quality — no pixel-perfect mocks that are impossible to build.",
          duration: "1–2 weeks",
          deliverables: ["Design system", "Component specs", "Prototype"],
        },
        {
          title: "Development",
          description:
            "Sprint-based development with continuous delivery to staging. You see real progress every week, not just at the end.",
          duration: "4–12 weeks",
          deliverables: ["Working features", "Test coverage", "Code reviews"],
        },
        {
          title: "QA & Testing",
          description:
            "Systematic quality assurance: unit tests, integration tests, performance profiling, security review, and accessibility audit.",
          duration: "1–2 weeks",
          deliverables: ["Test suite", "Performance benchmarks", "Security report"],
        },
        {
          title: "Deployment",
          description:
            "Production launch with monitoring, alerting, and rollback procedures in place. Zero-downtime deployments with feature flags for risk mitigation.",
          duration: "1 week",
          deliverables: ["Production deploy", "Monitoring setup", "Runbook"],
        },
        {
          title: "Scale",
          description:
            "Post-launch iteration based on real user data. I help you make sense of metrics and prioritize the improvements that move the needle.",
          duration: "Ongoing",
          deliverables: ["Analytics review", "Performance optimizations", "Roadmap"],
        },
      ],
    },
    testimonials: {
      eyebrow: "Client Results",
      title: "What Founders &",
      titleHighlight: "CTOs Say",
      description:
        "Results speak louder than promises. Here's what the people I've built with have to say about the work.",
      stats: [
        { value: "100%", label: "Client satisfaction" },
        { value: "0", label: "Projects abandoned" },
        { value: "5★", label: "Average review" },
      ],
    },
    cta: {
      eyebrow: "Let's build together",
      title: "Ready to Turn Your",
      titleHighlight: "Idea Into Reality?",
      description:
        "Whether you're a founder with an idea, a startup needing a technical partner, or a company modernizing their stack — let's have a conversation.",
      ctaPrimary: "Book a Free Consultation",
      ctaSecondary: "View Case Studies",
      contact: "Or reach out directly at",
      benefits: [
        "Free 45-minute discovery call",
        "No commitment required",
        "Response within 24 hours",
        "Clear proposal & timeline",
      ],
    },
    detail: {
      backToWork: "Back to Case Studies",
      results: "Results",
      problem: "The Problem",
      solution: "The Solution",
      architecture: "Architecture",
      challenges: "Technical Challenges",
      process: "Process",
      techStack: "Tech Stack",
      workTogether: "Work Together",
      buildSimilar: "Build Something Similar",
      allWork: "All Work",
      liveApp: "Live",
      caseStudy: "Case Study",
    },
    caseStudies: {
      badge: "Work",
      title: "Real Products,",
      titleHighlight: "Measurable Results",
      subtitle:
        "Every project tells a technical story. Here's how I approached architecture, solved hard problems, and delivered software that scaled.",
      deepDivesEyebrow: "Deep Dives",
      deepDivesTitle: "Featured Case Studies",
      allProjectsEyebrow: "All Projects",
      allProjectsTitle: "More Work",
    },
  },

  es: {
    nav: {
      services: "Servicios",
      caseStudies: "Casos de Estudio",
      about: "Sobre Mí",
      blog: "Blog",
      bookConsultation: "Reservar Consulta",
    },
    hero: {
      badge: "Disponible para nuevos proyectos",
      heading: "Ingeniería de",
      headingHighlight: "Productos Digitales",
      headingEnd: "que Escalan",
      subtitle:
        "Ingeniero de software senior con más de 10 años construyendo apps iOS, backends escalables y sistemas con IA para startups y empresas. Convierto ideas complejas en productos que la gente usa a diario.",
      ctaPrimary: "Reservar Consulta",
      ctaSecondary: "Ver Proyectos",
      openBadge: "Disponible para nuevos proyectos",
      stats: {
        years: "Años de experiencia",
        apps: "Apps desarrolladas",
        users: "Usuarios atendidos",
        uptime: "Uptime entregado",
      },
    },
    trust: {
      marqueeLabel: "Experiencia en todo el stack",
      achievements: [
        { value: "10+", label: "Años de experiencia", description: "De UIKit a SwiftUI, de REST a IA" },
        { value: "50+", label: "Proyectos entregados", description: "Apps iOS, plataformas SaaS, sistemas IA" },
        { value: "5", label: "Industrias atendidas", description: "FinTech, Salud, E-commerce, Logística, Media" },
        { value: "< 400ms", label: "Tiempo de carga promedio", description: "El rendimiento no es negociable" },
      ],
    },
    services: {
      eyebrow: "Qué Construyo",
      title: "Ingeniería de",
      titleHighlight: "Espectro Completo",
      description:
        "Desde apps iOS nativas hasta backends con IA — aporto experiencia profunda en todo el ciclo de desarrollo de productos, con foco en arquitectura escalable.",
      viewAll: "Ver todos los servicios con información detallada",
    },
    projects: {
      eyebrow: "Trabajo Destacado",
      title: "Productos Construidos para",
      titleHighlight: "Durar",
      description:
        "Proyectos seleccionados que muestran decisiones de arquitectura, desafíos técnicos superados y resultados medibles entregados.",
      viewAll: "Ver todos los casos de estudio",
      filterAll: "Todos",
    },
    process: {
      eyebrow: "Cómo Trabajo",
      title: "Un Proceso Diseñado para la",
      titleHighlight: "Claridad",
      description:
        "Sin sorpresas, sin alcance desbordado. Un proceso de ingeniería riguroso que mantiene los proyectos en curso y entrega software que funciona como se especificó.",
      steps: [
        {
          title: "Descubrimiento",
          description:
            "Análisis profundo de tus objetivos de negocio, necesidades del usuario y restricciones técnicas. Hago las preguntas difíciles desde el principio para que construyamos lo correcto.",
          duration: "1–2 semanas",
          deliverables: ["Documento de requisitos", "Alcance técnico", "Evaluación de riesgos"],
        },
        {
          title: "Arquitectura",
          description:
            "Diseña el sistema antes de escribir código. Las decisiones de arquitectura tomadas aquí determinan si el producto escala o se estanca en los puntos de inflexión de crecimiento.",
          duration: "1 semana",
          deliverables: ["Diagrama de arquitectura", "Selección de stack tecnológico", "ADRs"],
        },
        {
          title: "Diseño",
          description:
            "Diseño UI/UX con restricciones de ingeniería en mente. Cada interacción diseñada para calidad de implementación — sin maquetas pixel-perfect imposibles de construir.",
          duration: "1–2 semanas",
          deliverables: ["Sistema de diseño", "Especificaciones de componentes", "Prototipo"],
        },
        {
          title: "Desarrollo",
          description:
            "Desarrollo basado en sprints con entrega continua a staging. Ves progreso real cada semana, no solo al final.",
          duration: "4–12 semanas",
          deliverables: ["Funcionalidades operativas", "Cobertura de pruebas", "Revisiones de código"],
        },
        {
          title: "QA y Pruebas",
          description:
            "Aseguramiento de calidad sistemático: pruebas unitarias, pruebas de integración, perfilado de rendimiento, revisión de seguridad y auditoría de accesibilidad.",
          duration: "1–2 semanas",
          deliverables: ["Suite de pruebas", "Benchmarks de rendimiento", "Informe de seguridad"],
        },
        {
          title: "Despliegue",
          description:
            "Lanzamiento en producción con monitoreo, alertas y procedimientos de rollback en su lugar. Despliegues sin tiempo de inactividad con feature flags para mitigación de riesgos.",
          duration: "1 semana",
          deliverables: ["Despliegue en producción", "Configuración de monitoreo", "Runbook"],
        },
        {
          title: "Escalado",
          description:
            "Iteración post-lanzamiento basada en datos reales de usuarios. Te ayudo a entender las métricas y priorizar las mejoras que mueven la aguja.",
          duration: "Continuo",
          deliverables: ["Revisión de analíticas", "Optimizaciones de rendimiento", "Hoja de ruta"],
        },
      ],
    },
    testimonials: {
      eyebrow: "Resultados de Clientes",
      title: "Lo que dicen Fundadores",
      titleHighlight: "y CTOs",
      description:
        "Los resultados hablan más alto que las promesas. Esto es lo que dicen las personas con las que he construido sobre el trabajo.",
      stats: [
        { value: "100%", label: "Satisfacción del cliente" },
        { value: "0", label: "Proyectos abandonados" },
        { value: "5★", label: "Valoración promedio" },
      ],
    },
    cta: {
      eyebrow: "Construyamos juntos",
      title: "¿Listo para Convertir tu",
      titleHighlight: "Idea en Realidad?",
      description:
        "Ya seas un fundador con una idea, una startup que necesita un socio técnico, o una empresa modernizando su stack — tengamos una conversación.",
      ctaPrimary: "Reservar Consulta Gratuita",
      ctaSecondary: "Ver Casos de Estudio",
      contact: "O contáctame directamente en",
      benefits: [
        "Llamada de descubrimiento gratuita de 45 min",
        "Sin compromiso requerido",
        "Respuesta en 24 horas",
        "Propuesta y cronograma claros",
      ],
    },
    detail: {
      backToWork: "Volver a Casos de Estudio",
      results: "Resultados",
      problem: "El Problema",
      solution: "La Solución",
      architecture: "Arquitectura",
      challenges: "Desafíos Técnicos",
      process: "Proceso",
      techStack: "Stack Tecnológico",
      workTogether: "Trabajar Juntos",
      buildSimilar: "Construir Algo Similar",
      allWork: "Todo el Trabajo",
      liveApp: "En Vivo",
      caseStudy: "Caso de Estudio",
    },
    caseStudies: {
      badge: "Trabajo",
      title: "Productos Reales,",
      titleHighlight: "Resultados Medibles",
      subtitle:
        "Cada proyecto cuenta una historia técnica. Así es como abordé la arquitectura, resolví problemas complejos y entregué software que escaló.",
      deepDivesEyebrow: "Análisis Profundos",
      deepDivesTitle: "Casos de Estudio Destacados",
      allProjectsEyebrow: "Todos los Proyectos",
      allProjectsTitle: "Más Trabajo",
    },
  },
} as const;
