import './HowItWorks.css';
import { useViewMode } from '../context/ViewModeContext';
import { Icon } from './Icons';
import { goToSearch } from '../utils/goToSearch';
import { CLIENT_PLAY_STORE_URL } from '../data/appLinks';

function HowItWorks() {
    const isWorker = useViewMode() === 'worker';

    const clientSteps = [
        { number: '01', title: 'Search nearby workers', description: 'Search by profession or category and browse nearby workers based on distance from you.', icon: 'search' },
        { number: '02', title: 'Compare worker cards', description: 'Each card shows a profile photo, name, profession, rating, review count, and distance.', icon: 'list' },
        { number: '03', title: 'View the full profile', description: 'See about, skills, specialties, visit charges, service areas, working hours, leave schedule, and photo or video portfolio.', icon: 'user' },
        { number: '04', title: 'Contact directly', description: 'Reach out using the worker\'s contact information. There is no booking system, no booking fee, and no commission.', icon: 'phone' }
    ];

    const workerSteps = [
        { number: '01', icon: 'user', title: 'Create your profile', description: 'Add your photo, profession, about section, experience, skills, specialties, and the areas you serve—for free.' },
        { number: '02', icon: 'tag', title: 'Set pricing and availability', description: 'Define visit charges and service pricing, working days and hours, and mark leave days on your monthly calendar.' },
        { number: '03', icon: 'camera', title: 'Showcase your work', description: 'Upload photo and video portfolios so nearby customers can see your craftsmanship before they contact you.' },
        { number: '04', icon: 'pin', title: 'Get discovered locally', description: 'Customers nearby find your profile, read reviews, and send direct inquiries. There is no booking system or commission.' }
    ];

    const steps = isWorker ? workerSteps : clientSteps;

    return (
        <section id="how-it-works" className="section how-it-works-section">
            <div className="container">
                <div className="section-header scroll-animate">
                    <h2>How it works</h2>
                    <p className="section-subtitle">
                        {isWorker ? 'Build your brand and get discovered nearby in four steps' : 'Find nearby workers and contact them in four simple steps'}
                    </p>
                </div>

                <div className="steps-container scroll-animate">
                    {steps.map((step, index) => (
                        <div key={step.number} className="step-card">
                            <div className="step-icon">
                                <Icon name={step.icon} size={22} />
                            </div>
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            {index < steps.length - 1 && <div className="step-connector" />}
                        </div>
                    ))}
                </div>

                <div className="how-it-works-cta scroll-animate">
                    <div>
                        <h3>{isWorker ? 'Ready to build your professional brand?' : 'Ready to find nearby workers?'}</h3>
                        <p>{isWorker ? 'Create a free profile, showcase your work, and attract direct inquiries from nearby customers' : 'Browse profiles, ratings, and portfolios—then contact workers directly'}</p>
                    </div>
                    {isWorker ? (
                        <button className="btn btn-primary" disabled>Create your profile</button>
                    ) : (
                        <div className="how-it-works-cta-actions">
                            <button className="btn btn-secondary" onClick={() => goToSearch()}>
                                Find a worker
                            </button>
                            <a
                                className="btn btn-primary"
                                href={CLIENT_PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get the app
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
