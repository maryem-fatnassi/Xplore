import React, { useEffect, useState } from 'react';
import '../../../CSS/RegisteredUsersCss/RarePlacesCSS/rarePlacesPage.css';
import PortalExperience from './PortalExperience';

const RarePlacesPage = () => {

  const [activeIndex, setActiveIndex] = useState(0);
const [isPortalOpen, setIsPortalOpen] = useState(false);
  const places = [
    { name: "Door to Hell", loc: "Turkmenistan", img: "https://threejs.org/examples/textures/uv_grid_opengl.jpg", desc: "A gateway of eternal fire in the desert." },
    { name: "Socotra Island", loc: "Yemen", img: "https://www.360cities.net/image/homhil-socotra#917.39,-44.48,80.0", desc: "The most alien-looking place on Earth." },
    { name: "Salar de Uyuni", loc: "Bolivia", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200", desc: "A salt desert that mirrors the heavens." },
    { name: "Fly Geyser", loc: "Nevada, USA", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200", desc: "A technicolor geothermal masterpiece." }
  ];

  return (
    <div className="slider-wrapper">
      {/* الخلفية التي تتغير ديناميكياً مع المكان النشط */}
      <div className="dynamic-bg">
        {places.map((p, i) => (
          <img key={i} src={p.img} className={i === activeIndex ? 'active' : ''} alt="bg" />
        ))}
        <div className="dark-shroud"></div>
      </div>

      <div className="slider-content">
        <div className="info-panel">
          <span className="index-num">0{activeIndex + 1} / 0{places.length}</span>
          <h2 className="location-tag">📍 {places[activeIndex].loc}</h2>
          <h1 className="main-title">{places[activeIndex].name}</h1>
          <p className="description">{places[activeIndex].desc}</p>
          <button className="expedition-btn" onClick={() => setIsPortalOpen(true)}>
  START EXPEDITION
</button>
        </div>

        {/* المصغرات (Navigation) - هذا الجزء يجعل التصميم قابلاً للتوسع */}
        <div className="thumbnails-nav">
          {places.map((p, i) => (
            <div 
              key={i} 
              className={`thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={p.img} alt="thumb" />
              <div className="thumb-overlay"></div>
            </div>
          ))}
        </div>
      </div>
      <PortalExperience 
  isOpen={isPortalOpen} 
  onClose={() => setIsPortalOpen(false)} 
  place={places[activeIndex]} 
/>
    </div>
    
  );


};

export default RarePlacesPage;