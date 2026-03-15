import React, { useEffect, useState } from 'react';
import '../../../CSS/RegisteredUsersCss/rarePlaces.css';
import { fetchPlaces } from "../../../Services/placesService/rarePlaces";

const RarePlaces = () => {
const [places, setPlaces] = useState([]);
useEffect(() => {
    fetchPlaces(setPlaces);
  }, []);

  return (
    <section className="rare-places">
      <div className="section-header">
        <h2 className="title-reveal">RARE PLACES</h2>
        <p>Curated locations for the world's bravest souls.</p>
      </div>

      <div className="places-grid">
        {places.map((place, index) => (
          <div className="place-card" key={index}>
            <div className="place-img-container">
              <img src={place.image} alt={place.name} className="place-img" />
              <div className="image-overlay"></div>
            </div>
            
            <div className="place-info">
              <div className="location-tag">
                <span className="map-icon">📍</span> {place.location}
              </div>
              <h3 className="place-name">{place.name}</h3>
              <p className="place-desc">{place.desc}</p>
              <button className="explore-btn">
                <span>View Coordinates</span>
                <div className="btn-line"></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RarePlaces;