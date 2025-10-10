import { motion } from 'framer-motion';
import { DiHtml5, DiCss3, DiReact, DiJavascript1, DiGit, DiGithubBadge } from 'react-icons/di';
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiJquery, SiFirebase } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'HTML', icon: DiHtml5, level: 95, color: '#E34F26' },
    { name: 'CSS', icon: DiCss3, level: 90, color: '#1572B6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95, color: '#06B6D4' },
    { name: 'JavaScript', icon: DiJavascript1, level: 85, color: '#F7DF1E' },
    { name: 'React', icon: DiReact, level: 90, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, level: 80, color: '#000000' },
    { name: 'TypeScript', icon: SiTypescript, level: 75, color: '#3178C6' },
    { name: 'jQuery', icon: SiJquery, level: 70, color: '#0769AD' },
    { name: 'Firebase', icon: SiFirebase, level: 80, color: '#FFCA28' },
    { name: 'Git', icon: DiGit, level: 85, color: '#F05032' },
    { name: 'GitHub', icon: DiGithubBadge, level: 85, color: '#181717' },
  ];

  return (
    <section id="skills" className="py-20 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            My journey through technologies and tools that power modern web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start mb-16 w-full">
          {/* Skill Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Skill Evolution</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-pink-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-cyan-400">Frontend Foundations</h4>
                  <p className="text-gray-300 text-sm break-words">HTML, CSS, JavaScript - The core of web development</p>
                  <div className="flex gap-2 mt-2">
                    {skills.slice(0, 3).map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded-full"
                      >
                        <skill.icon className="w-3 h-3" style={{ color: skill.color }} />
                        <span className="text-xs">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-cyan-400">Modern Frameworks</h4>
                  <p className="text-gray-300 text-sm break-words">React ecosystem and advanced tooling</p>
                  <div className="flex gap-2 mt-2">
                    {skills.slice(3, 6).map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded-full"
                      >
                        <skill.icon className="w-3 h-3" style={{ color: skill.color }} />
                        <span className="text-xs">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-cyan-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-cyan-400">Development Tools</h4>
                  <p className="text-gray-300 text-sm break-words">Version control, deployment, and collaboration</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.slice(6).map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded-full"
                      >
                        <skill.icon className="w-3 h-3" style={{ color: skill.color }} />
                        <span className="text-xs">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Proficiency Stats</h3>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-500">95%</div>
                  <div className="text-sm text-gray-300">Frontend Mastery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-500">90%</div>
                  <div className="text-sm text-gray-300">React Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">85%</div>
                  <div className="text-sm text-gray-300">Full-Stack Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500">100%</div>
                  <div className="text-sm text-gray-300">Problem Solving</div>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Continuous Learning</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Always exploring new frameworks and tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Contributing to open source projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Staying updated with industry trends</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-pulse mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Building side projects for learning</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Interactive Skill Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold gradient-text mb-4">Technology Stack</h3>
          <p className="text-gray-300">Hover over each skill to see detailed proficiency</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-4 md:p-6 rounded-2xl text-center hover:scale-105 md:hover:scale-110 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative z-10"
                style={{ backgroundColor: `${skill.color}20` }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <skill.icon className="w-10 h-10" style={{ color: skill.color }} />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300 relative z-10">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-3 rounded-full relative"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              <span className="text-sm font-medium relative z-10" style={{ color: skill.color }}>{skill.level}%</span>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded-full">
                  {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;