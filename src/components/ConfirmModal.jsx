import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import PropTypes from "prop-types";

const ConfirmModal = ({
  isOpen,
  onClose,
  handleDeleteProject,
  selectedProjectId,
  loading,
  isCodeLab,
  handleDeleteCodeLab,
  selectedCodeLabId,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="glass backdrop-blur-xl bg-gray-800/95 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="w-6 h-6" />
                  </motion.div>
                </button>

                {/* Header with Icon */}
                <div className="p-6 pb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.1,
                    }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border-2 border-red-500/50"
                  >
                    <FiAlertTriangle className="w-8 h-8 text-red-400" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-center text-white mb-2"
                  >
                    Are you sure?
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 text-center leading-relaxed"
                  >
                    Are you sure you want to delete this{" "}
                    {isCodeLab ? "codeLab" : "project"}? This action cannot be
                    undone.
                  </motion.p>
                </div>

                {/* Warning Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="px-6 pb-4"
                >
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-sm text-red-300 text-center font-medium">
                      ⚠️ This action cannot be undone
                    </p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 pt-2 flex gap-3"
                >
                  {/* Cancel Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200 border border-gray-600"
                  >
                    Cancel
                  </motion.button>

                  {/* Confirm Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      !isCodeLab
                        ? handleDeleteProject(selectedProjectId)
                        : handleDeleteCodeLab(selectedCodeLabId);
                    }}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-red-500/30 flex gap-1 items-center justify-center"
                  >
                    {loading && (
                      <div>
                        <div className="border animate-spin w-6 h-6 border-white border-t-transparent rounded-full border-5"></div>
                      </div>
                    )}
                    <p>{loading ? "Deleting..." : "Delete"}</p>
                  </motion.button>
                </motion.div>
              </div>

              {/* Decorative Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-2xl" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ConfirmModal;
