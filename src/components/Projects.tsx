import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiStar, FiLayers, FiUser, FiX, FiInfo, FiCode, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../data/projects';

/* ─── Section Header ─── */
const SectionHeader = () => (
  <motion.div
    className="text-center mb-10"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
  >
    <motion.span
      className="inline-block text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Portfolio
    </motion.span>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
      Featured Projects
    </h2>
    <p className="text-base sm:text-lg max-w-xl mx-auto text-muted-foreground leading-relaxed">
      A curated collection of SaaS platforms, AI tools, and full-stack applications I've built.
    </p>
  </motion.div>
);

/* ─── Project Card ─── */
const ProjectCard: React.FC<{
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
    className="group relative rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
    onClick={onClick}
  >
    {/* Gradient border effect on hover */}
    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-teal-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-emerald-500/20 transition-all duration-500 pointer-events-none" />

    <div className="relative rounded-2xl bg-card dark:bg-card backdrop-blur-sm border border-border/60 group-hover:border-teal-500/20 dark:group-hover:border-teal-400/20 p-6 sm:p-7 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/[0.04]">
      {/* Top Row: Title + Featured Badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
          {project.title}
        </h3>
        {project.featured && (
          <span className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20">
            <FiStar size={11} className="text-amber-500" />
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Featured</span>
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-secondary/70 dark:bg-secondary/50 text-muted-foreground border border-border/40"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-secondary/70 dark:bg-secondary/50 text-muted-foreground border border-border/40">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/40">
        <motion.button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground bg-secondary/60 dark:bg-secondary/40 hover:bg-teal-50/60 dark:hover:bg-teal-500/[0.08] border border-border/50 hover:border-teal-500/30 dark:hover:border-teal-400/20 transition-all duration-300"
          whileTap={{ scale: 0.97 }}
        >
          <FiInfo size={14} />
          Details
        </motion.button>

        <div className="flex items-center gap-1.5 ml-auto">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/60 dark:hover:bg-teal-500/[0.08] transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Live demo for ${project.title}`}
            >
              <FiExternalLink size={15} />
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/60 dark:hover:bg-teal-500/[0.08] transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`GitHub repository for ${project.title}`}
            >
              <FiGithub size={15} />
            </motion.a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Project Modal ─── */
const ProjectModal: React.FC<{
  project: (typeof projects)[0];
  onClose: () => void;
}> = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="fixed inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl bg-card border border-border/60"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex justify-between items-center px-6 sm:px-8 py-5 backdrop-blur-xl bg-card/90 border-b border-border/40">
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground truncate">{project.title}</h3>
          {project.featured && (
            <span className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20">
              <FiStar size={11} className="text-amber-500" />
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Featured</span>
            </span>
          )}
        </div>
        <motion.button
          onClick={onClose}
          className="flex-shrink-0 p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Close details"
        >
          <FiX size={20} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="px-6 sm:px-8 py-6 space-y-6">
        {/* Role */}
        {project.role && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-50/50 dark:bg-teal-500/[0.06] border border-teal-200/40 dark:border-teal-500/15">
            <FiUser className="text-teal-600 dark:text-teal-400 flex-shrink-0" size={16} />
            <span className="text-sm font-semibold text-foreground">{project.role}</span>
          </div>
        )}

        {/* Overview */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <FiInfo size={14} />
            Overview
          </h4>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Features */}
        {project.features && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <FiLayers size={14} />
              Key Features
            </h4>
            <div className="grid gap-2">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl bg-secondary/40 dark:bg-secondary/30 border border-border/30"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2 bg-teal-500 dark:bg-teal-400 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <FiCode size={14} />
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/60 dark:bg-secondary/40 text-foreground border border-border/40"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-3">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 shadow-md shadow-teal-500/15 hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiExternalLink size={15} />
              Visit Live
              <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground bg-secondary/60 dark:bg-secondary/40 border border-border/60 hover:border-teal-500/30 dark:hover:border-teal-400/20 hover:bg-teal-50/40 dark:hover:bg-teal-500/[0.06] transition-all duration-300"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiGithub size={15} />
              Source Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Main Projects Section ─── */
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selectedProjectData = selectedProject ? projects.find((p) => String(p.id) === selectedProject) : null;

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 bg-background relative">
      {/* Subtle top/bottom gradient fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(String(project.id))}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProjectData && (
          <ProjectModal project={selectedProjectData} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
