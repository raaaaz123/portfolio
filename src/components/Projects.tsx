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
    <section className="py-20 px-4" style={{ backgroundColor: 'var(--notion-gray-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--notion-default-text)' }}>
            My Projects
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--notion-gray-text)' }}>
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
              className="group relative overflow-hidden rounded-3xl p-8 h-full flex flex-col cursor-pointer"
              style={{
                backgroundColor: 'var(--notion-default-bg)',
                border: `1px solid var(--notion-gray-text)`,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => openProjectDetails(String(project.id))}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--notion-gray-bg)',
                      color: 'var(--notion-default-text)',
                      border: `1px solid var(--notion-gray-text)`
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <FiStar size={12} />
                    <span className="text-xs font-semibold">Featured</span>
                  </motion.div>
                </div>
              )}
              
              {/* Project Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 transition-colors" 
                    style={{ color: 'var(--notion-default-text)' }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed" 
                   style={{ color: 'var(--notion-gray-text)' }}>
                  {project.description}
                </p>
              </div>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'var(--notion-gray-bg)',
                      color: 'var(--notion-gray-text)',
                      border: `1px solid var(--notion-gray-text)`
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span 
                    className="px-3 py-1.5 rounded-xl text-xs font-medium" 
                    style={{
                      backgroundColor: 'var(--notion-gray-bg)',
                      color: 'var(--notion-gray-text)',
                      border: `1px solid var(--notion-gray-text)`
                    }}
                  >
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all"
                  style={{
                    backgroundColor: 'var(--notion-gray-bg)',
                    color: 'var(--notion-default-text)',
                    border: `1px solid var(--notion-gray-text)`
                  }}
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
                    className="flex items-center justify-center p-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: 'var(--notion-gray-bg)',
                      color: 'var(--notion-gray-text)',
                      border: `1px solid var(--notion-gray-text)`
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                    className="flex items-center justify-center p-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: 'var(--notion-gray-bg)',
                      color: 'var(--notion-gray-text)',
                      border: `1px solid var(--notion-gray-text)`
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              style={{ 
                backgroundColor: 'var(--notion-default-bg)',
                border: `1px solid var(--notion-gray-text)`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex justify-between items-center p-8 backdrop-blur-sm" style={{
                backgroundColor: 'var(--notion-default-bg)',
                borderBottom: `1px solid var(--notion-gray-text)`
              }}>
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl font-bold" style={{ color: 'var(--notion-default-text)' }}>
                    {selectedProjectData.title}
                  </h3>
                  {selectedProjectData.featured && (
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold" style={{
                      backgroundColor: 'var(--notion-gray-bg)',
                      color: 'var(--notion-default-text)',
                      border: `1px solid var(--notion-gray-text)`
                    }}>
                      <FiStar size={14} />
                      Featured
                    </span>
                  )}
                </div>
                <motion.button
                  onClick={closeProjectDetails}
                  className="p-3 rounded-full transition-all hover:bg-opacity-10"
                  style={{ 
                    color: 'var(--notion-gray-text)',
                    backgroundColor: 'var(--notion-gray-bg)'
                  }}
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
                  <div className="flex items-center gap-3 p-4 rounded-2xl" style={{
                    backgroundColor: 'var(--notion-gray-bg)',
                    border: `1px solid var(--notion-gray-text)`
                  }}>
                    <FiUser style={{ color: 'var(--notion-gray-text)' }} size={20} />
                    <span className="font-semibold" style={{ color: 'var(--notion-default-text)' }}>
                      Role: {selectedProjectData.role}
                    </span>
                  </div>
                )}
                
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--notion-default-text)' }}>
                    <FiInfo style={{ color: 'var(--notion-gray-text)' }} size={20} />
                    Overview
                  </h4>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--notion-gray-text)' }}>
                    {selectedProjectData.description}
                  </p>
                </div>
                
                {selectedProjectData.features && (
                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--notion-default-text)' }}>
                      <FiLayers style={{ color: 'var(--notion-gray-text)' }} size={20} />
                      Key Features
                    </h4>
                    <div className="grid gap-3">
                      {selectedProjectData.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-xl" 
                          style={{
                            backgroundColor: 'var(--notion-gray-bg)',
                            border: `1px solid var(--notion-gray-text)`
                          }}
                        >
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--notion-gray-text)' }}></div>
                          <span style={{ color: 'var(--notion-gray-text)' }}>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--notion-default-text)' }}>
                    <FiCode style={{ color: 'var(--notion-gray-text)' }} size={20} />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProjectData.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 rounded-xl text-sm font-semibold"
                        style={{
                          backgroundColor: 'var(--notion-gray-bg)',
                          color: 'var(--notion-gray-text)',
                          border: `1px solid var(--notion-gray-text)`
                        }}
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
                      className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all"
                      style={{
                        backgroundColor: 'var(--notion-gray-bg)',
                        color: 'var(--notion-default-text)',
                        border: `1px solid var(--notion-gray-text)`
                      }}
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
                      className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all"
                      style={{
                        backgroundColor: 'var(--notion-gray-bg)',
                        color: 'var(--notion-gray-text)',
                        border: `1px solid var(--notion-gray-text)`
                      }}
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