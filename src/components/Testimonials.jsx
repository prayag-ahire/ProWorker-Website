import { useState, useEffect, useRef } from 'react';
import './Testimonials.css';
import { useViewMode } from '../context/ViewModeContext';

function Testimonials() {
    const isWorker = useViewMode() === 'worker';
    const [activeClientIndex, setActiveClientIndex] = useState(0);
    const [activeWorkerIndex, setActiveWorkerIndex] = useState(0);
    const clientCarouselRef = useRef(null);
    const workerCarouselRef = useRef(null);

    const clientTestimonials = [
        {
            name: 'Priya Sharma',
            role: 'Homeowner',
            rating: 5,
            text: 'I found a plumber nearby, checked his ratings and work photos, then contacted him directly. Clear visit charges and no platform fees.',
            avatar: 'PS'
        },
        {
            name: 'Arjun Patel',
            role: 'Apartment Owner',
            rating: 5,
            text: 'Seeing real portfolio photos and reviews gave me confidence before I reached out. Distance-based search made it easy to pick someone close.',
            avatar: 'AP'
        },
        {
            name: 'Kavya Reddy',
            role: 'Small Business Owner',
            rating: 5,
            text: 'I compared working hours and monthly availability on profiles before contacting anyone. Completely free to use as a customer.',
            avatar: 'KR'
        },
        {
            name: 'Rohit Gupta',
            role: 'Property Manager',
            rating: 5,
            text: 'I can browse electricians, carpenters, and painters near each property, read reviews, and contact the right worker myself.',
            avatar: 'RG'
        }
    ];

    const workerTestimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Electrician',
            rating: 5,
            text: 'Customers nearby find my profile, see my work photos, and call me directly. I set my visit charges and keep every rupee I earn.',
            avatar: 'RK'
        },
        {
            name: 'Sunita Singh',
            role: 'House Cleaner',
            rating: 5,
            text: 'I marked my working days and leave calendar so people know when I am available. Reviews from real customers have grown my local reputation.',
            avatar: 'SS'
        },
        {
            name: 'Vikram Joshi',
            role: 'Plumber',
            rating: 5,
            text: 'Uploading before-and-after photos of my jobs made customers trust me before they called. Quality work now brings better-paying inquiries.',
            avatar: 'VJ'
        },
        {
            name: 'Meera Agarwal',
            role: 'Beautician',
            rating: 5,
            text: 'ProWorker gave me an online presence in my area. I showcase specialties, pricing, and portfolio instead of competing only on cheap rates.',
            avatar: 'MA'
        }
    ];

    useEffect(() => {
        const handleScroll = (carousel, setActiveIndex, testimonials) => {
            if (carousel && window.innerWidth <= 768) {
                const scrollLeft = carousel.scrollLeft;
                const cardWidth = carousel.querySelector('.testimonial-card')?.offsetWidth || 280;
                const gap = 24;
                const index = Math.round(scrollLeft / (cardWidth + gap));
                setActiveIndex(Math.min(index, testimonials.length - 1));
            }
        };

        const clientCarousel = clientCarouselRef.current;
        const workerCarousel = workerCarouselRef.current;

        const clientScrollHandler = () => handleScroll(clientCarousel, setActiveClientIndex, clientTestimonials);
        const workerScrollHandler = () => handleScroll(workerCarousel, setActiveWorkerIndex, workerTestimonials);

        if (clientCarousel) {
            clientCarousel.addEventListener('scroll', clientScrollHandler);
        }
        if (workerCarousel) {
            workerCarousel.addEventListener('scroll', workerScrollHandler);
        }

        const clientInterval = setInterval(() => {
            if (window.innerWidth > 768) {
                setActiveClientIndex((prev) => (prev + 1) % clientTestimonials.length);
            }
        }, 4000);

        const workerInterval = setInterval(() => {
            if (window.innerWidth > 768) {
                setActiveWorkerIndex((prev) => (prev + 1) % workerTestimonials.length);
            }
        }, 4000);

        return () => {
            if (clientCarousel) {
                clientCarousel.removeEventListener('scroll', clientScrollHandler);
            }
            if (workerCarousel) {
                workerCarousel.removeEventListener('scroll', workerScrollHandler);
            }
            clearInterval(clientInterval);
            clearInterval(workerInterval);
        };
    }, [clientTestimonials.length, workerTestimonials.length]);

    const TestimonialCard = ({ testimonial, type, isActive }) => (
        <div className={`testimonial-card ${type} ${isActive ? 'active' : ''}`}>
            <div className="testimonial-header">
                <div className="testimonial-user">
                    <div className="avatar">{testimonial.avatar}</div>
                    <div className="testimonial-info">
                        <div className="name">{testimonial.name}</div>
                        <div className="role">{testimonial.role}</div>
                    </div>
                </div>
                <div className="rating">
                    {'★'.repeat(testimonial.rating)}
                </div>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
        </div>
    );

    return (
        <section id="testimonials" className="section section-light">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="mb-md">What people say</h2>
                    <p className="section-subtitle">
                        Real stories from customers and workers who use ProWorker
                    </p>
                </div>

                <div className="testimonials-container">
                    {!isWorker ? (
                        <div className="testimonials-column scroll-animate delay-100">
                            <h3 className="testimonials-title">Customer reviews</h3>
                            <div className="testimonials-carousel" ref={clientCarouselRef}>
                                {clientTestimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        testimonial={testimonial}
                                        type="client"
                                        isActive={index === activeClientIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="testimonials-column scroll-animate delay-100">
                            <h3 className="testimonials-title">Worker reviews</h3>
                            <div className="testimonials-carousel" ref={workerCarouselRef}>
                                {workerTestimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        testimonial={testimonial}
                                        type="worker"
                                        isActive={index === activeWorkerIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
