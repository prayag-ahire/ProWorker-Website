import './Features.css';
import ModernCard from './ModernCard';
import { useViewMode } from '../context/ViewModeContext';
import { clientFeatures, workerFeatures } from '../data/features';

function Features() {
    const isWorker = useViewMode() === 'worker';
    const features = isWorker ? workerFeatures : clientFeatures;

    return (
        <section id="features" className="section">
            <div className="container">
                <div className="section-header text-center mb-xl">
                    <div className="badge badge-outline mb-sm">{isWorker ? 'For Professionals' : 'Why Choose Us'}</div>
                    <h2>{isWorker ? 'Built for Professionals' : 'Powerful Features'}</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Everything you need for seamless service booking and management.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <ModernCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            className="scroll-animate"
                            hoverable={true}
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
