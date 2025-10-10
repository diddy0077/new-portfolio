import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Scroll percentage indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-mono border border-white/20">
          {scrollPercentage}%
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;