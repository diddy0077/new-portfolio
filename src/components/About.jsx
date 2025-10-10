import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate frontend developer with expertise in all modern frontend frameworks and tools including React, Next.js, TypeScript, JavaScript, Tailwind CSS, and more.
            I love creating beautiful, responsive, and user-friendly applications with cutting-edge technologies.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">My Journey</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-1 flex-shrink-0 shadow-lg"></div>
                <div>
                  <h4 className="font-bold text-cyan-300 text-lg">2025 - Present</h4>
                  <p className="text-white font-medium">JavaScript Developer at EasyVolts Limited</p>
                  <p className="text-gray-300 mt-1">Developing modern web applications and leading frontend development initiatives.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mt-1 flex-shrink-0 shadow-lg"></div>
                <div>
                  <h4 className="font-bold text-pink-300 text-lg">2024</h4>
                  <p className="text-white font-medium">Self-Taught Frontend Developer</p>
                  <p className="text-gray-300 mt-1">Intensive self-learning journey mastering modern frontend technologies, frameworks, and best practices.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mt-1 flex-shrink-0 shadow-lg"></div>
                <div>
                  <h4 className="font-bold text-purple-300 text-lg">2020 - 2024</h4>
                  <p className="text-white font-medium">Freelance Web Developer</p>
                  <p className="text-gray-300 mt-1">Building custom websites and web applications for clients, specializing in React and modern JavaScript.</p>
                </div>
              </div>
             
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Expertise</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400">25+</div>
                  <div className="text-sm text-gray-300 font-medium">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400">2+</div>
                  <div className="text-sm text-gray-300 font-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400">100%</div>
                  <div className="text-sm text-gray-300 font-medium">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">24/7</div>
                  <div className="text-sm text-gray-300 font-medium">Support Available</div>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 gradient-text">What I Do</h3>
              <ul className="space-y-4 text-white">
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg"></div>
                  <span className="font-medium">Modern Frontend Frameworks</span> - React, Next.js
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg"></div>
                  <span className="font-medium">Styling & Design</span> - Tailwind CSS, Sass, Styled Components, CSS-in-JS
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                  <span className="font-medium">Programming Languages</span> - JavaScript, TypeScript, HTML5, CSS3
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg"></div>
                  <span className="font-medium">Development Tools</span> - Git, GitHub, VS Code, Figma, Chrome DevTools
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg"></div>
                  <span className="font-medium">Performance & Optimization</span> - Web Vitals, SEO, Accessibility, Testing
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;