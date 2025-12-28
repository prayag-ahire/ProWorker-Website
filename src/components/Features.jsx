import './Features.css';

function Features() {
    const features = [
        {
            icon: '⚡',
            title: 'Instant Booking',
            description: 'Real-time availability with instant confirmation',
            color: 'neon'
        },
        {
            icon: '📅',
            title: 'Smart Scheduling',
            description: 'Manage holidays, reschedule, and track appointments',
            color: 'blue'
        },
        {
            icon: '🔔',
            title: 'Live Notifications',
            description: 'Instant updates for bookings, confirmations, and reminders',
            color: 'neon'
        },
        {
            icon: '🕐',
            title: 'Real-Time Slots',
            description: 'See available time slots updated live',
            color: 'blue'
        },
        {
            icon: '📸',
            title: 'Media Reviews',
            description: 'Photos and videos in client reviews for authenticity',
            color: 'neon'
        },
        {
            icon: '🔐',
            title: 'Secure Authentication',
            description: 'Bank-level security with encrypted data protection',
            color: 'blue'
        },
        {
            icon: '🎓',
            title: 'Training Modules',
            description: 'Free skill-building videos for worker development',
            color: 'neon'
        },
        {
            icon: '💳',
            title: 'Transparent Pricing',
            description: 'Clear pricing breakdown - per visit or per hour',
            color: 'blue'
        }
    ];

    return (
        <section id="features" className="section section-glow">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">Powerful Features</h2>
                    <p className="section-subtitle">
                        Everything you need for seamless service booking and management
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-card scroll-animate delay-${((index % 4) + 1) * 100} ${feature.color}`}
                        >
                            <div className="feature-card-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
