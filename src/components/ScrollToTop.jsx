import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full glass border border-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronUp className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
          </motion.div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;