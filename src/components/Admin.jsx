import { useState } from "react";
import {
  FiUser,
  FiCode,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Toast from "./Toast";
import ConfirmModal from "./ConfirmModal";
import UpdateProjectModal from "./UpdateProjectModal";
import { motion } from "framer-motion";
import UpdateCodeLabModal from "./UpdateCodeLabModal";

const Admin = ({
  projects,
  setProjects,
  codeLabs,
  setCodeLabs,
  loading,
  setLoading,
}) => {
  const [activeTab, setActiveTab] = useState("projects");
  const { logout, admin } = useContext(AuthContext);
  const [editingProject, setEditingProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedCodeLabId, setSelectedCodeLabId] = useState(null);
  const [openUpdateProject, setOpenUpdateProject] = useState(false);
  const [isCodeLab, setIsCodeLab] = useState(false);
  const [openUpdateCodeLab, setOpenUpdateCodeLab] = useState(false);
  const [editingCodeLab, setEditingCodeLab] = useState(null);

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    fullDescription: "",
    technologies: [],
    image: "",
    github: "",
    live: "",
    featured: false,
    category: "",
    duration: "",
    team: "",
    status: "",
    features: [],
    challenges: "",
    learnings: "",
  });

  // CodeLab form state
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
  const token = localStorage.getItem("adminToken");
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newProject = {
        ...projectForm,
        technologies: projectForm.technologies.filter((t) => t.trim()),
        features: projectForm.features.filter((f) => f.trim()),
      };

      const res = await fetch(
        "https://my-portfolio-api-tb3c.onrender.com/api/add-project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProject),
        }
      );
      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        if (res.ok) {
          setProjects((prev) => {
            return [...prev, data.newProject];
          });
          resetProjectForm();
          showToast("Project added successfully! 🎉", "success");
        } else {
          showToast(data.message || "Failed to add project", "error");
        }
      }, 1500);
    } catch (error) {
      showToast("An error occurred while adding the project", "error");
      console.log(error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://my-portfolio-api-tb3c.onrender.com/api/delete-project/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setTimeout(() => {
        setLoading(false);
        if (res.ok) {
          setProjects(data.updatedProjects);
          showToast("Project deleted successfully! 🎉", "success");
          setIsOpen(false);
        } else {
          showToast(data.message || "Failed to delete project", "error");
        }
      }, 1500);
    } catch (error) {
      console.log("Error deleting project", error);
    }
  };

  const handleUpdateProject = async (updatedProjectData) => {
    if (!editingProject) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://my-portfolio-api-tb3c.onrender.com/api/update-project/${editingProject.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...updatedProjectData,
            technologies: updatedProjectData.technologies.filter((t) =>
              t.trim()
            ),
            features: updatedProjectData.features.filter((f) => f.trim()),
          }),
        }
      );

      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        if (res.ok) {
          setProjects((prev) =>
            prev.map((p) =>
              p.id === editingProject.id ? data.updatedProject : p
            )
          );
          setOpenUpdateProject(false);
          setEditingProject(null);
          showToast("Project updated successfully! 🎉", "success");
        } else {
          showToast(data.message || "Failed to update project", "error");
        }
      }, 1500);
    } catch (error) {
      showToast("An error occurred while updating the project", "error");
      console.log(error);
    }
  };

  const handleCodeLabSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newCodeLab = {
        ...codeLabForm,
        tech: codeLabForm.tech.filter((t) => t.trim()),
      };
      const res = await fetch(
        "https://my-portfolio-api-tb3c.onrender.com/api/add-codlab",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newCodeLab),
        }
      );
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        setLoading(false);
        if (res.ok) {
          setCodeLabs(data.data);
          resetProjectForm();
          showToast("CodeLab added successfully! 🎉", "success");
        } else {
          showToast(data.message || "Failed to add codeLab", "error");
        }
      }, 1500);
      resetCodeLabForm();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteCodeLab = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://my-portfolio-api-tb3c.onrender.com/api/delete-codeLab/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setTimeout(() => {
        setLoading(false);
        if (res.ok) {
          setCodeLabs(data.updatedCodeLabs);
          showToast("CodeLab deleted successfully! 🎉", "success");
          setIsOpen(false);
        } else {
          showToast(data.message || "Failed to delete codeLab", "error");
        }
      }, 1500);
    } catch (error) {
      console.log("Error deleting project", error);
    }
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
    setIsCodeLab(false);
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      shortDescription: "",
      description: "",
      fullDescription: "",
      technologies: [],
      image: "",
      github: "",
      live: "",
      featured: false,
      category: "",
      duration: "",
      team: "",
      status: "",
      features: [],
      challenges: "",
      learnings: "",
    });
  };

  const resetCodeLabForm = () => {
    setCodeLabForm({
      title: "",
      description: "",
      tech: [],
      color: "",
      github: "",
      live: "",
      difficulty: "",
      icon: "",
    });
  };

  const addTechnology = (form, setForm, technology) => {
    if (technology.trim()) {
      const field = form === projectForm ? "technologies" : "tech";
      setForm({
        ...form,
        [field]: [...form[field], technology.trim()],
      });
    }
  };

  const addFeature = (feature) => {
    if (feature.trim()) {
      setProjectForm({
        ...projectForm,
        features: [...projectForm.features, feature.trim()],
      });
    }
  };

  const removeTechnology = (form, setForm, index, field) => {
    const newTechnologies = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: newTechnologies });
  };

  const removeFeature = (index) => {
    const newFeatures = projectForm.features.filter((_, i) => i !== index);
    setProjectForm({ ...projectForm, features: newFeatures });
  };

  const openDeleteModal = (project) => {
    setSelectedProjectId(project.id);
    setIsOpen(true);
  };

  const openDeleteCodeLabModal = (codeLab) => {
    setIsCodeLab(true);
    setSelectedCodeLabId(codeLab.id);
    setIsOpen(true);
  };

  const openEditModal = (project) => {
    setOpenUpdateProject(true);
    setEditingProject(project);
  };

  const openEditCodeLab = (codeLab) => {
    setOpenUpdateCodeLab(true);
    setEditingCodeLab(codeLab);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 lg:pl-20">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={3000}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-600 rounded-lg">
              <FiUser className="text-2xl" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your projects and codelabs</p>
            </div>
            {/* Logout Button */}
            <p>{admin.name}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              onClick={logout}
            >
              <FiLogOut className="text-lg" />
              Logout
            </motion.button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "projects"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FiCode className="inline mr-2" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab("codelabs")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "codelabs"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FiCode className="inline mr-2" />
              CodeLabs
            </button>
          </div>
        </motion.div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiPlus className="text-blue-500" />
                Add New Project
              </h2>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={projectForm.shortDescription}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        shortDescription: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Description
                  </label>
                  <textarea
                    value={projectForm.fullDescription}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        fullDescription: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={projectForm.duration}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          duration: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Team
                    </label>
                    <select
                      value={projectForm.team}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, team: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Project Type</option>
                      <option value="Team Project">Team Project</option>
                      <option value="Solo Project">Solo Project</option>
                      <option value="Personal Project">Personal Project</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      value={projectForm.status}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={projectForm.featured}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          featured: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <label htmlFor="featured" className="text-sm">
                      Featured Project
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.image}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, image: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={projectForm.github}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
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
                      value={projectForm.live}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, live: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Technologies
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {projectForm.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 px-2 py-1 rounded text-sm flex items-center gap-1"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() =>
                            removeTechnology(
                              projectForm,
                              setProjectForm,
                              index,
                              "technologies"
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
                            projectForm,
                            setProjectForm,
                            e.target.value
                          );
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {projectForm.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-green-600 px-2 py-1 rounded text-sm flex items-center gap-1"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
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
                      placeholder="Add feature"
                      className="flex-1 px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addFeature(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Challenges
                  </label>
                  <textarea
                    value={projectForm.challenges}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        challenges: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Learnings
                  </label>
                  <textarea
                    value={projectForm.learnings}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        learnings: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <FiSave />
                    {loading && (
                      <div>
                        <div className="border animate-spin w-6 h-6 border-white border-t-transparent rounded-full border-5"></div>
                      </div>
                    )}
                    <p>Add Project</p>
                  </button>
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Projects List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6">Existing Projects</h2>
              <div className="space-y-4 max-h-300 overflow-y-auto">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => openDeleteModal(project)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {project.shortDescription}
                    </p>
                    <div className="flex gap-2 mb-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-600 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* CodeLabs Tab */}
        {activeTab === "codelabs" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* CodeLab Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiPlus className="text-green-500" />
                Add New CodeLab
              </h2>

              <form onSubmit={handleCodeLabSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={codeLabForm.title}
                    onChange={(e) =>
                      setCodeLabForm({ ...codeLabForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
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
                      setCodeLabForm({ ...codeLabForm, color: e.target.value })
                    }
                    className="w-full h-10 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
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
                      setCodeLabForm({ ...codeLabForm, github: e.target.value })
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
                    {codeLabForm.tech.map((tech, index) => (
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

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <FiSave />
                    {loading ? (
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p>Adding CodeLab...</p>
                      </div>
                    ) : (
                      <p>Add CodeLab</p>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetCodeLabForm}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </motion.div>

            {/* CodeLabs List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-6">Existing CodeLabs</h2>
              <div className="space-y-4 max-h-150 overflow-y-auto">
                {codeLabs?.map((codeLab) => (
                  <div key={codeLab.id} className="bg-gray-700 rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{codeLab.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditCodeLab(codeLab)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => openDeleteCodeLabModal(codeLab)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {codeLab.description}
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xs bg-gray-600 px-2 py-1 rounded">
                        {codeLab.difficulty}
                      </span>
                      <div
                        className="w-4 h-4 rounded-full border border-gray-500"
                        style={{ backgroundColor: codeLab.color }}
                      ></div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      {codeLab.tech.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-green-600 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {codeLab.github && (
                        <a
                          href={codeLab.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {codeLab.live && (
                        <a
                          href={codeLab.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeDeleteModal}
        handleDeleteProject={handleDeleteProject}
        selectedProjectId={selectedProjectId}
        loading={loading}
        isCodeLab={isCodeLab}
        handleDeleteCodeLab={handleDeleteCodeLab}
        selectedCodeLabId={selectedCodeLabId}
      />
      <UpdateProjectModal
        isOpen={openUpdateProject}
        project={editingProject}
        onClose={() => setOpenUpdateProject(false)}
        onUpdate={handleUpdateProject}
        loading={loading}
      />
      <UpdateCodeLabModal
        isOpen={openUpdateCodeLab}
        codeLab={editingCodeLab}
        setEditingCodeLab={setEditingCodeLab}
        onClose={() => setOpenUpdateCodeLab(false)}
        setOpenUpdateCodeLab={setOpenUpdateCodeLab}
        setCodeLabs={setCodeLabs}
        showToast={showToast}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Admin;
