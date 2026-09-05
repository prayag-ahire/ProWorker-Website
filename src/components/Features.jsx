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
                    <div className="badge badge-outline mb-sm">{isWorker ? 'For professionals' : 'For customers'}</div>
                    <h2>{isWorker ? 'Tools to grow your local brand' : 'Everything you need to choose with confidence'}</h2>
                    <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {isWorker
                            ? 'Showcase your skills, pricing, availability, and portfolio so nearby customers can find you and contact you directly.'
                            : 'Transparent profiles, ratings, portfolios, pricing, and availability—then contact workers directly.'}
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <article key={feature.title} className="feature-item-card scroll-animate">
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
