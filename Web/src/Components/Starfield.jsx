import React, { useEffect, useRef } from 'react';
import '../CSS/starField.css';

const Starfield = () => {
  const universeRef = useRef(null);

  useEffect(() => {
    const starCount = 400;
    const maxTime = 30;
    const universe = universeRef.current;
    
    // Get dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < starCount; ++i) {
      const ypos = Math.round(Math.random() * height);
      const star = document.createElement("div");
      const speed = 7000 * (Math.random() * maxTime + 1);
      
      // Assign class based on speed (closer = faster/bigger)
      const starClass = "star" + (3 - Math.floor(speed / 1000 / 8));
      star.setAttribute("class", `star-base ${starClass}`);
      star.style.backgroundColor = "white";

      universe.appendChild(star);

      // Web Animations API
      star.animate(
        [
          { transform: `translate3d(${width}px, ${ypos}px, 0)` },
          { transform: `translate3d(-${Math.random() * 256}px, ${ypos}px, 0)` }
        ],
        {
          delay: Math.random() * -speed,
          duration: speed,
          iterations: Infinity // Changed from 1000 to Infinity
        }
      );
    }
  }, []);

  return <div id="universe" ref={universeRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />;
};

export default Starfield;