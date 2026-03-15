import React, { useEffect, useState } from 'react';
import '../../../CSS/RegisteredUsersCss/RarePlacesCSS/rarePlacesPage.css';
import PortalExperience from './PortalExperience';
import Navbar from '../../../Components/NavSection';
import Footer from '../../../Components/Footer';
import {fetchAllPlaces} from '../../../Services/placesService/allPlaces';

const RarePlacesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
   const [allPlaces, setAllPlaces] = useState([]);
   useEffect(()=>{
    fetchAllPlaces(setAllPlaces)
    console.log('hello from effect')
   },[]);

   useEffect(()=>{
    console.log("Places:",allPlaces)
   },[allPlaces])

const [isPortalOpen, setIsPortalOpen] = useState(false);
  return (
    <div className="slider-wrapper">
      <Navbar/>
      {/* الخلفية التي تتغير ديناميكياً مع المكان النشط */}
      <div className="dynamic-bg">
        {allPlaces.map((p, i) => (
          <img key={i} src={p.image} className={i === activeIndex ? 'active' : ''} alt="bg" />
        ))}
        <div className="dark-shroud"></div>
      </div>

      <div className="slider-content">
        <div className="info-panel">
          <span className="index-num">0{activeIndex + 1} / 0{allPlaces.length}</span>
          <h2 className="location-tag">📍 {allPlaces[activeIndex]?.location}</h2>
          <h1 className="main-title">{allPlaces[activeIndex]?.name}</h1>
          <p className="description">{allPlaces[activeIndex]?.desc}</p>
          <button className="expedition-btn" onClick={() => setIsPortalOpen(true)}>
  START EXPEDITION
</button>
        </div>

        {/* المصغرات (Navigation) - هذا الجزء يجعل التصميم قابلاً للتوسع */}
        <div className="thumbnails-nav">
          {allPlaces.map((p, i) => (
            <div 
              key={i} 
              className={`thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={p.image} alt="thumb" loading='lazy'/>
              <div className="thumb-overlay"></div>
            </div>
          ))}
        </div>
      </div>
      <PortalExperience 
  isOpen={isPortalOpen} 
  onClose={() => setIsPortalOpen(false)} 
  place={allPlaces[activeIndex]} 
/>

<Footer/>
    </div>
    
  );


};

export default RarePlacesPage;