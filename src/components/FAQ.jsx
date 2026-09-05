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
            question: 'How do I download the ProWorker customer app?',
            answer: 'The ProWorker customer app is free on Google Play. Search for ProWorker, or tap Get the app on this website to open the Play Store listing and install it.'
        },
        {
            question: 'How do I find workers on ProWorker?',
            answer: 'Search by profession or category—plumber, electrician, carpenter, painter, cleaner, AC technician, and many more. ProWorker shows nearby workers based on distance so you can discover skilled professionals around you quickly.'
        },
        {
            question: 'Is ProWorker free for customers?',
            answer: 'Yes. ProWorker is completely free for customers. There is no booking fee, no commission, and no subscription. You discover workers on the app and connect with them directly.'
        },
        {
            question: 'How do I contact a worker?',
            answer: 'There is currently no booking system. After you find a worker you like, you contact them directly using the contact information on their profile. You arrange the work between yourselves.'
        },
        {
            question: 'What can I see on a worker\'s profile?',
            answer: 'Each profile includes a photo, name, profession, average rating and reviews, about section, skills and specialties, visit charges or service pricing, areas they serve, working days, daily hours, monthly availability and leave schedule, plus photo and video portfolios.'
        },
        {
            question: 'What appears on each worker card?',
            answer: 'Worker cards show a profile photo, name, profession, rating, total review count, and distance from you—so you can compare nearby professionals at a glance.'
        },
        {
            question: 'How do reviews and ratings work?',
            answer: 'After work is completed, customers can leave genuine ratings and reviews. You can read these to compare workers and choose reliable professionals. Over time, quality work builds a stronger reputation.'
        },
        {
            question: 'Does ProWorker take a commission or process payments?',
            answer: 'No. ProWorker does not take a commission and does not currently offer online payments, in-app chat, or internet calling. You contact the worker directly and pay them according to the pricing on their profile.'
        }
    ];

    const workerFaqs = [
        {
            question: 'How do I join ProWorker as a worker?',
            answer: 'Download the ProWorker Worker app and create a free professional profile with your photo, name, profession, about section, experience, skills, specialties, and service areas. A complete profile increases credibility and helps nearby customers find you.'
        },
        {
            question: 'Is the Worker app free? Does ProWorker take a commission?',
            answer: 'Yes, the app is completely free. Creating a profile, adding pricing, managing your schedule, and uploading a portfolio cost nothing. ProWorker does not take a commission and is not a booking platform today—customers contact you directly.'
        },
        {
            question: 'How do customers find me and get in touch?',
            answer: 'Nearby customers search by profession, see your profile, ratings, pricing, availability, and portfolio, then contact you using the information on your profile. There is no in-app booking, chat, calling, or payments yet.'
        },
        {
            question: 'What can I add to my profile?',
            answer: 'You can add a profile photo, full name, profession, about section, experience, skills and specialties, service areas, visit charges and service pricing, working days and hours, a monthly leave calendar, plus photo and video portfolios of completed work.'
        },
        {
            question: 'How do ratings and reviews help me grow?',
            answer: 'After you complete work, customers can leave ratings and reviews. Over time this public reputation reflects quality, reliability, and professionalism. Higher ratings improve trust and local visibility—so you can charge for quality, not only compete on price.'
        },
        {
            question: 'Can I control when customers should contact me?',
            answer: 'Yes. Set weekly working days and daily hours, and mark leave days, holidays, and unavailable dates on your monthly calendar so customers can see when you are normally available.'
        }
    ];

    const faqs = isWorker ? workerFaqs : clientFaqs;

    return (
        <section className="faq-section" id="faq">
            <div className="container">
                <div className="faq-header">
                    <h2>Frequently asked questions</h2>
                    <p>{isWorker ? 'Everything skilled workers need to know about building their local brand' : 'Everything customers need to know about finding nearby workers'}</p>
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
