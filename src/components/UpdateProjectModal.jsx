import { motion,AnimatePresence } from 'framer-motion';
import { FiX, FiSave, FiEdit } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const UpdateProjectModal = ({
  isOpen,
  onClose,
  onUpdate,
  project,
  loading = false
}) => {
   
   const [projectData, setProjectData] = useState({
      title: '',
      shortDescription: '',
      description: '',
      fullDescription: '',
      technologies: [],
      image: '',
      github: '',
      live: '',
      featured: false,
      category: '',
      duration: '',
      team: '',
      status: '',
      features: [],
      challenges: '',
      learnings: ''
   });

   // Initialize projectData when project prop changes
   useEffect(() => {
     if (project) {
       setProjectData({
         title: project.title || '',
         shortDescription: project.shortDescription || '',
         description: project.description || '',
         fullDescription: project.fullDescription || '',
         technologies: project.technologies || [],
         image: project.image || '',
         github: project.github || '',
         live: project.live || '',
         featured: project.featured || false,
         category: project.category || '',
         duration: project.duration || '',
         team: project.team || '',
         status: project.status || '',
         features: project.features || [],
         challenges: project.challenges || '',
         learnings: project.learnings || ''
       });
     }
   }, [project]);
   
   
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(projectData);
  };

  const addTechnology = (technology) => {
    if (technology.trim()) {
      setProjectData(prev => ({
        ...prev,
        technologies: [...prev.technologies, technology.trim()]
      }));
    }
  };

  const addFeature = (feature) => {
    if (feature.trim()) {
      setProjectData(prev => ({
        ...prev,
        features: [...prev.features, feature.trim()]
      }));
    }
  };

  const removeTechnology = (index) => {
    setProjectData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const removeFeature = (index) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="relative w-full max-w-4xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="glass backdrop-blur-xl bg-gray-800/95 border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-blue-500/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border-2 border-blue-500/50">
                        <FiEdit className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Update Project</h2>
                        <p className="text-gray-400 text-sm">Edit your project details</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiX className="w-6 h-6" />
                      </motion.div>
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-4">
                    {/* Title and Category */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
                        <input
                          type="text"
                          value={projectData.title}
                          onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Category</label>
                        <input
                          type="text"
                          value={projectData.category}
                          onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                          required
                        />
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Short Description</label>
                      <input
                        type="text"
                        value={projectData.shortDescription}
                        onChange={(e) => setProjectData({ ...projectData, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
                      <textarea
                        value={projectData.description}
                        onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20 text-white"
                        required
                      />
                    </div>

                    {/* Full Description */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Full Description</label>
                      <textarea
                        value={projectData.fullDescription}
                        onChange={(e) => setProjectData({ ...projectData, fullDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-24 text-white"
                        required
                      />
                    </div>

                    {/* Duration and Team */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Duration</label>
                        <input
                          type="text"
                          value={projectData.duration}
                          onChange={(e) => setProjectData({ ...projectData, duration: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Team</label>
                        <select
                          value={projectData.team}
                          onChange={(e) => setProjectData({ ...projectData, team: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                          required
                        >
                          <option value="">Select Team Type</option>
                          <option value="Team Project">Team Project</option>
                          <option value="Solo Project">Solo Project</option>
                          <option value="Personal Project">Personal Project</option>
                        </select>
                      </div>
                    </div>

                    {/* Status and Featured */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
                        <select
                          value={projectData.status}
                          onChange={(e) => setProjectData({ ...projectData, status: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                      </div>
                      <div className="flex items-center mt-6">
                        <input
                          type="checkbox"
                          id="featured-update"
                          checked={projectData.featured}
                          onChange={(e) => setProjectData({ ...projectData, featured: e.target.checked })}
                          className="mr-2 w-4 h-4"
                        />
                        <label htmlFor="featured-update" className="text-sm text-gray-300">Featured Project</label>
                      </div>
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Image URL</label>
                      <input
                        type="url"
                        value={projectData.image}
                        onChange={(e) => setProjectData({ ...projectData, image: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                        required
                      />
                    </div>

                    {/* GitHub and Live URLs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">GitHub URL</label>
                        <input
                          type="url"
                          value={projectData.github}
                          onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">Live URL</label>
                        <input
                          type="url"
                          value={projectData.live}
                          onChange={(e) => setProjectData({ ...projectData, live: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                        />
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Technologies</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {projectData.technologies.map((tech, index) => (
                          <span key={index} className="bg-blue-600 px-2 py-1 rounded text-sm flex items-center gap-1 text-white">
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(index)}
                              className="text-red-300 hover:text-red-100"
                            >
                              <FiX className="text-xs" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add technology"
                          className="flex-1 px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTechnology(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Features</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {projectData.features.map((feature, index) => (
                          <span key={index} className="bg-green-600 px-2 py-1 rounded text-sm flex items-center gap-1 text-white">
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-red-300 hover:text-red-100"
                            >
                              <FiX className="text-xs" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add feature"
                          className="flex-1 px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addFeature(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Challenges */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Challenges</label>
                      <textarea
                        value={projectData.challenges}
                        onChange={(e) => setProjectData({ ...projectData, challenges: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20 text-white"
                        required
                      />
                    </div>

                    {/* Learnings */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Learnings</label>
                      <textarea
                        value={projectData.learnings}
                        onChange={(e) => setProjectData({ ...projectData, learnings: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20 text-white"
                        required
                      />
                    </div>
                  </div>
                </form>

                {/* Footer */}
                <div className="bg-gray-800/50 border-t border-gray-700 p-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200 border border-gray-600"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className='flex items-center justify-center gap-1'>
                        <div className="border border-5 animate-spin w-5 h-5 border-white border-t-transparent rounded-full" />
                        <p className='text-sm'>Updating Project...</p>
                      </div>
                    ) : (
                      <>
                        <FiSave className="w-5 h-5" />
                        Update Project
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Decorative Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-2xl" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

UpdateProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  project: PropTypes.object,
  loading: PropTypes.bool
};

export default UpdateProjectModal;