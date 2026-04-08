import { motion } from 'motion/react';
import { FiMail, FiLinkedin } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

export default function Hero() {
  return (
    <motion.section
      className="flex flex-col gap-3 sm:gap-4 py-6 sm:py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="space-y-4">
        <motion.p
          className="text-muted text-xl font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm
        </motion.p>
        <motion.h1
          className="text-5xl sm:text-7xl font-extrabold tracking-tight text-light flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          Crazy
          <img src="/crazy.dev/heart.svg" alt="heart" className="w-[0.85em] h-[0.85em]" />
        </motion.h1>
        <motion.h2
          className="text-2xl sm:text-4xl font-semibold text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Backend Web Developer
        </motion.h2>
      </div>

      <motion.div
        className="mt-4 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <a
          href="https://github.com/0Crazy-0"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-light text-dark font-semibold rounded-lg hover:scale-105 transition-transform"
        >
          <FaGithub className="text-2xl" />
          GitHub
        </a>
        <a
          href="mailto:0crazy.dev@gmail.com"
          className="flex items-center gap-2 px-6 py-3 border border-muted text-light font-semibold rounded-lg hover:bg-card hover:border-light transition-all"
        >
          <FiMail className="text-2xl" />
          Contact Me
        </a>
        <a
          href="https://www.linkedin.com/in/crazydev"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 border border-muted text-light font-semibold rounded-lg hover:bg-card hover:border-light transition-all"
        >
          <FiLinkedin className="text-2xl" />
          LinkedIn
        </a>
      </motion.div>
    </motion.section>
  );
}
