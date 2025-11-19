import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSave, FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const UpdateCodeLabModal = ({
  isOpen,
  onClose,
  codeLab,
  setCodeLabs,
  loading,
  setLoading,
  setOpenUpdateCodeLab,
  setEditingCodeLab,
  showToast,
}) => {
  const [codeLabForm, setCodeLabForm] = useState({
    title: "",
    description: "",
    tech: [],
    color: "",
    github: "",
    live: "",
    difficulty: "",
    icon: "",
  });

  useEffect(() => {
    if (codeLab) {
      setCodeLabForm({
        title: codeLab.title,
        description: codeLab.description,
        tech: codeLab.tech,
        color: codeLab.color,
        live: codeLab.live,
        difficulty: codeLab.difficulty,
        icon: codeLab.icon,
        github: codeLab.github,
      });
    }
  }, [codeLab]);

  const token = localStorage.getItem("adminToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(codeLabForm);
      const updatedCodeLab = {
        ...codeLabForm,
        tech: codeLabForm.tech.filter((t) => t.trim()),
      };
      const res = await fetch(
        `https://my-portfolio-api-tb3c.onrender.com/api/update-codeLab/${codeLab.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCodeLab),
        }
      );
      const data = await res.json();
      setTimeout(() => {
        setLoading(false);
        if (res.ok) {
          setCodeLabs(data.codeLabs);
          setOpenUpdateCodeLab(false);
          setEditingCodeLab(null);
          showToast("CodeLab updated successfully! 🎉", "success");
        } else {
          showToast(data.message || "Failed to update codeLab", "error");
        }
      }, 1500);
    } catch (error) {
      showToast("An error occurred while updating the codeLab", "error");
      console.log(error);
    }
  };

  const removeTechnology = (form, setForm, index, field) => {
    const newTechnologies = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: newTechnologies });
  };

  const addTechnology = (form, setForm, technology) => {
    if (technology.trim()) {
      const field = "tech";
      setForm({
        ...form,
        [field]: [...form[field], technology.trim()],
      });
    }
  };

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
          <div className="fixed  inset-0 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="relative w-full max-w-4xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="glass backdrop-blur-xl bg-gray-800/95 border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-blue-500/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border-2 border-blue-500/50">
                        <FiEdit className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Update CodeLab
                        </h2>
                        <p className="text-gray-400 text-sm">
                          Edit your codeLab details
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiX className="w-6 h-6" />
                      </motion.div>
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 grid sm:grid-cols-2 p-4 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={codeLabForm.title}
                      onChange={(e) =>
                        setCodeLabForm({
                          ...codeLabForm,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Difficulty
                    </label>
                    <select
                      value={codeLabForm.difficulty}
                      onChange={(e) =>
                        setCodeLabForm({
                          ...codeLabForm,
                          difficulty: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Difficulty</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      value={codeLabForm.color}
                      onChange={(e) =>
                        setCodeLabForm({
                          ...codeLabForm,
                          color: e.target.value,
                        })
                      }
                      className="w-full h-10 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Icon
                    </label>
                    <select
                      value={codeLabForm.icon}
                      onChange={(e) =>
                        setCodeLabForm({ ...codeLabForm, icon: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Icon</option>
                      <option value="Palette">Palette</option>
                      <option value="Code">Code</option>
                      <option value="Zap">Zap</option>
                      <option value="Gamepad2">Gamepad2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={codeLabForm.github}
                      onChange={(e) =>
                        setCodeLabForm({
                          ...codeLabForm,
                          github: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={codeLabForm.live}
                      onChange={(e) =>
                        setCodeLabForm({ ...codeLabForm, live: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Technologies
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {codeLabForm?.tech?.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-green-600 px-2 py-1 rounded text-sm flex items-center gap-1"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() =>
                              removeTechnology(
                                codeLabForm,
                                setCodeLabForm,
                                index,
                                "tech"
                              )
                            }
                            className="text-red-300 hover:text-red-100"
                          >
                            <FiX className="text-xs" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add technology"
                        className="flex-1 px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTechnology(
                              codeLabForm,
                              setCodeLabForm,
                              e.target.value
                            );
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      value={codeLabForm.description}
                      onChange={(e) =>
                        setCodeLabForm({
                          ...codeLabForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-24"
                      required
                    />
                  </div>
                </form>

                {/* Footer */}
                <div className="bg-gray-800/50 border-t border-gray-700 p-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200 border border-gray-600"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="border border-5 animate-spin w-5 h-5 border-white border-t-transparent rounded-full" />
                        <p className="text-sm">Updating CodeLab...</p>
                      </div>
                    ) : (
                      <>
                        <FiSave className="w-5 h-5" />
                        Update CodeLab
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Decorative Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-2xl" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

UpdateCodeLabModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  project: PropTypes.object,
  loading: PropTypes.bool,
};

export default UpdateCodeLabModal;
