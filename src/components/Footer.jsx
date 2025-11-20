import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { Icon: Github, href: 'https://github.com/diddy0077', color: 'hover:text-gray-300', label: 'GitHub' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/daniel-udeh-a03971350/', color: 'hover:text-blue-400', label: 'LinkedIn' },
    { Icon: Twitter, href: 'https://twitter.com/Daniel924644624', color: 'hover:text-cyan-400', label: 'Twitter' },
  ];

  return (
    <footer className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Let's Connect</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate on amazing projects.
            Let's build something great together!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Get In Touch</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-center justify-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <Github className="w-5 h-5 text-pink-400" />
                <span className="text-gray-300">danieludeh007@yahoo.com</span>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <Twitter className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300">Available for projects</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Follow Me</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map(({ Icon, href, color, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl glass border border-white/20 ${color} transition-all duration-300 hover:scale-110`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  title={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text">Quick Links</h3>
            <div className="space-y-3">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => document.querySelector(link.href).scrollIntoView({ behavior: 'smooth' })}
                  className="w-full p-3 rounded-xl glass border border-white/20 text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center border-t border-white/10 pt-8"
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm md:text-base">
              © 2025 Daniel Udeh. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Built with ❤️ using React, Tailwind CSS & Express Js
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;