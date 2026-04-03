import { motion } from 'motion/react';

interface ExperienceItem {
  id: number;
  title: string;
  company?: string;
  period: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "ClinicFlow - Clinical Management System",
    period: "Jan 2026 - Present",
    description: "Architected a multi-role Clinical Management System enforcing strict Clean Architecture and Domain-Driven Design (DDD) principles.",
    features: [
      "Implemented robust CQRS via MediatR and Domain Event Dispatching, creating a highly decoupled and reactive architecture.",
      "Modeled role-aware domain logic and a strike-based penalty system utilizing immutable Record Types and Value Objects for time-based constraints.",
      "Built a comprehensive unit test suite (xUnit, Moq, FluentValidation) covering critical medical business rules."
    ],
    tech: ["C#", ".NET 10", "PostgreSQL", "Clean Architecture", "DDD", "CQRS", "xUnit"],
    github: "https://github.com/0CrazyLove/ClinicFlow"
  },
  {
    id: 2,
    title: "ServiceHub - Service Provision Platform",
    period: "Nov 2025 - Jan 2026",
    description: "Designed a full-stack production-ready platform with a .NET RESTful API and a server-side rendered frontend using Astro and React 19.",
    features: [
      "Engineered backend under a Clean N-Tier Architecture, implementing Repository Pattern, DTOs, AutoMapper, and global middleware for exception handling and health monitoring.",
      "Integrated a hybrid authentication system combining JWT with Refresh Token Rotation and Google OAuth 2.0, enforcing strict identity access policies.",
      "Containerized the full infrastructure using Docker with multi-stage builds and Docker Compose, ensuring consistent deployments across all services."
    ],
    tech: ["C#", ".NET 9", "Astro", "React 19", "Docker", "JWT", "Tailwind CSS"],
    github: "https://github.com/0CrazyLove/ServiceHub"
  }
];

export default function Experience() {
  return (
    <motion.section
      className="py-12 border-t border-card/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-light mb-10">Projects</h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="group relative pl-8 border-l-2 border-card hover:border-muted transition-colors duration-300"
          >
            {/* Timeline Dot */}
            <div className="absolute w-4 h-4 rounded-full bg-dark border-2 border-muted -left-2.25 top-1 group-hover:bg-muted transition-colors duration-300" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
              <h3 className="text-2xl font-semibold text-light">{exp.title}</h3>
              <span className="text-sm font-medium text-muted bg-card px-3 py-1 rounded-full">{exp.period}</span>
            </div>

            {exp.company && (
              <h4 className="text-xl text-muted font-medium mb-4">{exp.company}</h4>
            )}

            <p className="text-lg text-light/80 mb-4">{exp.description}</p>

            <ul className="list-disc list-outside ml-5 space-y-2 text-muted mb-6">
              {exp.features.map((feature, i) => (
                <li key={i} className="pl-1 leading-relaxed">{feature}</li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              <div className="flex flex-wrap gap-2">
                {exp.tech.map(t => (
                  <span key={t} className="text-xs font-semibold px-3 py-1 bg-card text-light rounded-md">
                    {t}
                  </span>
                ))}
              </div>
              <a 
                href={exp.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border border-muted text-light hover:bg-card hover:border-light px-4 py-2 rounded-lg font-medium transition-colors inline-block text-center sm:text-left"
              >
                Code_ GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
