import './WhyProWorker.css';
import { clientFeatures, workerFeatures } from '../data/features';

function WhyProWorker() {
    return (
        <section id="why" className="section section-dark">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">Why Choose ProWorker?</h2>
                    <p className="section-subtitle">
                        The most trusted platform connecting clients with professional service workers
                    </p>
                </div>

                <div className="why-grid">
                    <div className="why-column scroll-animate delay-100">
                        <div className="column-header">
                            <div className="column-icon">👥</div>
                            <h3 className="text-neon">For Clients</h3>
                            <p>Find trusted professionals for all your home service needs</p>
                        </div>

                        <div className="features-list">
                            {clientFeatures.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <div className="feature-icon">{feature.icon}</div>
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
                            <div className="column-icon">🔧</div>
                            <h3 className="text-blue">For Workers</h3>
                            <p>Grow your business and connect with clients who need you</p>
                        </div>

                        <div className="features-list">
                            {workerFeatures.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <div className="feature-icon">{feature.icon}</div>
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
