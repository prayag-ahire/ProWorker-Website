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
                    <p className="categories-kicker">{isWorker ? 'Your trade' : 'Hire nearby'}</p>
                    <h2>{isWorker ? 'Built for every skilled professional' : 'Popular services'}</h2>
                    <p className="section-subtitle">
                        {isWorker
                            ? 'Plumbers, electricians, carpenters, painters, cleaners, AC technicians, beauticians, and more—each with a professional profile customers can find locally.'
                            : 'Tap a category to find nearby workers. Compare ratings, distance, and prices, then connect directly.'}
                    </p>
                </div>

                <div className="svc-grid">
                    {serviceCategories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            className="svc-card"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <div className="svc-card-media">
                                <img
                                    src={category.image}
                                    alt={`${category.name} near me in India — hire on ProWorker`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="svc-card-body">
                                <span className="svc-card-icon" aria-hidden="true">{category.icon}</span>
                                <div>
                                    <h3>{category.name}</h3>
                                    <p>{isWorker ? 'Show your work' : category.hint}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServiceCategories;
