import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
  const timerRef = useRef(null);
  
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    if (isVisible && duration > 0) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isVisible, duration, onClose]);

  const toastConfig = {
    success: {
      icon: FiCheckCircle,
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/50',
      iconColor: 'text-green-400',
      textColor: 'text-green-100'
    },
    error: {
      icon: FiXCircle,
      bgColor: 'from-red-500/20 to-rose-500/20',
      borderColor: 'border-red-500/50',
      iconColor: 'text-red-400',
      textColor: 'text-red-100'
    },
    warning: {
      icon: FiAlertCircle,
      bgColor: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/50',
      iconColor: 'text-yellow-400',
      textColor: 'text-yellow-100'
    },
    info: {
      icon: FiInfo,
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/50',
      iconColor: 'text-blue-400',
      textColor: 'text-blue-100'
    }
  };

  const config = toastConfig[type] || toastConfig.success;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            duration: 0.3 
          }}
          className="fixed top-6 right-6 z-[9999] max-w-md"
        >
          <div className={`
            glass backdrop-blur-xl bg-gradient-to-r ${config.bgColor}
            border ${config.borderColor}
            rounded-xl shadow-2xl p-4
            flex items-center gap-3
            min-w-[300px]
          `}>
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                delay: 0.1 
              }}
              className={`${config.iconColor} flex-shrink-0`}
            >
              <Icon className="w-6 h-6" />
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className={`${config.textColor} font-medium flex-1`}
            >
              {message}
            </motion.p>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`${config.iconColor} hover:opacity-80 transition-opacity flex-shrink-0`}
            >
              <FiX className="w-5 h-5" />
            </motion.button>

            {/* Progress Bar */}
            {duration > 0 && (
              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${config.bgColor} rounded-b-xl`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number
};

export default Toast;