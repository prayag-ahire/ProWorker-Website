import './AboutUs.css';
import prayagImg from '../assets/AboutUS/prayag.jpg?url';

const founder = {
    name: 'Prayag Ahire',
    role: 'Founder, Product Designer & Full-Stack Developer',
    image: prayagImg,
    quote: 'Your craft is your brand.',
    paragraphs: [
        'I created ProWorker from the ground up for India—developing both the customer and worker applications, designing the product experience, and building the business logic behind the platform.',
        'Every skilled worker and home-based creator in India is a business. Whether you are an electrician, a home chef delivering wholesome tiffins, a tailor stitching custom clothing, or an artisan making handmade goods from home—we help you build a digital identity, showcase photos and menus, earn genuine reviews, and become visible in your locality.',
        "At ProWorker, we don't believe platforms create value—Indian workers and home creators do. Our job is to give you the tools to sell and serve from home, build your own brand, and earn with dignity with 0% commission."
    ]
};

const principles = [
    { title: 'Build your identity', description: 'A complete profile, product photos, and specialties make your craft visible as a local brand.' },
    { title: 'Sell & earn from home', description: 'Empower homemakers, home chefs, tailors, and tradespeople to earn directly from their own home.' },
    { title: 'Charge what you are worth', description: 'Set your own item prices or service charges—with 0% commission and no platform cuts.' },
    { title: 'Own your reputation', description: 'Reviews and local neighborhood visibility belong to you, not the marketplace.' }
];

function AboutUs() {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <div className="badge badge-outline mb-sm">Our Story</div>
                    <h2>About Us</h2>
                    <p className="section-subtitle">
                        ProWorker is a workers platform built for India—connecting you with nearby skilled services and authentic homemade products, and empowering Indian home sellers and workers to own their brand.
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
