import React, { useEffect, useState } from 'react';
import '../../CSS/VisitorsUsersCss/visitorsShowcase.css';
import { fetchPlaces } from '../../Services/placesService/rarePlaces';

const VisitorShowcase = () => {
  const [activeId, setActiveId] = useState(1);
const [places, setplaces] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/fetchPlaces/place")
      .then((res) => res.json())
      .then((data) => setplaces(data.slice(0,3)))
      .catch((error) => console.error(error))
  },[]);

  return (
    <section className="impact-section">
      {/* Background Giant Text */}
      {/* <div className="giant-bg-text" >EXPLORE</div> */}
      <div className="impact-container">
        <div className="impact-list">
          {places.map((place) => (
            <div 
              key={place._id} 
              className={`impact-item ${activeId === place._id ? 'active' : ''}`}
              onMouseEnter={() => setActiveId(place._id)}
            >
              <span className="impact-num">{place.id < 10 ? `0${place.id}` : place.id}</span>
              <h2 className="impact-name">{place.name}</h2>
              <span className="impact-coord">{place.coord}</span>
            </div>
          ))}
        </div>

        {/* The Dynamic Image Preview */}
        <div className="impact-preview-window">
          {places.map((place) => (
            <div 
              key={place._id}
              className={`preview-img ${activeId === place._id ? 'visible' : ''}`}
              style={{ backgroundImage: `url(${place.image})` }}
            >
              <div className="preview-overlay"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="impact-footer">
        <p>MEMBERSHIP UNLOCKS 1,200+ ENCRYPTED SITES</p>
        <button className="impact-cta-btn">ACCESS DATABASE</button>
      </div>
    </section>
  );
};

export default VisitorShowcase;