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

export default function HomePage() {
  const [viewMode, setViewMode] = useState('client');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

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
  }, []);

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
