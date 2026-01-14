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
import Footer from './components/Footer';
import WorkerSearch from './components/WorkerSearch';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Check if search page is requested via URL hash
    const handleHashChange = () => {
      if (window.location.hash === '#search') {
        setCurrentPage('search');
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

  return (
    <div className="App">
      <Navbar onNavigate={setCurrentPage} />
      {currentPage === 'search' ? (
        <>
          <WorkerSearch />
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
          <CTA />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
