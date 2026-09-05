import './WhyProWorker.css';
import { clientFeatures, workerFeatures } from '../data/features';
import { Icon } from './Icons';

function WhyProWorker() {
    return (
        <section id="why" className="section section-dark">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="mb-md">Why Choose ProWorker?</h2>
                    <p className="section-subtitle">
                        A hyperlocal marketplace that helps customers discover trusted nearby workers—without commissions or booking fees
                    </p>
                </div>

                <div className="why-grid">
                    <div className="why-column scroll-animate delay-100">
                        <div className="column-header">
                            <h3>For customers</h3>
                            <p>Find nearby skilled workers and contact them directly—free, with no booking fees</p>
                        </div>

                        <div className="features-list">
                            {clientFeatures.map((feature) => (
                                <div key={feature.title} className="feature-item">
                                    <div className="feature-icon"><Icon name={feature.icon} size={20} /></div>
                                    <div className="feature-content">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="why-column scroll-animate delay-200">
                        <div className="column-header">
                            <h3>For workers</h3>
                            <p>Build your digital identity, get discovered nearby, and receive direct customer inquiries—for free</p>
                        </div>

                        <div className="features-list">
                            {workerFeatures.map((feature) => (
                                <div key={feature.title} className="feature-item">
                                    <div className="feature-icon"><Icon name={feature.icon} size={20} /></div>
                                    <div className="feature-content">
                                        <h4>{feature.title}</h4>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyProWorker;
