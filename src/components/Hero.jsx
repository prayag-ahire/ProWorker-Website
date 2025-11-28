import { useEffect, useRef } from 'react';
import './Hero.css';
import Counter from './Counter';

function Hero() {
    const mockupsRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!mockupsRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            const mockups = mockupsRef.current.querySelectorAll('.mockup');
            mockups.forEach((mockup, index) => {
                const depth = (index + 1) * 5;
                const xTilt = xPercent * depth;
                const yTilt = yPercent * depth;

                mockup.style.transform = `
          translate(${mockup.dataset.originalTransform || ''}) 
          rotateY(${xTilt}deg) 
          rotateX(${-yTilt}deg)
        `;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero">
            <div className="hero-background">
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
                <div className="hero-glow hero-glow-3"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge animate-fade-in">
                            ⚡ Trusted by 10,000+ Users
                        </div>

                        <h1 className="hero-title animate-fade-in-up delay-100">
                            Professional Workers.<br />
                            Anytime. Anywhere.
                        </h1>

                        <p className="hero-subtitle animate-fade-in-up delay-200">
                            Book trusted home service professionals instantly with transparent pricing and verified reviews. From plumbers to tutors, find the perfect worker in seconds.
                        </p>

                        <div className="hero-buttons animate-fade-in-up delay-300">
                            <a href="#download" className="btn btn-primary btn-large">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2V14M10 14L6 10M10 14L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M3 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Download App
                            </a>
                            <a href="#worker" className="btn btn-secondary btn-large">
                                Become a Worker →
                            </a>
                        </div>

                        <div className="hero-stats animate-fade-in-up delay-400">
                            <div className="stat">
                                <div className="stat-number">
                                    <Counter end={50} suffix="K+" />
                                </div>
                                <div className="stat-label">Active Users</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">
                                    <Counter end={5} suffix="K+" />
                                </div>
                                <div className="stat-label">Verified Workers</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">
                                    <Counter end={4.8} decimals={1} suffix="★" />
                                </div>
                                <div className="stat-label">Average Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-mockups animate-fade-in delay-300" ref={mockupsRef}>
                        <div className="mockup mockup-1 animate-float" data-original-transform="-50%, 0">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=800&fit=crop&q=90"
                                alt="ProWorker App - Profiles"
                            />
                        </div>
                        <div className="mockup mockup-2 animate-float delay-200" data-original-transform="-50%, -50%">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=800&fit=crop&q=90"
                                alt="ProWorker App - Dashboard"
                            />
                        </div>
                        <div className="mockup mockup-3 animate-float delay-400" data-original-transform="0, -50%">
                            <img
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=800&fit=crop&q=90"
                                alt="ProWorker App - Booking"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
