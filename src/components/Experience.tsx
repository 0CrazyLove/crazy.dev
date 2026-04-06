import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  FaGithub, FaCubes, FaSitemap,
  FaExchangeAlt, FaCheckDouble, FaDatabase, FaShieldAlt
} from 'react-icons/fa';
import {
  SiDotnet, SiPostgresql, SiDocker,
  SiAstro, SiReact, SiTailwindcss
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const techIconMap: Record<string, any> = {
  "C#": TbBrandCSharp,
  ".NET 10": SiDotnet,
  ".NET 9": SiDotnet,
  "PostgreSQL": SiPostgresql,
  "Clean Architecture": FaCubes,
  "DDD": FaSitemap,
  "CQRS": FaExchangeAlt,
  "xUnit": FaCheckDouble,
  "Entity Framework Core": FaDatabase,
  "ASP.NET Core Identity": FaShieldAlt,
  "Docker": SiDocker,
  "Astro": SiAstro,
  "React 19": SiReact,
  "Tailwind CSS": SiTailwindcss,
};

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
    tech: ["C#", ".NET 9", "Entity Framework Core", "ASP.NET Core Identity", "PostgreSQL", "Docker", "Astro", "React 19", "Tailwind CSS"],
    github: "https://github.com/0CrazyLove/ServiceHub"
  }
];

function ExperienceCard({ exp, index, isMobile }: { exp: ExperienceItem; index: number; isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseY = useMotionValue(4);
  const smoothY = useSpring(mouseY, { stiffness: 98, damping: 40 });

  // On mobile: no mouse tracking, static dot position
  const handleMouseMove = isMobile ? undefined : (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    let yPos = e.clientY - rect.top - 8;
    yPos = Math.max(0, Math.min(yPos, rect.height - 16));
    mouseY.set(yPos);
  };

  const handleMouseLeave = isMobile ? undefined : () => {
    mouseY.set(4);
  };

  if (isMobile) {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.4 }}
        className="relative pl-8 border-l-2 border-card"
      >
        {/* Static timeline dot on mobile */}
        <div className="absolute w-4 h-4 rounded-full bg-dark border-2 border-muted -left-2.5 top-1" />

        <div className="flex flex-col mb-2 gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-semibold text-light">{exp.title}</h3>
            <a
              href={exp.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted"
              aria-label="Ver repositorio en GitHub"
              title="Ver repositorio en GitHub"
            >
              <FaGithub className="text-2xl" />
            </a>
          </div>
          <span className="text-sm font-medium text-muted bg-card px-3 py-1 rounded-full whitespace-nowrap w-fit">{exp.period}</span>
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

        <div className="flex flex-wrap gap-2 mt-6">
          {exp.tech.map(t => {
            const Icon = techIconMap[t];
            return (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-card/10 text-muted/90 border border-card/30 cursor-default">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {t}
              </span>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="group relative pl-8 border-l-2 border-card hover:border-muted transition-colors duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Timeline Dot */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-dark border-2 border-muted -left-2.25 group-hover:bg-muted transition-colors duration-300"
        style={{ y: smoothY, top: 0 }}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-semibold text-light">{exp.title}</h3>
          <a
            href={exp.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-light transition-colors"
            aria-label="Ver repositorio en GitHub"
            title="Ver repositorio en GitHub"
          >
            <FaGithub className="text-2xl" />
          </a>
        </div>
        <span className="text-sm font-medium text-muted bg-card px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
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

      <div className="flex flex-wrap gap-2 mt-6">
        {exp.tech.map(t => {
          const Icon = techIconMap[t];
          return (
            <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-card/10 text-muted/90 border border-card/30 hover:bg-card/40 hover:text-light transition-colors duration-300 cursor-default">
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {t}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const isMobile = useIsMobile();

  return (
    <motion.section
      className="py-12 border-t border-card/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-light mb-10">Projects</h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.id} exp={exp} index={index} isMobile={isMobile} />
        ))}
      </div>
    </motion.section>
  );
}