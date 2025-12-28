import { useState } from 'react';
import './FAQ.css';

function FAQ() {
    const [openItems, setOpenItems] = useState([]);

    const toggleFAQ = (index) => {
        setOpenItems(prev => 
            prev.includes(index) 
                ? prev.filter(item => item !== index)
                : [...prev, index]
        );
    };

    const faqs = [
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
            question: 'How do workers get paid?',
            answer: 'Workers receive payments directly after completing jobs. ProWorker provides a secure payment gateway that ensures fast and reliable transfers to your bank account or digital wallet.'
        },
        {
            question: 'What services are available on ProWorker?',
            answer: 'We offer a wide range of home services including plumbing, electrical work, cleaning, cooking, tutoring, babysitting, carpentry, painting, and many more. New service categories are added regularly.'
        },
        {
            question: 'How do reviews work?',
            answer: 'After each service, clients can leave reviews with ratings and upload photos or videos. This helps maintain quality and lets other clients make informed decisions. Workers with better reviews get more visibility.'
        }
    ];

    return (
        <section className="faq-section">
            <div className="container">
                <div className="faq-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>Everything you need to know about ProWorker</p>
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