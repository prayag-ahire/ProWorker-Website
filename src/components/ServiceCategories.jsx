import './ServiceCategories.css';
import { useViewMode } from '../context/ViewModeContext';
import { serviceCategories } from '../data/categories';
import { goToSearch } from '../utils/goToSearch';

function ServiceCategories() {
    const isWorker = useViewMode() === 'worker';

    const handleCategoryClick = (category) => {
        if (isWorker) {
            window.location.assign('/#features');
            return;
        }
        goToSearch(category.browseAll ? '' : category.name);
    };

    return (
        <section id="categories" className="section categories-section">
            <div className="container">
                <div className="section-header">
                    <p className="categories-kicker">{isWorker ? 'Your trade' : 'Popular services'}</p>
                    <h2>{isWorker ? 'Built for every skilled professional' : 'Find skilled service professionals nearby'}</h2>
                    <p className="section-subtitle">
                        {isWorker
                            ? 'Plumbers, electricians, carpenters, painters, cleaners, AC technicians, beauticians, and more—each with a professional profile customers can find locally.'
                            : 'Browse by profession, compare nearby workers by distance, ratings, pricing, and portfolios—then connect directly.'}
                    </p>
                </div>

                <div className="categories-grid">
                    {serviceCategories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            className="category-tile"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <img src={category.image} alt={category.name} />
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Banner introducing the separate Store */}
                <div className="store-intro-banner">
                    <div className="store-intro-icon">🏪</div>
                    <div className="store-intro-text">
                        <h4>Looking for homemade products or want to sell from home? Discover <strong>ProWorker Store</strong></h4>
                        <p>From fresh daily tiffins and baked treats to custom tailoring and handcrafted decor—connect directly with nearby neighbors with 0% platform cuts. In-app delivery rolling out soon!</p>
                    </div>
                    <a href="/store" className="btn btn-store-banner">
                        Explore Store →
                    </a>
                </div>
            </div>
        </section>
    );
}

export default ServiceCategories;
