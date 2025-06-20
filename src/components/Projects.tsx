import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiStar, FiLayers, FiUser, FiX, FiInfo, FiCode } from 'react-icons/fi';
import { projects } from '../data/projects';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Add custom CSS to fix carousel styling
const customCarouselStyles = `
  .featured-carousel .carousel .slide {
    padding: 0 30px;
    box-sizing: border-box;
  }
  
  .featured-carousel .carousel .control-dots {
    margin: 20px 0 0;
    position: relative;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  
  .featured-carousel .carousel .control-dots .dot {
    width: 10px;
    height: 10px;
    box-shadow: none;
    background: #e2e8f0;
    opacity: 1;
  }
  
  .featured-carousel .carousel .control-dots .dot.selected {
    background: #f97316;
  }
  
  .featured-carousel .carousel-root {
    padding: 0 40px;
  }
  
  @media (min-width: 768px) {
    .featured-carousel .carousel-root {
      padding: 0 60px;
    }
  }
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // Separate featured projects
  const featuredProjects = projects.filter(project => project.featured);

  const openProjectDetails = (projectId: number) => {
    setSelectedProject(projectId);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const getProject = (id: number | null) => {
    if (id === null) return null;
    return projects.find(project => project.id === id) || null;
  };

  const selectedProjectData = getProject(selectedProject);

  return (
    <section id="projects" className="py-20 bg-primary-50">
      {/* Inject custom carousel styles */}
      <style>{customCarouselStyles}</style>
      
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        
        {/* Featured Projects Carousel */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full">
                <FiStar className="text-primary" size={16} />
                <span className="text-primary font-medium text-sm">Featured Projects</span>
              </div>
            </motion.div>
            
            {/* Featured Projects Carousel */}
            <div className="max-w-6xl mx-auto featured-carousel">
              <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                interval={5000}
                stopOnHover={true}
                swipeable={true}
                emulateTouch={true}
                centerMode={false}
                centerSlidePercentage={100}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-primary-50 transition-colors"
                    >
                      <span className="sr-only">Previous</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-primary-50 transition-colors"
                    >
                      <span className="sr-only">Next</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  )
                }
              >
                {featuredProjects.map((project) => (
                  <div key={project.id} className="px-4 py-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white border border-primary-200 rounded-xl p-6 md:p-8 shadow-md h-full max-w-3xl mx-auto"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                        <span className="bg-primary/10 p-2 rounded-full">
                          <FiStar className="text-primary" size={18} />
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-primary-50 rounded-full text-sm font-medium text-primary-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 5 && (
                          <span className="px-3 py-1 bg-primary-50 rounded-full text-sm font-medium text-primary-700">
                            +{project.tags.length - 5}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-auto">
                        <motion.button
                          onClick={() => openProjectDetails(project.id)}
                          className="btn-primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                        
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Visit Project
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
        
        {/* All Projects Grid */}
        <motion.h3
          className="text-2xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          All Projects
        </motion.h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border ${
                project.featured ? 'border-primary/20' : 'border-primary-100'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900 truncate">{project.title}</h3>
                {project.featured && (
                  <span className="bg-primary/10 p-1 rounded-full">
                    <FiStar className="text-primary" size={14} />
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-primary-50 rounded-full text-xs font-medium text-primary-700"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2 py-0.5 bg-primary-50 rounded-full text-xs font-medium text-primary-700">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => openProjectDetails(project.id)}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  <FiInfo size={14} />
                  <span>Details</span>
                </button>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors text-sm"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <FiExternalLink size={14} />
                    <span>Live</span>
                  </a>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-primary-100">
                <h3 className="text-2xl font-bold">{selectedProjectData.title}</h3>
                <button
                  onClick={closeProjectDetails}
                  className="p-2 rounded-full hover:bg-primary-50 transition-colors"
                  aria-label="Close details"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="p-6">
                {selectedProjectData.role && (
                  <div className="flex items-center gap-2 mb-6">
                    <FiUser className="text-primary" size={18} />
                    <span className="font-medium">{selectedProjectData.role}</span>
                  </div>
                )}
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-2">Overview</h4>
                  <p className="text-gray-700">{selectedProjectData.description}</p>
                </div>
                
                {selectedProjectData.features && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <FiLayers className="text-primary" size={18} />
                      <h4 className="text-lg font-semibold">Features</h4>
                    </div>
                    <ul className="space-y-3">
                      {selectedProjectData.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FiCode className="text-primary" size={18} />
                    <h4 className="text-lg font-semibold">Tech Stack</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-50 rounded-full text-sm font-medium text-primary-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {selectedProjectData.live && (
                    <a
                      href={selectedProjectData.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <FiExternalLink size={18} />
                      <span>Visit Project</span>
                    </a>
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