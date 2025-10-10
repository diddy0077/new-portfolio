import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import MiniProjects from './components/MiniProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Particles from './components/Particles';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import FallingText from './components/FallingText';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="font-primary min-h-screen bg-gray-900 text-white relative">
        <Particles />
        <FallingText />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ScrollProgress />
            <Navbar />
            <main className="lg:pl-20 pt-16 lg:pt-0 relative z-10 w-full max-w-full overflow-x-hidden lg:pt-0">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <MiniProjects />
              <Contact />
              <Footer />
            </main>
            <ScrollToTop />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;