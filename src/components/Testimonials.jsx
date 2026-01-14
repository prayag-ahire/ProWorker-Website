import { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

function Testimonials() {
    const [activeClientIndex, setActiveClientIndex] = useState(0);
    const [activeWorkerIndex, setActiveWorkerIndex] = useState(0);
    const clientCarouselRef = useRef(null);
    const workerCarouselRef = useRef(null);

    const clientTestimonials = [
        {
            name: 'Priya Sharma',
            role: 'Homeowner',
            rating: 5,
            text: 'Booked a plumber in 2 minutes! The pricing was transparent and the worker arrived exactly on time. Best service app ever!',
            avatar: '👩‍💼'
        },
        {
            name: 'Arjun Patel',
            role: 'Apartment Owner',
            rating: 5,
            text: 'Loved the clean UI and pricing transparency. Being able to see reviews with actual photos gave me confidence to book.',
            avatar: '👨‍💻'
        },
        {
            name: 'Kavya Reddy',
            role: 'Small Business Owner',
            rating: 5,
            text: 'The rescheduling feature saved me when plans changed. Customer support was amazing too!',
            avatar: '👩‍💼'
        },
        {
            name: 'Rohit Gupta',
            role: 'Property Manager',
            rating: 5,
            text: 'Managing multiple properties is easy now. I can book different workers for different locations seamlessly.',
            avatar: '👨‍💼'
        }
    ];

    const workerTestimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Electrician',
            rating: 5,
            text: 'I get 2-3 bookings daily thanks to ProWorker. My income has doubled in just 3 months!',
            avatar: '👨‍🔧'
        },
        {
            name: 'Sunita Singh',
            role: 'House Cleaner',
            rating: 5,
            text: 'This app really improved my income. I love managing my schedule and getting paid fairly.',
            avatar: '👩‍🦰'
        },
        {
            name: 'Vikram Joshi',
            role: 'Plumber',
            rating: 5,
            text: 'The training videos helped me improve my skills. Now I get more 5-star reviews!',
            avatar: '👨‍🔧'
        },
        {
            name: 'Meera Agarwal',
            role: 'Tutor',
            rating: 5,
            text: 'ProWorker connects me with families looking for quality tutoring. My calendar is always full!',
            avatar: '👩‍🏫'
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
                    {'⭐'.repeat(testimonial.rating)}
                </div>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
        </div>
    );

    return (
        <section id="testimonials" className="section section-light">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">What People Say</h2>
                    <p className="section-subtitle">
                        Real stories from clients and workers who love ProWorker
                    </p>
                </div>

                <div className="testimonials-container">
                    <div className="testimonials-column scroll-animate delay-100">
                        <h3 className="testimonials-title">
                            <span className="title-icon">👥</span>
                            Client Reviews
                        </h3>
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

                    <div className="testimonials-column scroll-animate delay-200">
                        <h3 className="testimonials-title">
                            <span className="title-icon">🔧</span>
                            Worker Reviews
                        </h3>
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
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
