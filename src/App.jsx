import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import MiniProjects from "./components/MiniProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";
import Loading from "./components/Loading";
import Particles from "./components/Particles";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import FallingText from "./components/FallingText";
import AdminRoute from "./components/AdminRoute";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [codeLabs, setCodeLabs] = useState([]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://my-portfolio-api-tb3c.onrender.com/api/projects"
        );
        const data = await res.json();
        setProjects(data.projects);
      } catch (error) {
        console.log("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchCodeLabs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://my-portfolio-api-tb3c.onrender.com/api/codelabs"
        );
        const data = await res.json();
        setCodeLabs(data.codeLabs);
        console.log(data);
      } catch (error) {
        console.log("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCodeLabs();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="font-primary min-h-screen bg-gray-900 text-white relative">
          <Particles />
          <FallingText />
          {isLoading ? (
            <Loading />
          ) : (
            <Suspense fallback={<Loading />}>
              <ScrollProgress />
              <Navbar />
              <main className="lg:pl-20 pt-16 lg:pt-0 relative z-10 w-full max-w-full overflow-x-hidden lg:pt-0">
                <Routes>
                  <Route path="loader" element={<Loader />} />
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <About />
                        <Skills />
                        <Projects projects={projects} loading={loading} />
                        <MiniProjects codeLabs={codeLabs} loading={loading} />
                        <Contact />
                        <Footer />
                      </>
                    }
                  />
                  <Route path="/admin" element={<AdminLogin />} />

                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <Admin
                          projects={projects}
                          loading={loading}
                          setProjects={setProjects}
                          codeLabs={codeLabs}
                          setCodeLabs={setCodeLabs}
                          setLoading={setLoading}
                        />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </main>
              <ScrollToTop />
            </Suspense>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
