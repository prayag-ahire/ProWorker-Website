import './HowItWorks.css';
import { useViewMode } from '../context/ViewModeContext';

function HowItWorks() {
    const isWorker = useViewMode() === 'worker';

    const clientSteps = [
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

    const workerSteps = [
        { number: '01', icon: '📋', title: 'Create Your Profile', description: 'Sign up, add your skills, certifications, and set your service area and hourly rate.' },
        { number: '02', icon: '📲', title: 'Receive Booking Requests', description: 'Get instant notifications when clients near you request your service.' },
        { number: '03', icon: '✓', title: 'Accept & Confirm', description: 'Review the job details, accept bookings that fit your schedule, and confirm your arrival time.' },
        { number: '04', icon: '💰', title: 'Complete & Get Paid', description: 'Finish the job, collect your payment, and earn reviews that grow your reputation.' }
    ];

    const steps = isWorker ? workerSteps : clientSteps;

    return (
        <section id="how-it-works" className="section how-it-works-section">
            <div className="container">
                <div className="section-header scroll-animate">
                    <h2>How It Works</h2>
                    <p className="section-subtitle">
                        {isWorker ? 'Start getting bookings in just 4 steps' : 'Get professional help in just 4 simple steps'}
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
                        <h3>{isWorker ? 'Ready to start earning?' : 'Ready to get professional help?'}</h3>
                        <p>{isWorker ? 'Join thousands of professionals already on ProWorker' : 'Browse verified workers and book instantly'}</p>
                    </div>
                    {isWorker ? (
                        <button className="btn btn-primary btn-large" disabled>Join as a Worker</button>
                    ) : (
                        <button
                            className="btn btn-primary btn-large"
                            onClick={() => window.location.hash = '#search'}
                        >
                            Find a Worker Now
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
