import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import WorkerSearch from './components/WorkerSearch';
import PrivacyPolicy from './components/PrivacyPolicy';
import DeleteAccount from './components/DeleteAccount';
import ChildSafetyStandards from './components/ChildSafetyStandards';
import SignIn from './components/SignIn';
import { ViewModeContext } from './context/ViewModeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [viewMode, setViewMode] = useState('client');

  useEffect(() => {
    // Check if search page is requested via URL hash
    const handleHashChange = () => {
      if (window.location.hash === '#search') {
        setCurrentPage('search');
      } else if (window.location.hash === '#privacy') {
        setCurrentPage('privacy');
      } else if (window.location.hash === '#signin') {
        setCurrentPage('signin');
      } else if (window.location.hash === '#deleteaccount') {
        setCurrentPage('deleteaccount');
      } else if (window.location.hash === '#childsafety') {
        setCurrentPage('childsafety');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPage === 'home') {
      // Scroll animation observer
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      const animatedElements = document.querySelectorAll('.scroll-animate');
      animatedElements.forEach(el => observer.observe(el));

      // Parallax scrolling effect
      const handleScroll = () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.section-glow::before, .hero-glow');

        parallaxElements.forEach((el, index) => {
          const speed = (index + 1) * 0.1;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'home') return;

    const hash = window.location.hash.replace('#', '');
    if (!hash || ['search', 'privacy', 'signin', 'deleteaccount', 'childsafety'].includes(hash)) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [currentPage]);

  return (
    <AuthProvider>
      <ViewModeContext.Provider value={viewMode}>
        <div className="App">
          <Navbar onNavigate={setCurrentPage} viewMode={viewMode} onViewModeChange={setViewMode} />
          {currentPage === 'search' ? (
            <>
              <WorkerSearch />
              <Footer />
            </>
          ) : currentPage === 'signin' ? (
            <>
              <SignIn onNavigate={setCurrentPage} />
              <Footer />
            </>
          ) : currentPage === 'privacy' ? (
            <>
              <PrivacyPolicy />
              <Footer />
            </>
          ) : currentPage === 'deleteaccount' ? (
            <>
              <DeleteAccount />
              <Footer />
            </>
          ) : currentPage === 'childsafety' ? (
            <>
              <ChildSafetyStandards />
              <Footer />
            </>
          ) : (
            <>
              <Hero onSearchClick={() => setCurrentPage('search')} />
              <HowItWorks />
              <Features />
              <Testimonials />
              <Pricing />
              <FAQ />
              <AboutUs />
              <CTA />
              <Footer />
            </>
          )}
        </div>
      </ViewModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
