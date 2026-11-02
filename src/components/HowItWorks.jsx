import './HowItWorks.css';
import { useViewMode } from '../context/ViewModeContext';
import { Icon } from './Icons';
import { goToSearch } from '../utils/goToSearch';
import { CLIENT_PLAY_STORE_URL, WORKER_PLAY_STORE_URL } from '../data/appLinks';

function HowItWorks() {
    const isWorker = useViewMode() === 'worker';

    const clientSteps = [
        { number: '01', title: 'Search services or homemade goods', description: 'Search by trade or product—from electricians and plumbers to home-cooked food, custom clothes, and crafts nearby.', icon: 'search' },
        { number: '02', title: 'Compare seller & worker cards', description: 'Browse cards showing photos, specialty or trade, ratings, reviews, and proximity to your home.', icon: 'list' },
        { number: '03', title: 'View catalogs & portfolios', description: 'Check homemade menus, clothing styles, visit rates, opening hours, reviews, and photo or video portfolios.', icon: 'user' },
        { number: '04', title: 'Connect directly', description: 'Reach out using direct contact info. No booking fee, no platform commission, and 100% direct communication.', icon: 'phone' }
    ];

    const workerSteps = [
        { number: '01', icon: 'user', title: 'Create your profile or home shop', description: 'Add your photo, craft (trade, home food, tailoring, boutique, or products), bio, skills, and service radius—100% free.' },
        { number: '02', icon: 'tag', title: 'Set pricing, menus & schedule', description: 'Define item prices or visit charges, working days and hours, and mark leave days on your monthly calendar.' },
        { number: '03', icon: 'camera', title: 'Showcase your products & work', description: 'Upload photos and videos of your delicious dishes, stitched clothes, crafts, or completed trade jobs.' },
        { number: '04', icon: 'pin', title: 'Receive direct local orders', description: 'Neighbors discover your profile, read reviews, and contact you directly. Keep 100% of your earnings with 0% commission.' }
    ];

    const steps = isWorker ? workerSteps : clientSteps;

    return (
        <section id="how-it-works" className="section how-it-works-section">
            <div className="container">
                <div className="section-header scroll-animate">
                    <h2>How it works</h2>
                    <p className="section-subtitle">
                        {isWorker ? 'Build your trade or home business and get discovered in four steps' : 'Discover local services and homemade products in four simple steps'}
                    </p>
                </div>

                <div className="steps-container scroll-animate" key={isWorker ? 'worker-steps' : 'client-steps'}>
                    {steps.map((step, index) => (
                        <div key={`${isWorker ? 'w' : 'c'}-${step.number}`} className="step-card">
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
                        <h3>{isWorker ? 'Ready to sell homemade goods or offer skilled services?' : 'Ready to explore nearby services & homemade goods?'}</h3>
                        <p>{isWorker ? 'Create a free profile, showcase your food, clothes, or craftsmanship, and attract direct inquiries from nearby customers' : 'Browse profiles, ratings, and portfolios—then contact workers and home sellers directly'}</p>
                    </div>
                    {isWorker ? (
                        <a
                            className="btn btn-primary"
                            href={WORKER_PLAY_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download Worker & Seller app
                        </a>
                    ) : (
                        <div className="how-it-works-cta-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => goToSearch()}>
                                Explore nearby
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
