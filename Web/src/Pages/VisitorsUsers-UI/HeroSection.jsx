import React, { useEffect, useState } from 'react';
import '../../CSS/VisitorsUsersCss/heroSection.css';

const HeroSection = () => {
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for the interactive light effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="bold-hero">
      {/* Background Image that slightly moves with mouse */}
      <div 
        className="bold-bg" 
        style={{ 
          transform: `translate(${mousePos.x / 50}px, ${mousePos.y / 50}px) scale(1.1)` 
        }}
      ></div>

      <div className="bold-overlay"></div>

      {/* Interactive Flashlight Effect */}
      <div 
        className="mouse-light" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>

      <div className="bold-container">
        <div className="bold-content">
          <h1 className="main-headline">
            RARE <br /> 
            <span className="outline-text">PLACES</span> <br />
            ELITE ONLY
          </h1>
          
          <div className="bold-footer">
            <div className="bold-desc">
              Stop visiting tourist traps. Access the world's most guarded locations and document the unseen.
            </div>
            
            <div className="bold-cta">
              <button className="register-now-btn">
                GET INSTANT ACCESS — FREE
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="corner-decor">EXPLORE_01</div>
    </section>
  );
};

export default HeroSection;