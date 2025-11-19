import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Calendar, Users, Star, Code2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import Loader from './Loader';

const Projects = ({projects, loading}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };


  return (
    <>
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A showcase of innovative solutions and creative implementations
            </p>
          </motion.div>

          {loading || projects.length === 0 ? <Loader prop={'Projects'} /> :(<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                whileHover={{ y: -10 }}
                onClick={() => openProjectModal(project)}
              >
                {project.featured && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg"
                  >
                    <Star className="w-3 h-3 inline mr-1" />
                    FEATURED
                  </motion.div>
                )}

                {/* Project Image/Preview */}
                <div className="h-48 bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-500 rounded-lg mb-4 relative overflow-hidden group-hover:shadow-2xl transition-shadow duration-300 cursor-pointer ">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-cyan-500/20 rounded-lg"></div>

                  {/* Click Indicator - Always visible */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 group-hover:bg-black/60 transition-all duration-300 rounded-lg">
                    <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-2 inline-block"
                      >
                        <Eye className="w-6 h-6 text-white" />
                      </motion.div>
                      <p className="text-white text-sm font-semibold drop-shadow-lg">Click to View Details</p>
                    </div>
                  </div>

                  {/* Hover overlay with action buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 rounded-lg">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.live, '_blank');
                      }}
                      title="View Live Demo"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank');
                      }}
                      title="View Source Code"
                    >
                      <Github className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-gray-800/50 rounded-full text-gray-300 border border-gray-700/50">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {project.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.team}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 + techIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-2 py-1 rounded-full text-xs font-medium border border-pink-500/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-400 px-2 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Status indicator */}
                <div className="absolute bottom-4 right-4">
                  <div className={`w-3 h-3 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-400' :
                    project.status === 'In Development' ? 'bg-yellow-400' : 'bg-gray-400'
                  } shadow-lg`} />
                </div>
              </motion.div>
            ))}
          </div>)}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center md:p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass max-w-4xl w-full max-h-[80%] md:max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 scrollbar-hide mx-4 sm:mx-6 md:mx-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 md:p-8 border-b border-white/10">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text truncate">{selectedProject.title}</h3>
                      {selectedProject.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-base sm:text-lg truncate">{selectedProject.category}</p>
                  </div>
                  <button
                    onClick={closeProjectModal}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0 ml-2"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Project Meta */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Duration: {selectedProject.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedProject.team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedProject.status === 'Completed' ? 'bg-green-400' :
                      selectedProject.status === 'In Development' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                    <span>{selectedProject.status}</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                  {/* Project Image */}
                  <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center order-2 md:order-1">
                    <div className="text-center">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4 order-1 md:order-2">
                    <h4 className="text-lg sm:text-xl font-bold mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <motion.a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Live Demo
                      </motion.a>
                      <motion.a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full glass border border-white/20 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Source Code
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4">Project Overview</h4>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {selectedProject.description}
                  </p>
                  {selectedProject.fullDescription && (
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  )}
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-4 py-2 rounded-full text-sm font-medium border border-pink-500/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                {selectedProject.features && (
                  <div className="mb-6 md:mb-8">
                    <h4 className="text-lg sm:text-xl font-bold mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges & Learnings */}
                {(selectedProject.challenges || selectedProject.learnings) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {selectedProject.challenges && (
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold mb-4 text-orange-400">Challenges Faced</h4>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedProject.challenges}</p>
                      </div>
                    )}
                    {selectedProject.learnings && (
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold mb-4 text-green-400">Key Learnings</h4>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedProject.learnings}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;