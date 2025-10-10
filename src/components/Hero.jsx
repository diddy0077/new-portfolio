import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Code, Palette, Zap, Mail, Github, Linkedin, Twitter,DownloadIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import profileImage from '../assets/me.jpg';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const roles = [
    'Frontend Developer',
    'React Specialist',
    'Javascript Enthusiast'
  ];

  const codeSnippets = [
    'const developer = {',
    '  name: "Daniel Udeh",',
    '  skills: ["React", "TypeScript"],',
    '  passion: "Clean Code"',
    '};'
  ];
  
  
  const links = ['https://github.com/diddy0077', 'https://twitter.com/Daniel924644624', 'https://www.linkedin.com/in/daniel-udeh-a03971350/', 'mailto:daniludeh007@yahoo.com']

  const href = (icon) => {
    links.map((link) => link.includes(icon))
  }

  useEffect(() => {
    if (currentIndex < roles.length) {
      const currentRole = roles[currentIndex];
      if (isTyping) {
        if (displayedText.length < currentRole.length) {
          const timeout = setTimeout(() => {
            setDisplayedText(currentRole.slice(0, displayedText.length + 1));
          }, 100);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => setIsTyping(false), 2000);
          return () => clearTimeout(timeout);
        }
      } else {
        if (displayedText.length > 0) {
          const timeout = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, 50);
          return () => clearTimeout(timeout);
        } else {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }
      }
    }
  }, [displayedText, currentIndex, isTyping, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">

      {/* Floating Code Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            className="absolute text-xs text-cyan-300/30 font-mono"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              opacity: 0
            }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: index * 2,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative mb-8 mx-auto lg:mx-0 w-48 h-48"
            >
              <div className="w-full h-full rounded-full glass border-4 border-white/20 flex items-center justify-center overflow-hidden">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/30">
                  <img
                    src={profileImage}
                    alt="Daniel Udeh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping"></div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center border-4 border-gray-900">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4"
            >
              Daniel Udeh
            </motion.h1>

            {/* Typing Animation Role */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <div className="text-2xl md:text-3xl text-cyan-200 font-medium h-12 flex items-center justify-center lg:justify-start">
                <span>{displayedText}</span>
                <span className="ml-1 w-1 h-8 bg-cyan-400 animate-pulse"></span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              Passionate about creating modern, responsive, and user-friendly web applications
              with cutting-edge technologies. I transform ideas into beautiful digital experiences.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center lg:justify-start gap-4 mb-8"
            >
              {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href={href(Icon)}
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code className="w-5 h-5" />
                View My Work
              </motion.button>
              <motion.button
                onClick={() => window.open("/danieludehCV.pdf")}
                className="glass border border-cyan-400 text-cyan-400 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <DownloadIcon className="w-5 h-5" />
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Code Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="glass p-8 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-400">daniel.js</span>
              </div>

              <div className="font-mono text-sm space-y-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-purple-400"
                >
                  const developer = {'{'}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-gray-300 ml-4"
                >
                  <span className="text-cyan-400">name:</span> <span className="text-green-400">"Daniel Udeh"</span>,
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="text-gray-300 ml-4"
                >
                  <span className="text-cyan-400">role:</span> <span className="text-green-400">"{displayedText}"</span>,
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="text-gray-300 ml-4"
                >
                  <span className="text-cyan-400">skills:</span> [
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="text-gray-300 ml-8"
                >
                  <span className="text-yellow-400">"React"</span>,
                  <span className="text-yellow-400 ml-2">"TypeScript"</span>,
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="text-gray-300 ml-8"
                >
                  <span className="text-yellow-400">"Next.js"</span>,
                  <span className="text-yellow-400 ml-2">"Tailwind"</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  className="text-gray-300 ml-4"
                >
                  ],
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4, duration: 0.5 }}
                  className="text-gray-300 ml-4"
                >
                  <span className="text-cyan-400">passion:</span> <span className="text-green-400">"Clean Code"</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.6, duration: 0.5 }}
                  className="text-purple-400"
                >
                  {'}'};
                </motion.div>
              </div>

              {/* Animated Cursor */}
              <motion.div
                className="absolute w-2 h-5 bg-cyan-400"
                animate={{
                  opacity: [1, 0, 1],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  bottom: '2rem',
                  right: '2rem'
                }}
              />
            </div>

            {/* Floating Tech Icons */}
            <div className="absolute -top-4 -right-4 flex gap-2">
              {[Code, Palette, Zap].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-cyan-400"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 2.5 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 15,
                    backgroundColor: "rgba(34, 211, 238, 0.2)"
                  }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;