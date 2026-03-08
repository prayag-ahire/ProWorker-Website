import { useState } from 'react';
import './FAQ.css';
import { useViewMode } from '../context/ViewModeContext';

function FAQ() {
    const [openItems, setOpenItems] = useState([]);
    const isWorker = useViewMode() === 'worker';

    const toggleFAQ = (index) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(item => item !== index)
                : [...prev, index]
        );
    };

    const clientFaqs = [
        {
            question: 'How does ProWorker verify workers?',
            answer: 'All workers undergo rigorous background checks, identity verification, and certificate validation. We also verify their work experience through references and past client reviews before approving their profiles.'
        },
        {
            question: 'Is there a booking fee for clients?',
            answer: 'No! ProWorker is 100% free for clients. You only pay the worker\'s service fee directly for the work completed. No hidden charges, no subscription fees.'
        },
        {
            question: 'Can I reschedule or cancel a booking?',
            answer: 'Yes, you can easily reschedule or cancel bookings through the app. Our flexible system allows you to modify appointments based on the cancellation policy set by each worker.'
        },
        {
            question: 'What services are available on ProWorker?',
            answer: 'We offer a wide range of home services including plumbing, electrical work, cleaning, cooking, tutoring, babysitting, carpentry, painting, and many more. New service categories are added regularly.'
        },
        {
            question: 'How do reviews work?',
            answer: 'After each service, clients can leave reviews with ratings and upload photos or videos. This helps maintain quality and lets other clients make informed decisions. Workers with better reviews get more visibility.'
        },
        {
            question: 'What if I\'m not satisfied with the service?',
            answer: 'We have a quality guarantee. If you\'re not satisfied with the service, contact our support team within 24 hours and we\'ll send another professional at no extra cost.'
        }
    ];

    const workerFaqs = [
        {
            question: 'How do I join ProWorker as a worker?',
            answer: 'Sign up, complete your profile with your skills and certifications, set your service area and hourly rates, and submit for verification. Once approved, you\'ll start receiving booking requests.'
        },
        {
            question: 'Does ProWorker charge any commission or fees?',
            answer: 'Joining and creating your profile is completely free. ProWorker is currently in beta — enjoy all features at no cost while we grow together.'
        },
        {
            question: 'How and when do I get paid?',
            answer: 'You receive payments directly after completing jobs. ProWorker provides a secure payment gateway that ensures fast and reliable transfers to your bank account or digital wallet.'
        },
        {
            question: 'How can I get more bookings?',
            answer: 'Keep your profile updated with photos and certifications, respond to booking requests quickly, and collect 5-star reviews from clients. Workers with higher ratings appear first in search results.'
        },
        {
            question: 'Are there free training resources for workers?',
            answer: 'Yes! ProWorker provides free training videos to help you improve your skills, grow your client base, and use the platform effectively. More content is added regularly.'
        },
        {
            question: 'Can I set my own schedule and rates?',
            answer: 'Absolutely. You have full control over your availability, working hours, holidays, and hourly rates. You only accept bookings that fit your schedule.'
        }
    ];

    const faqs = isWorker ? workerFaqs : clientFaqs;

    return (
        <section className="faq-section" id="faq">
            <div className="container">
                <div className="faq-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>{isWorker ? 'Everything workers need to know about ProWorker' : 'Everything you need to know about ProWorker'}</p>
                </div>

                <div className="faq-grid">
                    {faqs.map((faq, index) => {
                        const isOpen = openItems.includes(index);
                        return (
                            <div key={`faq-${index}`} className="faq-card">
                                <div
                                    className="faq-header-card"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <h3>{faq.question}</h3>
                                    <span className="faq-icon">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </div>
                                {isOpen && (
                                    <div className="faq-content">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="faq-contact">
                    <h3>Still have questions?</h3>
                    <p>Contact our support team for personalized assistance</p>
                    <a href="#contact" className="contact-btn">Get Help</a>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
