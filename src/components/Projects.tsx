import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiStar, FiLayers, FiUser, FiX, FiInfo, FiCode, FiGithub, FiArrowUpRight, FiGrid, FiFilter } from 'react-icons/fi';
import { projects } from '../data/projects';

/* ─── Category Filter ─── */
const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'saas', label: 'SaaS' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'web', label: 'Web Apps' },
];

const getCategory = (project: (typeof projects)[0]): string[] => {
  const tags = project.tags.map(t => t.toLowerCase()).join(' ');
  const desc = project.description.toLowerCase();
  const cats: string[] = [];
  if (tags.includes('ai') || tags.includes('openai') || tags.includes('rag') || tags.includes('langchain') || tags.includes('ml') || tags.includes('machine learning') || tags.includes('tensorflow')) cats.push('ai');
  if (tags.includes('react native') || tags.includes('flutter') || tags.includes('kotlin') || tags.includes('android') || tags.includes('mobile') || desc.includes('mobile app')) cats.push('mobile');
  if (tags.includes('next.js') || tags.includes('react') || tags.includes('web')) cats.push('web');
  if (desc.includes('saas') || desc.includes('platform') || desc.includes('subscription') || desc.includes('billing') || tags.includes('stripe') || tags.includes('polar pay')) cats.push('saas');
  return cats;
};

/* ─── Section Header ─── */
const SectionHeader = () => (
  <motion.div
    className="text-center mb-14"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
  >
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 mb-5"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <FiGrid size={13} className="text-primary" />
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
        Portfolio
      </span>
    </motion.div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
      Featured Projects
    </h2>
    <p className="text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
      A curated collection of SaaS platforms, AI tools, and full-stack applications I've shipped and scaled.
    </p>
  </motion.div>
);

/* ─── Project Card — Featured (Large) ─── */
const FeaturedCard: React.FC<{
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
    className="group relative cursor-pointer col-span-1 md:col-span-2"
    onClick={onClick}
  >
    <div className="relative rounded-2xl bg-card border border-border/60 group-hover:border-primary/25 overflow-hidden transition-all duration-400 group-hover:shadow-xl group-hover:shadow-primary/[0.04]">
      <div className="flex flex-col lg:flex-row">
        {/* Left — Info */}
        <div className="flex-1 p-7 sm:p-8 lg:p-10 flex flex-col">
          {/* Badges Row */}
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20">
              <FiStar size={11} className="text-amber-500" />
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">Featured</span>
            </span>
            {project.role && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/8 dark:bg-primary/10 border border-primary/15 dark:border-primary/20">
                <FiUser size={11} className="text-primary" />
                <span className="text-[11px] font-semibold text-primary">{project.role}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-secondary/80 dark:bg-secondary/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-secondary/80 dark:bg-secondary/50 text-muted-foreground">
                +{project.tags.length - 5}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-auto">
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20 transition-all duration-300"
                whileTap={{ scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={14} />
                Live Demo
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-foreground bg-secondary/60 dark:bg-secondary/40 border border-border/60 hover:border-primary/25 transition-all duration-300"
                whileTap={{ scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={14} />
                Code
              </motion.a>
            )}
            <motion.button
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              Details
              <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Right — Key Features Preview */}
        <div className="lg:w-[340px] xl:w-[380px] bg-secondary/30 dark:bg-secondary/20 border-t lg:border-t-0 lg:border-l border-border/40 p-6 lg:p-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <FiLayers size={12} />
            Key Highlights
          </h4>
          <div className="space-y-2.5">
            {(project.features || []).slice(0, 5).map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] bg-primary/70 flex-shrink-0" />
                <span className="text-[13px] text-muted-foreground leading-relaxed">{feature.replace(/^[^\w\s]+\s*/, '')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Project Card — Standard ─── */
const ProjectCard: React.FC<{
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
    className="group relative rounded-2xl cursor-pointer h-full flex flex-col"
    onClick={onClick}
  >
    <div className="relative rounded-2xl bg-card border border-border/60 group-hover:border-primary/20 p-6 h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/[0.03]">
      {/* Top: Title + Badge */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          {project.title}
        </h3>
        {project.featured && (
          <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20">
            <FiStar size={10} className="text-amber-500" />
            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">Featured</span>
          </span>
        )}
      </div>

      {/* Role */}
      {project.role && (
        <span className="text-[11px] font-medium text-primary/80 mb-3">{project.role}</span>
      )}

      {/* Description */}
      <p className="text-[13px] text-muted-foreground leading-relaxed mb-5 line-clamp-3">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-secondary/70 dark:bg-secondary/50 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-secondary/70 dark:bg-secondary/50 text-muted-foreground">
            +{project.tags.length - 4}
          </span>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/30">
        <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
          View Details
          <FiArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        <div className="flex items-center gap-1 ml-auto">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Live demo for ${project.title}`}
            >
              <FiExternalLink size={14} />
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`GitHub repository for ${project.title}`}
            >
              <FiGithub size={14} />
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
    transition={{ duration: 0.2 }}
    className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.96, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.96, opacity: 0, y: 16 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl bg-card border border-border/60"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex justify-between items-center px-6 sm:px-8 py-5 backdrop-blur-xl bg-card/95 border-b border-border/40">
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
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/[0.06] border border-primary/15">
            <FiUser className="text-primary flex-shrink-0" size={16} />
            <span className="text-sm font-semibold text-foreground">{project.role}</span>
          </div>
        )}

        {/* Overview */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <FiInfo size={13} />
            Overview
          </h4>
          <p className="text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Features */}
        {project.features && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <FiLayers size={13} />
              Key Features
            </h4>
            <div className="grid gap-2">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl bg-secondary/40 dark:bg-secondary/25 border border-border/20"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-2 bg-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{feature.replace(/^[^\w\s]+\s*/, '')}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <FiCode size={13} />
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025 }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/60 dark:bg-secondary/40 text-foreground border border-border/30"
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
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground bg-secondary/60 dark:bg-secondary/40 border border-border/60 hover:border-primary/25 transition-all duration-300"
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

/* ─── Stats Bar ─── */
const StatsBar = () => {
  const totalProjects = projects.length;
  const featuredCount = projects.filter(p => p.featured).length;
  const techSet = new Set(projects.flatMap(p => p.tags));

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10 py-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {[
        { value: totalProjects, label: 'Projects' },
        { value: featuredCount, label: 'Featured' },
        { value: techSet.size + '+', label: 'Technologies' },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

/* ─── Main Projects Section ─── */
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const selectedProjectData = selectedProject ? projects.find((p) => String(p.id) === selectedProject) : null;

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => getCategory(p).includes(activeFilter));

  // Split: first 2 featured get the large layout, rest go in standard grid
  const topFeatured = filteredProjects.filter(p => p.featured).slice(0, 2);
  const remaining = filteredProjects.filter(p => !topFeatured.includes(p));

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />
        <StatsBar />

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                activeFilter === cat.key
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                  : 'bg-card text-muted-foreground border-border/60 hover:border-primary/25 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects — Large Cards */}
        {topFeatured.length > 0 && (
          <div className="space-y-5 mb-6">
            {topFeatured.map((project, index) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(String(project.id))}
              />
            ))}
          </div>
        )}

        {/* Remaining Projects — Standard Grid */}
        {remaining.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {remaining.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(String(project.id))}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiFilter size={32} className="mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">No projects in this category yet.</p>
          </motion.div>
        )}
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
