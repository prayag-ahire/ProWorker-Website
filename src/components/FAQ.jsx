import { useState } from 'react';
import './FAQ.css';
import { useViewMode } from '../context/ViewModeContext';
import { WHATSAPP_URL } from '../data/contact';

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
            question: 'Can I find homemade food, clothes, and artisan products on ProWorker?',
            answer: 'Yes! ProWorker connects you directly with neighborhood home chefs, bakers, tiffin providers, custom tailors, clothing designers, and handmade craft creators, alongside skilled repair and maintenance professionals.'
        },
        {
            question: 'How do I find services and homemade items near me?',
            answer: 'Search by category—homemade food, tailoring, crafts, beautician, electrician, plumber, cleaner, and more. ProWorker shows nearby providers and home sellers based on distance so you can discover talent right around you.'
        },
        {
            question: 'Is ProWorker free for customers?',
            answer: 'Yes. ProWorker is completely free for customers. There is no booking fee, no commission markup, and no subscription. You discover sellers and workers on the app and connect with them directly.'
        },
        {
            question: 'How do I order or contact a home seller / worker?',
            answer: 'The customer contacts the seller or worker directly! After finding a product or service you like, you tap and contact them directly via phone or WhatsApp to confirm details and place your order. In-app delivery features are rolling out soon!'
        },
        {
            question: 'What can I see on a seller or worker profile?',
            answer: 'Each profile includes a photo, name, craft or trade, ratings and reviews, about section, product lists or visit charges, operating days, daily hours, and a full photo and video showcase of their creations or completed work.'
        },
        {
            question: 'Does ProWorker take a commission on my orders?',
            answer: 'No. ProWorker takes 0% commission. You deal directly with the local provider or home-based seller and pay them according to the prices listed on their profile.'
        }
    ];

    const workerFaqs = [
        {
            question: 'Can I sell homemade products, food, clothes, or crafts from home?',
            answer: 'Yes! ProWorker is specially built for both skilled trades and home-based creators. Whether you make homemade tiffins, bake cakes, stitch boutique clothes, design apparel, or craft handmade goods, you can create a free profile and sell directly from home to nearby neighbors.'
        },
        {
            question: 'How do I join ProWorker as a worker or home seller?',
            answer: 'Download the free Proworker Worker app from Google Play, then create your profile with your photo, category, skills or menu, product pricing, operating hours, and photo/video portfolio. A complete profile helps nearby customers find and contact you quickly.'
        },
        {
            question: 'Is the app free? Does ProWorker take any commission on my sales?',
            answer: 'Yes, it is 100% free. Creating your profile, listing products or services, managing your calendar, and uploading portfolios cost nothing. ProWorker takes 0% commission—you keep every rupee you earn.'
        },
        {
            question: 'How do customers discover my home business or trade?',
            answer: 'Nearby customers search for food, clothing, crafts, or local services and see your profile sorted by distance. They inspect your work photos, read reviews, check prices, and contact you directly via phone or WhatsApp.'
        },
        {
            question: 'What can I showcase on my profile?',
            answer: 'You can add your bio, list of products or service rates, daily operating hours, monthly leave schedule, and high-quality photo and video portfolios showing your dishes, stitched clothes, crafts, or completed trade projects.'
        },
        {
            question: 'Can I manage my own hours and holidays?',
            answer: 'Yes! You have full control. Set your weekly operating days and daily working hours, and mark leaves or vacation days on your calendar so customers know exactly when you are accepting orders.'
        }
    ];

    const faqs = isWorker ? workerFaqs : clientFaqs;

    return (
        <section className="faq-section" id="faq">
            <div className="container">
                <div className="faq-header">
                    <h2>Frequently asked questions</h2>
                    <p>{isWorker ? 'Everything skilled workers & home-based sellers need to know' : 'Everything customers need to know about finding nearby services & homemade products'}</p>
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
                    <p>Chat with us on WhatsApp for support or any query</p>
                    <a
                        href={WHATSAPP_URL}
                        className="contact-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
