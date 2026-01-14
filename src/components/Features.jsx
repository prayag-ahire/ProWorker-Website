import './Features.css';
import ModernCard from './ModernCard';

function Features() {
    const features = [
        {
            icon: '🔍',
            title: 'Smart Discovery',
            description: 'Find verified professionals matched to your exact needs in seconds.'
        },
        {
            icon: '⭐',
            title: 'Verified Reviews',
            description: 'Real ratings & feedback from customers just like you.'
        },
        {
            icon: '📅',
            title: 'Flexible Booking',
            description: 'Choose when and how with instant availability and real-time scheduling.'
        },
        {
            icon: '💰',
            title: 'Transparent Pricing',
            description: 'No hidden fees - see exact prices before you book.'
        },
        {
            icon: '🔒',
            title: 'Safe & Secure',
            description: 'All professionals are verified and insured for your peace of mind.'
        },
        {
            icon: '🛡️',
            title: 'Guaranteed Quality',
            description: 'If you are not satisfied, we will send someone else for free.'
        }
    ];

    return (
        <section id="features" className="section">
            <div className="container">
                <div className="section-header text-center mb-xl">
                    <div className="badge badge-outline mb-sm">Why Choose Us</div>
                    <h2>Powerful Features</h2>
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
