import './AboutUs.css';
import prayagImg from '../assets/AboutUS/prayag.jpg';

const founder = {
    name: 'Prayag Ahire',
    role: 'Founder, Product Designer & Full-Stack Developer',
    image: prayagImg,
    quote: 'Your skill is your brand.',
    paragraphs: [
        'I created ProWorker from the ground up, developing both the client and worker applications, designing the product experience, and building the business logic behind the platform.',
        'Every skilled worker is a business. We help professionals build a digital identity, showcase quality work, earn genuine reviews, and become visible in their local area—so they can attract better-paying work through craftsmanship and reputation, not only cheap pricing.',
        "At ProWorker, we don't believe platforms create value—workers do. Our job is to give them the tools to grow their own brand and earn with dignity."
    ]
};

const principles = [
    { title: 'Build your identity', description: 'A complete profile, portfolio, and specialties make your skill visible as a brand.' },
    { title: 'Charge for quality', description: 'Set visit charges and service pricing that match your craftsmanship—not a race to the bottom.' },
    { title: 'Work on your terms', description: 'Choose working days, hours, and leave dates so customers know when you are available.' },
    { title: 'Own your reputation', description: 'Reviews and local visibility belong to you, not the marketplace.' }
];

function AboutUs() {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <div className="badge badge-outline mb-sm">Our Story</div>
                    <h2>About Us</h2>
                    <p className="section-subtitle">
                        A hyperlocal marketplace that helps customers discover nearby skilled workers—and helps professionals own their brand.
                    </p>
                </div>

                <div className="about-founder scroll-animate">
                    <div className="about-founder-photo">
                        <img
                            src={founder.image}
                            alt={founder.name}
                        />
                    </div>
                    <div className="about-founder-content">
                        <span className="about-founder-label">Founder</span>
                        <h3>{founder.name}</h3>
                        <p className="about-founder-role">{founder.role}</p>
                        <blockquote className="about-quote">
                            “{founder.quote}”
                        </blockquote>
                        {founder.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className="about-principles scroll-animate delay-100">
                    {principles.map((item) => (
                        <div key={item.title} className="about-principle">
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
