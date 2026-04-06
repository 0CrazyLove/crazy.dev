import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SiDotnet, SiPostgresql,
  SiTypescript, SiReact, SiAstro, SiTailwindcss, SiDocker, SiGithubactions
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';
import { FiServer, FiLayers, FiCheckCircle, FiTool, FiChevronDown } from 'react-icons/fi';
import {
  FaServer, FaCubes, FaCodeBranch, FaSitemap, FaCheckDouble,
  FaVial, FaCode, FaExchangeAlt, FaClock, FaDatabase, FaLayerGroup
} from 'react-icons/fa';

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

const skillCategories = [
  {
    title: "Core Backend",
    icon: FiServer,
    skills: [
      { name: "C#", icon: TbBrandCSharp },
      { name: ".NET 10", icon: SiDotnet },
      { name: "ASP.NET Core", icon: SiDotnet },
      { name: "Entity Framework Core", icon: FaDatabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "SQL Server", icon: DiMsqlServer }
    ]
  },
  {
    title: "Architecture & Patterns",
    icon: FiLayers,
    skills: [
      { name: "Clean Architecture", icon: FaCubes },
      { name: "N-Tier Architecture", icon: FaLayerGroup },
      { name: "Domain-Driven Design", icon: FaSitemap },
      { name: "CQRS", icon: FaExchangeAlt },
      { name: "MediatR", icon: FaCodeBranch },
      { name: "REST APIs", icon: FaServer },
      { name: "SOLID", icon: FaCode }
    ]
  },
  {
    title: "Testing & Reliability",
    icon: FiCheckCircle,
    skills: [
      { name: "Unit Testing", icon: FaVial },
      { name: "xUnit", icon: FaCheckDouble },
      { name: "Moq", icon: FaCode },
      { name: "FluentAssertions", icon: FaCheckDouble },
      { name: "TimeAbstractions", icon: FaClock }
    ]
  },
  {
    title: "Frontend & Tooling",
    icon: FiTool,
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Astro", icon: SiAstro },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Docker", icon: SiDocker },
      { name: "GitHub Actions", icon: SiGithubactions }
    ]
  }
];

const skillVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25 }
  }
};

function MobileAccordionCategory({ category }: { category: typeof skillCategories[number] }) {
  const [isOpen, setIsOpen] = useState(false);
  const CategoryIcon = category.icon;

  return (
    <div className="border-b border-card/30 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 text-left active:bg-card/10 transition-colors duration-150"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <CategoryIcon className="w-4 h-4 text-muted/70" />
          <span className="text-sm font-semibold text-muted uppercase tracking-widest">{category.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="w-5 h-5 text-muted/50" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pb-4 px-1">
              {category.skills.map((skill) => {
                const SkillIcon = skill.icon;
                return (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-card/10 text-light/80 cursor-default"
                  >
                    {SkillIcon && <SkillIcon className="w-4 h-4 text-muted/60" />}
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TechnicalSkills() {
  const isMobile = useIsMobile();

  return (
    <motion.section
      className="py-12 border-t border-card/50"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-light mb-10">Technical Skills</h2>

      {isMobile ? (
        /* Mobile: Accordion */
        <div className="rounded-xl border border-card/20 bg-card/5 overflow-hidden">
          {skillCategories.map((category) => (
            <MobileAccordionCategory key={category.title} category={category} />
          ))}
        </div>
      ) : (
        /* Desktop: Original expanded layout */
        <div className="space-y-0 divide-y divide-card/30">
          {skillCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={category.title}
                className="group py-7 first:pt-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <div className="flex items-center gap-2.5 sm:w-52 shrink-0">
                    <CategoryIcon className="w-4 h-4 text-muted/60 group-hover:text-muted transition-colors duration-300" />
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-widest">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <motion.span
                          key={skill.name}
                          variants={skillVariants}
                          className="inline-flex items-center gap-2 px-3.5 py-2 text-sm rounded-lg bg-card/10 text-light/80 hover:bg-card/25 hover:text-light transition-colors duration-300 cursor-default"
                        >
                          {SkillIcon && <SkillIcon className="w-4 h-4 text-muted/60" />}
                          {skill.name}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}