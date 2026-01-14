import './HowItWorks.css';

function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Search for a Professional',
            description: 'Browse verified professionals by service type, location, and availability. See real ratings and reviews.',
            icon: '🔍'
        },
        {
            number: '02',
            title: 'View Details & Pricing',
            description: 'Check availability, hourly rates, experience, certifications, and verified client reviews.',
            icon: '💼'
        },
        {
            number: '03',
            title: 'Book & Confirm',
            description: 'Select your preferred time slot and confirm your booking instantly. No hidden charges.',
            icon: '✓'
        },
        {
            number: '04',
            title: 'Service Completed',
            description: 'Professional arrives on time and completes your work with quality assurance.',
            icon: '⭐'
        }
    ];

    return (
        <section id="how-it-works" className="section how-it-works-section">
            <div className="container">
                <div className="section-header scroll-animate">
                    <h2>How It Works</h2>
                    <p className="section-subtitle">
                        Get professional help in just 4 simple steps
                    </p>
                </div>

                <div className="steps-container scroll-animate">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="step-card"
                        >
                            <div className="step-icon">{step.icon}</div>
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className="step-connector"></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="how-it-works-cta scroll-animate">
                    <div>
                        <h3>Ready to get professional help?</h3>
                        <p>Browse verified workers and book instantly</p>
                    </div>
                    <button 
                        className="btn btn-primary btn-large"
                        onClick={() => window.location.hash = '#search'}
                    >
                        Find a Worker Now
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
