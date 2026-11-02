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
            name: 'Sneha Kulkarni',
            role: 'Working Professional',
            rating: 5,
            text: 'I ordered daily homemade tiffins and snacks from a home chef 1 km away. Fresh warm food, transparent per-meal rates, and zero commission markup!',
            avatar: 'SK'
        },
        {
            name: 'Arjun Patel',
            role: 'Apartment Owner',
            rating: 5,
            text: 'Seeing real portfolio photos and reviews gave me confidence before I reached out. Distance-based search made it easy to pick someone close.',
            avatar: 'AP'
        },
        {
            name: 'Ananya Verma',
            role: 'Customer',
            rating: 5,
            text: 'Found a talented local home boutique maker who tailored custom ethnic suits for Diwali. Checking her work photos on ProWorker was super convenient.',
            avatar: 'AV'
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
            name: 'Sunita Rao',
            role: 'Home Chef & Tiffin Maker',
            rating: 5,
            text: 'I run a tiffin and homemade food service from my kitchen. ProWorker lets me display daily menus and dish photos. Nearby neighbors order directly with 0% commission!',
            avatar: 'SR'
        },
        {
            name: 'Rajesh Kumar',
            role: 'Electrician',
            rating: 5,
            text: 'Customers nearby find my profile, see my work photos, and call me directly. I set my visit charges and keep every rupee I earn.',
            avatar: 'RK'
        },
        {
            name: 'Poonam Deshmukh',
            role: 'Boutique Tailor & Designer',
            rating: 5,
            text: 'I stitch custom dresses and sell homemade clothing right from my home. ProWorker brought regular neighborhood clients without taking any commission cuts.',
            avatar: 'PD'
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
            role: 'Handmade Crafts & Beauty',
            rating: 5,
            text: 'ProWorker gave me an online presence in my area for my homemade herbal products and bridal mehendi. Clients contact me directly on WhatsApp.',
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

                <div className="testimonials-container" key={isWorker ? 'worker-reviews' : 'client-reviews'}>
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
                            <h3 className="testimonials-title">Worker & seller reviews</h3>
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
