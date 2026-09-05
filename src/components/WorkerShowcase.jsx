import './WorkerShowcase.css';

function WorkerShowcase() {
    return (
        <section className="section section-light">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">How It Works</h2>
                    <p className="section-subtitle">
                        Discover nearby skilled workers and contact them directly
                    </p>
                </div>

                <div className="app-showcase-grid scroll-animate delay-200">
                    {/* Screen 1 */}
                    <div className="mobile-screen fade-up">
                        <div className="mobile-bezel">
                            <div className="mobile-notch"></div>
                            <div className="screen-content">
                                <div className="screen-header">
                                    <div className="screen-avatar"></div>
                                    <div className="screen-title-bar"></div>
                                </div>
                                <div className="screen-body">
                                    <div className="screen-illustration illustration-search">
                                        <div className="circle-bg"></div>
                                        <div className="person-figure"></div>
                                    </div>
                                    <div className="screen-text">
                                        <h3>Explore</h3>
                                        <p>Search categories like plumber, electrician, carpenter, painter, cleaner, and more.</p>
                                    </div>
                                    <div className="screen-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Screen 2 */}
                    <div className="mobile-screen fade-up delay-100">
                        <div className="mobile-bezel">
                            <div className="mobile-notch"></div>
                            <div className="screen-content">
                                <div className="screen-header">
                                    <div className="screen-avatar"></div>
                                    <div className="screen-title-bar"></div>
                                </div>
                                <div className="screen-body">
                                    <div className="screen-illustration illustration-book">
                                        <div className="circle-bg orange"></div>
                                        <div className="person-figure sitting"></div>
                                    </div>
                                    <div className="screen-text">
                                        <h3>Discover</h3>
                                        <p>See nearby workers with ratings, reviews, and distance from you.</p>
                                    </div>
                                    <div className="screen-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Screen 3 */}
                    <div className="mobile-screen fade-up delay-200">
                        <div className="mobile-bezel">
                            <div className="mobile-notch"></div>
                            <div className="screen-content">
                                <div className="screen-header">
                                    <div className="screen-avatar"></div>
                                    <div className="screen-title-bar"></div>
                                </div>
                                <div className="screen-body">
                                    <div className="screen-illustration illustration-calor">
                                        <div className="circle-bg dark"></div>
                                        <div className="person-figure walking"></div>
                                    </div>
                                    <div className="screen-text">
                                        <h3>Connect</h3>
                                        <p>View full profiles, pricing, and portfolios—then contact workers directly.</p>
                                    </div>
                                    <div className="screen-button filled"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WorkerShowcase;
