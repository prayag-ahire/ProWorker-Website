import { useState } from 'react';
import './FAQ.css';

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

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
        },
        {
            question: 'Can workers set their own prices?',
            answer: 'Yes! Workers have full control over their pricing. They can set hourly rates or per-visit charges based on the service type and their experience level.'
        },
        {
            question: 'Is my personal data secure?',
            answer: 'Absolutely. We use bank-level encryption to protect all user data. Your personal information, payment details, and communications are fully encrypted and never shared with third parties.'
        }
    ];

    return (
        <section id="faq" className="section section-dark">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">Frequently Asked Questions</h2>
                    <p className="section-subtitle">
                        Everything you need to know about ProWorker
                    </p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item scroll-animate delay-${((index % 4) + 1) * 100} ${openIndex === index ? 'open' : ''}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="faq-question">
                                <h4>{faq.question}</h4>
                                <div className="faq-toggle">
                                    {openIndex === index ? '−' : '+'}
                                </div>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-cta scroll-animate delay-500">
                    <p>Still have questions?</p>
                    <a href="#contact" className="btn btn-secondary">Contact Support</a>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
