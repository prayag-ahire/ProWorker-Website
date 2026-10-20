import { useEffect, useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import Navbar from '../Navbar';
import Hero from '../Hero';
import ServiceCategories from '../ServiceCategories';
import HowItWorks from '../HowItWorks';
import Features from '../Features';
import Testimonials from '../Testimonials';
import Pricing from '../Pricing';
import FAQ from '../FAQ';
import AboutUs from '../AboutUs';
import CTA from '../CTA';
import Footer from '../Footer';

function revealInView(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top < viewportHeight && rect.bottom > 0) {
    el.classList.add('visible');
  }
}

export default function HomePage() {
  const [viewMode, setViewMode] = useState('client');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const attach = () => {
      document.querySelectorAll('.scroll-animate').forEach((el) => {
        observer.observe(el);
        revealInView(el);
      });
    };

    let timeoutId = 0;
    // Wait for React to paint after Client/Worker content swaps
    const frameId = window.requestAnimationFrame(() => {
      attach();
      // Second pass catches late layout after mode switch
      timeoutId = window.setTimeout(attach, 50);
    });

    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll('.section-glow::before, .hero-glow').forEach((el, index) => {
        const speed = (index + 1) * 0.1;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [viewMode]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const timeoutId = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <ViewModeContext.Provider value={viewMode}>
      <div className="App">
        <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
        <Hero />
        <ServiceCategories />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <AboutUs />
        <CTA />
        <Footer />
      </div>
    </ViewModeContext.Provider>
  );
}
