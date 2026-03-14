import React, { useMemo } from 'react';
import '../CSSComponents/buttonExplore.css';

const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const GalaxyButton = ({ text = "Explore" }) => {
  // توليد بيانات النجوم مرة واحدة فقط لضمان الأداء
  const staticStars = useMemo(() => 
    Array.from({ length: 4 }).map(() => ({
      duration: RANDOM(6, 20),
      delay: RANDOM(1, 10),
    })), []);

  const orbitingStars = useMemo(() => 
    Array.from({ length: 20 }).map(() => ({
      angle: RANDOM(0, 360),
      duration: RANDOM(6, 20),
      delay: RANDOM(1, 10),
      alpha: RANDOM(40, 90) / 100,
      size: RANDOM(2, 6),
      distance: RANDOM(40, 200),
    })), []);

  return (
    <div className="galaxy-wrapper">
      <div className="galaxy-button-container">
        <button className="main-button">
          <span className="spark"></span>
          <span className="backdrop"></span>
          
          <span className="galaxy__container">
            {staticStars.map((star, i) => (
              <span 
                key={i} 
                className="star star--static" 
                style={{ '--duration': star.duration, '--delay': star.delay }}
              ></span>
            ))}
          </span>

          <span className="galaxy">
            <span className="galaxy__ring">
              {orbitingStars.map((star, i) => (
                <span 
                  key={i} 
                  className="star" 
                  style={{
                    '--angle': star.angle,
                    '--duration': star.duration,
                    '--delay': star.delay,
                    '--alpha': star.alpha,
                    '--size': star.size,
                    '--distance': star.distance
                  }}
                ></span>
              ))}
            </span>
          </span>
          
          <span className="text">{text}</span>
        </button>
      </div>
    </div>
  );
};

export default GalaxyButton;