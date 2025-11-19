import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Zap, Palette, Gamepad2 } from 'lucide-react'; 
import React,{ useState, useEffect } from 'react';
import Loader from './Loader';

const MiniProjects = ({ loading, codeLabs}) => {
  

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const icons = {
  Palette,
  Code,
  Zap,
  Gamepad2,
};
  
   
  
  if(loading) {
      return (
         <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      >
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            Loading CodeLabs...
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 2 }}
            className="mt-4 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"
          />
        </div>
      </motion.div>
       )
    }

  return (
    <section id="mini-projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Code Lab</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of mini projects, experiments, and coding playgrounds
          </p>
        </motion.div>

        {loading || codeLabs.length === 0 ? <Loader prop={'codeLabs'} /> :(<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {codeLabs.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              {/* Header with icon and difficulty */}
              <div className="flex items-center justify-between mb-4">
               <div
  className="p-3 rounded-xl"
  style={{ backgroundColor: `${project.color}20` }}
>
  {project.icon && React.createElement(icons[project.icon], { 
    className: "w-6 h-6", 
    style: { color: project.color } 
  })}
</div>

                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>

              {/* Project info */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
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
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>)}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            More experiments coming soon! Check out my GitHub for the latest updates.
          </p>
          <motion.a
            href="https://github.com/diddy0077"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default MiniProjects;