import './HowItWorks.css';

function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Search a Worker',
            description: 'Browse verified professionals by service type, location, and availability',
            icon: '🔍'
        },
        {
            number: '02',
            title: 'Check Availability & Pricing',
            description: 'View real-time availability, hourly rates, and service details',
            icon: '💵'
        },
        {
            number: '03',
            title: 'Book Instantly',
            description: 'Select your preferred time slot and confirm your booking in seconds',
            icon: '⚡'
        },
        {
            number: '04',
            title: 'Worker Arrives & Completes Work',
            description: 'Your verified professional arrives on time and completes the job',
            icon: '✅'
        },
        {
            number: '05',
            title: 'Leave a Review',
            description: 'Rate your experience and share photos or videos to help others',
            icon: '⭐'
        }
    ];

    return (
        <section id="how-it-works" className="section section-glow">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">How It Works</h2>
                    <p className="section-subtitle">
                        Get professional help in 5 simple steps
                    </p>
                </div>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step-card scroll-animate delay-${(index + 1) * 100}`}
                        >
                            <div className="step-number">{step.number}</div>
                            <div className="step-icon">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            {index < steps.length - 1 && (
                                <div className="step-arrow">→</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="cta-box scroll-animate delay-500">
                    <div className="cta-content">
                        <h3>Ready to get started?</h3>
                        <p>Join thousands of satisfied clients today</p>
                    </div>
                    <a href="#download" className="btn btn-primary btn-large">
                        Download Now
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
