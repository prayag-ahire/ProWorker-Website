import './WhyProWorker.css';

function WhyProWorker() {
    const clientFeatures = [
        {
            icon: '✓',
            title: 'Verified & Background-Checked',
            description: 'Every worker goes through rigorous verification and background checks for your safety'
        },
        {
            icon: '📸',
            title: 'Real Photos, Videos & Reviews',
            description: 'See authentic reviews with photos and videos from real clients'
        },
        {
            icon: '⚡',
            title: 'Book Instantly',
            description: 'Check live availability and book your worker in under 2 minutes'
        },
        {
            icon: '📅',
            title: 'Easy Rescheduling',
            description: 'Plans changed? Reschedule or cancel bookings with just a tap'
        },
        {
            icon: '💰',
            title: 'No Hidden Charges',
            description: 'Transparent pricing with clear breakdown - see exactly what you pay'
        },
        {
            icon: '🛡️',
            title: 'Secure & Reliable',
            description: 'Your data is protected with bank-level security encryption'
        }
    ];

    const workerFeatures = [
        {
            icon: '💼',
            title: 'Increase Daily Earnings',
            description: 'Get regular bookings and maximize your income potential'
        },
        {
            icon: '🌟',
            title: 'Build Your Brand',
            description: 'Create a professional profile with your portfolio and certificates'
        },
        {
            icon: '📆',
            title: 'Manage Your Schedule',
            description: 'Set your availability, holidays, and working hours easily'
        },
        {
            icon: '📲',
            title: 'Receive Bookings Anytime',
            description: 'Get instant notifications when clients book your services'
        },
        {
            icon: '⭐',
            title: 'Earn from Reviews',
            description: 'Build reputation with 5-star reviews and grow your client base'
        },
        {
            icon: '🎓',
            title: 'Free Training Videos',
            description: 'Access skill-building content to improve your expertise'
        }
    ];

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
