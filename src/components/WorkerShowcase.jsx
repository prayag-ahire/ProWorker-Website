import './WorkerShowcase.css';

function WorkerShowcase() {
    return (
        <section className="section section-light">
            <div className="container">
                <div className="section-header text-center scroll-animate">
                    <h2 className="text-gradient mb-md">How It Works</h2>
                    <p className="section-subtitle">
                        Experience the easiest way to find and hire professionals
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
                                        <p>Browse various categories and find the perfect match for your needs.</p>
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
                                        <h3>Discovery</h3>
                                        <p>Discover top-rated professionals verified by our team.</p>
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
                                        <h3>Create</h3>
                                        <p>Book quickly, track real-time progress, and enjoy great service.</p>
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
