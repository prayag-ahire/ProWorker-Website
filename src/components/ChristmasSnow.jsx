import { useEffect } from 'react';
import './ChristmasSnow.css';

function ChristmasSnow() {
    useEffect(() => {
        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = Math.random() > 0.7 ? '❄️' : '•';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
            
            document.querySelector('.snow-container').appendChild(snowflake);
            
            setTimeout(() => {
                snowflake.remove();
            }, 5000);
        };

        const interval = setInterval(createSnowflake, 300);
        
        return () => clearInterval(interval);
    }, []);

    return <div className="snow-container"></div>;
}

export default ChristmasSnow;