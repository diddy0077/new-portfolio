import { Sun, Moon, Home, User, Code, Briefcase, Mail, Menu, X, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { admin } = useContext(AuthContext)

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Code Lab', href: '#mini-projects', icon: Code },
    { name: 'Contact', href: '#contact', icon: Mail },
    { name: 'Admin', href: '/admin', icon: Settings, isRouter: true },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

const handleMobileNavClick = (href, isRouter = false) => {
    if (isRouter) {
      // For admin page, just close menu since it's a separate route
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(href);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-20 glass z-50 flex-col items-center py-8 space-y-6 border-r border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold gradient-text mb-8 relative"
        >
          <span className="relative z-10">DU</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-lg blur-xl"></div>
        </motion.div>

        <div className="flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {item.isRouter ? (
                <Link
                  to={item.href}
                  className={`group relative p-4 rounded-2xl glass border border-white/10 hover:border-white/20 text-white hover:text-cyan-300 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 block ${
                    location.pathname === item.href ? 'text-cyan-300 border-cyan-500/50' : ''
                  }`}
                  title={item.name}
                >
                  <item.icon className="w-6 h-6 drop-shadow-lg" />
                  <span className="absolute left-full ml-6 px-3 py-2 glass text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-white/10 shadow-xl">
                    {item.name}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-white/10 border-y-4 border-y-transparent"></div>
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="group relative p-4 rounded-2xl glass border border-white/10 hover:border-white/20 text-white hover:text-cyan-300 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 w-full"
                  title={item.name}
                >
                  <item.icon className="w-6 h-6 drop-shadow-lg" />
                  <span className="absolute left-full ml-6 px-3 py-2 glass text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-white/10 shadow-xl">
                    {item.name}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-white/10 border-y-4 border-y-transparent"></div>
                  </span>
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex-1"></div>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={toggleTheme}
          className="p-4 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group"
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: darkMode ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400 drop-shadow-lg group-hover:text-yellow-300" />
            ) : (
              <Moon className="w-6 h-6 text-blue-400 drop-shadow-lg group-hover:text-blue-300" />
            )}
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile Header */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/10 min-h-[64px]">
        <div className="flex items-center justify-between px-4 py-3 sm:py-4 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold gradient-text"
          >
            DU
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={toggleTheme}
              className="p-3 rounded-xl glass border border-white/10 hover:border-white/20 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: darkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </motion.div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={toggleMobileMenu}
              className="p-3 rounded-xl glass border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 relative"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  className="absolute top-1 left-0 w-6 h-0.5 bg-white block transform origin-center transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="absolute top-3 left-0 w-6 h-0.5 bg-white block transform origin-center transition-all duration-300"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  className="absolute top-5 left-0 w-6 h-0.5 bg-white block transform origin-center transition-all duration-300"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 h-full w-full max-w-sm glass backdrop-blur-xl z-50 border-l border-white/10"
              style={{ top: '64px', height: 'calc(100vh - 64px)' }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-xl font-bold gradient-text">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 p-6">
                  <div className="space-y-4">
                    {navItems.filter(item => !item.isRouter).map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleMobileNavClick(item.href)}
                        className="w-full flex items-center gap-4 p-4 rounded-xl glass border border-white/10 hover:border-white/20 text-left text-white hover:text-cyan-300 transition-all duration-300 group"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <item.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                        <span className="font-medium">{item.name}</span>
                      </motion.button>
                    ))}
                    
                    {/* Admin link for mobile */}
                    <Link
                      to="/admin/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl glass border border-white/10 hover:border-white/20 text-left text-white hover:text-cyan-300 transition-all duration-300 group"
                    >
                      <Settings className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                      <span className="font-medium">Admin</span>
                    </Link>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-4">Let's create something amazing together!</p>
                    <div className="flex gap-4 justify-center">
                      <motion.a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileNavClick('#contact');
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get In Touch
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;