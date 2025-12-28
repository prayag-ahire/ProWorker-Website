import React, { useEffect, useState } from 'react';
import './KiteAnimation.css';

const KiteAnimation = () => {
  const [kites, setKites] = useState([]);

  const kiteColors = [
    'kite-red', 'kite-yellow', 'kite-green', 
    'kite-blue', 'kite-orange', 'kite-pink', 'kite-purple'
  ];

  useEffect(() => {
    // Create initial kites
    const initialKites = Array.from({ length: 8 }, (_, index) => ({
      id: index,
      color: kiteColors[index % kiteColors.length],
      delay: index * 2,
      top: Math.random() * 60 + 10, // Random position between 10% and 70%
      duration: 15 + Math.random() * 10, // Random duration between 15-25s
    }));
    
    setKites(initialKites);

    // Add new kites periodically
    const interval = setInterval(() => {
      setKites(prevKites => {
        const newKite = {
          id: Date.now(),
          color: kiteColors[Math.floor(Math.random() * kiteColors.length)],
          delay: 0,
          top: Math.random() * 60 + 10,
          duration: 15 + Math.random() * 10,
        };
        
        // Keep only recent kites to prevent memory issues
        const recentKites = prevKites.slice(-6);
        return [...recentKites, newKite];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="kite-container">
      {kites.map(kite => (
        <div
          key={kite.id}
          className={`kite ${kite.color} wind-effect`}
          style={{
            top: `${kite.top}%`,
            animationDelay: `${kite.delay}s`,
            animationDuration: `${kite.duration}s`,
          }}
        >
          <div className="kite-trail"></div>
        </div>
      ))}
    </div>
  );
};

export default KiteAnimation;