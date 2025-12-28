import { useState, useEffect } from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="logo-animation">
                    <div className="logo-text">ProWorker</div>
                    <div className="logo-badge">BETA</div>
                </div>

                <div className="loading-bar-container">
                    <div
                        className="loading-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="loading-text">
                    Loading amazing experience...
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;
