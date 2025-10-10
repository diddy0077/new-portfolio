import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Zap, Palette, Gamepad2 } from 'lucide-react';

const MiniProjects = () => {
  const miniProjects = [
    {
      id: 1,
      title: 'EasyVolts',
      description: 'Modern technology solutions provider specializing in web and mobile development with cybersecurity expertise',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Swiper', 'Node.js', 'Express', 'JSON Server'],
      icon: Palette,
      color: '#ff6b6b',
      github: 'https://github.com/diddy0077/easyvolts',
      live: 'https://easyvoltss.netlify.app/',
      difficulty: 'Expert'
    },
    {
      id: 2,
      title: 'BlogManager',
      description: 'A modern blogging platform built with React and Tailwind CSS for creating, managing, and reading blog posts with commenting functionality',
      tech: ['React', 'Vite', 'Tailwind CSS', 'React Router DOM', 'JSON Server', 'Lucide React', 'React Toastify'],
      icon: Code,
      color: '#4ecdc4',
      github: 'https://github.com/diddy0077/blog-manager',
      live: 'https://blog-manager-dev.netlify.app/',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'React Jobs',
      description: 'A modern job listing application built with React and Tailwind CSS for managing job postings',
      tech: ['React', 'Tailwind CSS', 'React Router', 'MirageJS', 'LocalStorage', 'Lucide React', 'React Spinners', 'React Toastify', 'JSON Server'],
      icon: Zap,
      color: '#45b7d1',
      github: 'https://github.com/diddy0077/react-jobs',
      live: 'https://reactjob-listing.netlify.app/',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: 'Interactive Quiz App',
      description: 'A sleek and interactive quiz application that tests users on multiple categories with real-time scoring and feedback. Built with HTML, CSS, and JavaScript to showcase dynamic DOM manipulation and state management.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      icon: Gamepad2,
      color: '#f9ca24',
      github: 'https://github.com/diddy0077/Quiz-App',
      live: 'https://diddy0077.github.io/Quiz-App/',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      title: 'Rock Paper Scissors Game',
      description: 'A stylish, animated Rock-Paper-Scissors game that lets users compete against the computer. Built using HTML, CSS, and JavaScript with real-time score tracking and conditional logic to determine round results.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      icon: Code,
      color: '#ff9ff3',
      github: 'https://github.com/diddy0077/Rock-Paper-Scissors',
      live: 'https://diddy0077.github.io/Rock-Paper-Scissors/',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      title: 'Manage – Responsive Landing Page',
      description: 'A clean and modern landing page built with Tailwind CSS. Features include a responsive layout, mobile-first navigation, and semantic HTML for accessibility.',
      tech: ['React', 'Tailwind'],
      icon: Zap,
      color: '#54a0ff',
      github: 'https://github.com/diddy0077/manage',
      live: 'https://diddy0077.github.io/manage/',
      difficulty: 'Intermediate'
    },
    {
      id: 7,
      title: 'Halcyon Theme Landing Page',
      description: 'This project is a visually appealing landing page for the Halcyon theme, showcasing its color palette and supported editors (VS Code, Sublime, Atom, iTerm, Hyper). ',
      tech: ['React', 'Tailwind'],
      icon: Palette,
      color: '#54a0ff',
      github: 'https://github.com/diddy0077/halcyon-theme',
      live: 'https://shiny-moxie-afff24.netlify.app/',
      difficulty: 'Intermediate'
    },
    {
      id: 8,
      title: '🎲 Tenzies Game',
      description: 'A fast-paced dice-rolling game built with React and Vite. Players roll 10 dice and try to get all numbers to match by strategically holding and re-rolling.',
      tech: ['React', 'Tailwind', 'JavaScript'],
      icon: Code,
      color: '#54a0ff',
      github: 'https://github.com/diddy0077/tenzies-game',
      live: 'https://diddy0077.github.io/tenzies-game/',
      difficulty: 'Intermediate'
    },
    {
      id: 9,
      title: 'To-Do List App',
      description: 'A minimalist and functional To-Do List application that allows users to add, complete, and delete tasks. Also features a dark mood toggle.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      icon: Code,
      color: '#4ecdc4',
      github: 'https://github.com/diddy0077/Todo-List-App',
      live: 'https://diddy0077.github.io/Todo-List-App/',
      difficulty: 'Intermediate'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniProjects.map((project, index) => (
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
                  <project.icon className="w-6 h-6" style={{ color: project.color }} />
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
        </div>

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