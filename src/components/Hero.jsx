import { useEffect, useRef } from 'react';
import './Hero.css';
import Counter from './Counter';
import KiteAnimation from './KiteAnimation';

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
            <KiteAnimation />
            <div className="hero-background">
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
                <div className="hero-glow hero-glow-3"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge animate-fade-in">
                            {/* <span className="kite-icon"></span> */}
                            🪁 Celebrating Uttarayan - Trusted by 10,000+ Users
                        </div>

                        <div className="hero-main-content">
                            <div className="hero-left">
                                <h1 className="hero-title animate-fade-in-up delay-100">
                                    <span className="text-festival">Professional Workers.</span><br />
                                    Anytime. Anywhere.
                                </h1>

                                <p className="hero-subtitle animate-fade-in-up delay-200">
                                    Book trusted home service professionals instantly with transparent pricing and verified reviews. From plumbers to tutors, find the perfect worker in seconds.
                                </p>
                            </div>

                            <div className="hero-right">
                                <div className="hero-buttons animate-fade-in-up delay-300">
                                    <a href="#download" className="btn btn-festival btn-large">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 2V14M10 14L6 10M10 14L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M3 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        Download App
                                    </a>
                                    <a href="#worker" className="btn btn-secondary btn-large wind-effect">
                                        {/* <span className="kite-icon"></span> */}
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
                        </div>
                    </div>

                    <div className="hero-mockups animate-fade-in delay-300" ref={mockupsRef}>
                        <div className="mockup mockup-1 animate-float" data-original-transform="0, 0">
                            <img
                                src="/pro1.jpeg"
                                alt="ProWorker App - Profiles"
                            />
                        </div>
                        <div className="mockup mockup-2 animate-float delay-200" data-original-transform="0, 0">
                            <img
                                src="/pro2.jpeg"
                                alt="ProWorker App - Dashboard"
                            />
                        </div>
                        <div className="mockup mockup-3 animate-float delay-400" data-original-transform="0, 0">
                            <img
                                src="/pro3.jpeg"
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
