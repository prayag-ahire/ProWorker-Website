import React from 'react';
import './UttarayanBackground.css';

const UttarayanBackground = () => {
  return (
    <div className="uttarayan-background">
      <div className="sky-gradient"></div>
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
      <div className="sun"></div>
      <div className="festival-sparkles">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`sparkle sparkle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default UttarayanBackground;