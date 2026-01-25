import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiStar, FiLayers, FiUser, FiX, FiInfo, FiCode, FiGithub } from 'react-icons/fi';
import { projects } from '../data/projects';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const openProjectDetails = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = selectedProject ? projects.find(p => String(p.id) === selectedProject) : null;

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            My Projects
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            A collection of projects showcasing my skills in web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl p-8 h-full flex flex-col cursor-pointer bg-card border border-border shadow-sm hover:shadow-xl transition-all"
              onClick={() => openProjectDetails(String(project.id))}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <FiStar size={12} className="text-yellow-500" />
                    <span className="text-xs font-semibold">Featured</span>
                  </motion.div>
                </div>
              )}

              {/* Project Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 transition-colors text-foreground group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-105 bg-secondary/50 text-secondary-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-secondary/50 text-secondary-foreground border border-border"
                  >
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiInfo size={16} />
                  <span>Details</span>
                </motion.button>

                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-xl transition-all bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <FiExternalLink size={16} />
                  </motion.a>
                )}

                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-xl transition-all bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <FiGithub size={16} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl bg-card border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex justify-between items-center p-8 backdrop-blur-md bg-card/80 border-b border-border">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-bold text-foreground">
                    {selectedProjectData.title}
                  </h3>
                  {selectedProjectData.featured && (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground border border-border">
                      <FiStar size={14} className="text-yellow-500" />
                      Featured
                    </span>
                  )}
                </div>
                <motion.button
                  onClick={closeProjectDetails}
                  className="p-3 rounded-full transition-all hover:bg-secondary text-muted-foreground hover:text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close details"
                >
                  <FiX size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {selectedProjectData.role && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border">
                    <FiUser className="text-muted-foreground" size={20} />
                    <span className="font-semibold text-foreground">
                      Role: {selectedProjectData.role}
                    </span>
                  </div>
                )}

                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                    <FiInfo className="text-muted-foreground" size={20} />
                    Overview
                  </h4>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {selectedProjectData.description}
                  </p>
                </div>

                {selectedProjectData.features && (
                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                      <FiLayers className="text-muted-foreground" size={20} />
                      Key Features
                    </h4>
                    <div className="grid gap-3">
                      {selectedProjectData.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-secondary/20 border border-border"
                        >
                          <div className="w-2 h-2 rounded-full mt-2 bg-primary"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                    <FiCode className="text-muted-foreground" size={20} />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProjectData.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 rounded-xl text-sm font-semibold bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {selectedProjectData.live && (
                    <motion.a
                      href={selectedProjectData.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink size={20} />
                      <span>Visit Live Project</span>
                    </motion.a>
                  )}

                  {selectedProjectData.github && (
                    <motion.a
                      href={selectedProjectData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub size={20} />
                      <span>View Source Code</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;