import { useState, useEffect } from 'react';
import './Testimonials.css';

function Testimonials() {
    const [activeClientIndex, setActiveClientIndex] = useState(0);
    const [activeWorkerIndex, setActiveWorkerIndex] = useState(0);

    const clientTestimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Homeowner',
            rating: 5,
            text: 'Booked a plumber in 2 minutes! The pricing was transparent and the worker arrived exactly on time. Best service app ever!',
            avatar: '👩‍💼'
        },
        {
            name: 'Michael Chen',
            role: 'Apartment Owner',
            rating: 5,
            text: 'Loved the clean UI and pricing transparency. Being able to see reviews with actual photos gave me confidence to book.',
            avatar: '👨‍💻'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Small Business Owner',
            rating: 5,
            text: 'The rescheduling feature saved me when plans changed. Customer support was amazing too!',
            avatar: '👩‍💼'
        },
        {
            name: 'James Wilson',
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
            name: 'Maria Santos',
            role: 'House Cleaner',
            rating: 5,
            text: 'This app really improved my income. I love managing my schedule and getting paid fairly.',
            avatar: '👩‍🦰'
        },
        {
            name: 'David Thompson',
            role: 'Plumber',
            rating: 5,
            text: 'The training videos helped me improve my skills. Now I get more 5-star reviews!',
            avatar: '👨‍🔧'
        },
        {
            name: 'Isabella Chen',
            role: 'Tutor',
            rating: 5,
            text: 'ProWorker connects me with families looking for quality tutoring. My calendar is always full!',
            avatar: '👩‍🏫'
        }
    ];

    useEffect(() => {
        const clientInterval = setInterval(() => {
            setActiveClientIndex((prev) => (prev + 1) % clientTestimonials.length);
        }, 5000);

        const workerInterval = setInterval(() => {
            setActiveWorkerIndex((prev) => (prev + 1) % workerTestimonials.length);
        }, 5500);

        return () => {
            clearInterval(clientInterval);
            clearInterval(workerInterval);
        };
    }, [clientTestimonials.length, workerTestimonials.length]);

    const TestimonialCard = ({ testimonial, type, isActive }) => (
        <div className={`testimonial-card ${type} ${isActive ? 'active' : ''}`}>
            <div className="testimonial-header">
                <div className="avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                    <div className="name">{testimonial.name}</div>
                    <div className="role">{testimonial.role}</div>
                </div>
                <div className="rating">
                    {'⭐'.repeat(testimonial.rating)}
                </div>
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
        </div>
    );

    return (
        <section id="testimonials" className="section section-dark">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">What People Say</h2>
                    <p className="section-subtitle">
                        Real stories from clients and workers who love ProWorker
                    </p>
                </div>

                <div className="testimonials-container">
                    <div className="testimonials-column scroll-animate delay-100">
                        <h3 className="testimonials-title text-neon">
                            <span className="title-icon">👥</span>
                            Client Reviews
                        </h3>
                        <div className="testimonials-carousel">
                            {clientTestimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={index}
                                    testimonial={testimonial}
                                    type="client"
                                    isActive={index === activeClientIndex}
                                />
                            ))}
                        </div>
                        <div className="carousel-dots">
                            {clientTestimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === activeClientIndex ? 'active' : ''}`}
                                    onClick={() => setActiveClientIndex(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="testimonials-column scroll-animate delay-200">
                        <h3 className="testimonials-title text-blue">
                            <span className="title-icon">🔧</span>
                            Worker Reviews
                        </h3>
                        <div className="testimonials-carousel">
                            {workerTestimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={index}
                                    testimonial={testimonial}
                                    type="worker"
                                    isActive={index === activeWorkerIndex}
                                />
                            ))}
                        </div>
                        <div className="carousel-dots">
                            {workerTestimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === activeWorkerIndex ? 'active' : ''}`}
                                    onClick={() => setActiveWorkerIndex(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
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
