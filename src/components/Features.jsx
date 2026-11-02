import './Features.css';
import { useViewMode } from '../context/ViewModeContext';
import { clientFeatures, workerFeatures } from '../data/features';
import { Icon } from './Icons';

function Features() {
    const isWorker = useViewMode() === 'worker';
    const features = isWorker ? workerFeatures : clientFeatures;

    return (
        <section id="features" className="section">
            <div className="container">
                <div className="section-header text-center mb-xl">
                    <div className="badge badge-outline mb-sm">{isWorker ? 'For workers & home sellers' : 'For customers & buyers'}</div>
                    <h2>{isWorker ? 'Tools to build your business & sell from home' : 'Everything you need to discover & order locally'}</h2>
                    <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {isWorker
                            ? 'Showcase your skills or homemade products, set your prices and operating hours, and receive direct inquiries from nearby neighbors.'
                            : 'Browse rich profiles, authentic reviews, product portfolios, and transparent pricing—then connect directly with zero fees.'}
                    </p>
                </div>

                <div className="features-grid" key={isWorker ? 'worker-features' : 'client-features'}>
                    {features.map((feature) => (
                        <article
                            key={`${isWorker ? 'w' : 'c'}-${feature.title}`}
                            className="feature-item-card scroll-animate"
                        >
                            <div className="feature-item-icon">
                                <Icon name={feature.icon} size={22} />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
