import './ServiceCategories.css';
import { useViewMode } from '../context/ViewModeContext';
import { serviceCategories } from '../data/categories';
import { goToSearch } from '../utils/goToSearch';

function ServiceCategories() {
    const isWorker = useViewMode() === 'worker';

    const handleCategoryClick = (category) => {
        if (isWorker) {
            window.location.hash = '#features';
            return;
        }
        goToSearch(category.browseAll ? '' : category.name);
    };

    return (
        <section id="categories" className="section categories-section">
            <div className="container">
                <div className="section-header">
                    <p className="categories-kicker">{isWorker ? 'Your trade' : 'Popular services'}</p>
                    <h2>{isWorker ? 'Built for every skilled professional' : 'Choose a service nearby'}</h2>
                    <p className="section-subtitle">
                        {isWorker
                            ? 'Plumbers, electricians, carpenters, painters, cleaners, AC technicians, beauticians, and more—each with a professional profile customers can find locally.'
                            : 'Browse by profession, then compare nearby workers by distance, ratings, pricing, and portfolios.'}
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
                            <img src={category.image} alt="" />
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServiceCategories;
