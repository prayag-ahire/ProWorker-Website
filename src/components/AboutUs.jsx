import './AboutUs.css';
import prayagImg from '../assets/AboutUS/prayag.jpg';

const founder = {
    name: 'Prayag Ahire',
    role: 'Founder, Product Designer & Full-Stack Developer',
    image: prayagImg,
    quote: 'Workers are not labor—they are brands.',
    paragraphs: [
        'I created ProWorker from the ground up, developing both the client and worker applications, designing the product experience, and building the business logic behind the platform.',
        'Our mission is to give skilled professionals complete ownership of their work. Every worker should have the freedom to set their own prices, earn 100% of what they deserve without unnecessary cuts, choose when to work or take leave, and build a reputation that belongs to them.',
        "At ProWorker, we don't believe platforms create value—workers do. Our job is to give them the tools to grow their own brand and earn with dignity."
    ]
};

const principles = [
    { title: 'Set your own prices', description: 'Every worker decides what their time and skill are worth.' },
    { title: 'Earn 100%', description: 'Keep what you deserve—no unnecessary cuts from the platform.' },
    { title: 'Work on your terms', description: 'Choose when to take jobs and when to take leave.' },
    { title: 'Own your reputation', description: 'The brand you build belongs to you, not the marketplace.' }
];

function AboutUs() {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <div className="badge badge-outline mb-sm">Our Story</div>
                    <h2>About Us</h2>
                    <p className="section-subtitle">
                        Built from the ground up so skilled professionals can own their work, their prices, and their brand.
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
