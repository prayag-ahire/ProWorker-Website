import { useState } from 'react';
import './Hero.css';
import { useViewMode } from '../context/ViewModeContext';
import { serviceCategories } from '../data/categories';
import { Icon } from './Icons';
import { goToSearch } from '../utils/goToSearch';
import { CLIENT_PLAY_STORE_URL, WORKER_PLAY_STORE_URL } from '../data/appLinks';
import heroCustomer from '../assets/marketplace/hero-customer.jpg?url';
import heroWorker from '../assets/marketplace/hero-worker.jpg?url';

function Hero() {
    const isWorker = useViewMode() === 'worker';
    const [profession, setProfession] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        goToSearch(profession);
    };

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-copy">
                        <p className="hero-kicker">
                            {isWorker ? 'ProWorker Worker' : 'Hyperlocal marketplace'}
                        </p>
                        <h1>
                            {isWorker
                                ? 'Build your digital identity. Get discovered nearby.'
                                : 'Find nearby skilled workers. Contact them directly.'}
                        </h1>
                        <p className="hero-subtitle">
                            {isWorker
                                ? 'A free professional app to showcase your work, set prices and availability, and receive direct customer inquiries. No booking platform. No commission.'
                                : 'Search plumbers, electricians, carpenters, painters, cleaners, AC technicians, and more. Compare profiles, ratings, pricing, and availability—then connect yourself.'}
                        </p>

                        <div className="hero-actions">
                            <a
                                className="btn btn-primary btn-hero-download"
                                href={isWorker ? WORKER_PLAY_STORE_URL : CLIENT_PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {isWorker ? 'Download Worker app' : 'Download Customer app'}
                            </a>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    window.location.assign(isWorker ? '/#how-it-works' : '/#categories');
                                }}
                            >
                                {isWorker ? 'How it works' : 'Browse services'}
                            </button>
                        </div>

                        {!isWorker && (
                            <form className="hero-search" onSubmit={handleSearch}>
                                <label className="hero-search-field">
                                    <span>Service</span>
                                    <select
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                    >
                                        <option value="">All professions</option>
                                        {serviceCategories
                                            .filter((category) => !category.browseAll)
                                            .map((category) => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                </label>
                                <button type="submit" className="btn btn-primary">
                                    <Icon name="search" size={18} />
                                    Find nearby workers
                                </button>
                            </form>
                        )}

                        <div className="hero-chips">
                            {(isWorker
                                ? ['Free to join', 'No commission', 'Direct inquiries']
                                : ['Free for customers', 'No booking fee', 'Direct contact']
                            ).map((chip) => (
                                <span key={chip} className="hero-chip">
                                    <Icon name="check" size={14} />
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="hero-media">
                        <img
                            src={isWorker ? heroWorker : heroCustomer}
                            alt={isWorker ? 'Skilled worker building a professional brand' : 'Customer meeting a nearby skilled worker'}
                        />
                        <div className="hero-media-card">
                            {isWorker ? (
                                <>
                                    <strong>Visible nearby</strong>
                                    <span>Profile, portfolio, and pricing in one place</span>
                                </>
                            ) : (
                                <>
                                    <strong>Sorted by distance</strong>
                                    <span>See ratings, visit charges, and availability</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
