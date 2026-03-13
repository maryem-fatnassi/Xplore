import React from 'react';
import '../../../CSS/RegisteredUsersCss/rarePlaces.css';

const RarePlaces = () => {
  const places = [
    {
      name: "The Door to Hell",
      location: "Derweze, Turkmenistan",
      desc: "A natural gas field collapsed into a cavern that has been burning continuously since 1971.",
      img: "https://ychef.files.bbci.co.uk/1280x720/p09kb54k.jpg",
    },
    {
      name: "Socotra Island",
      location: "Yemen",
      desc: "Home to the alien-looking Dragon Blood trees, it feels like another planet entirely.",
      img: "https://i.natgeofe.com/n/81ae00be-9196-45c0-a487-a8d592983cd6/01_socotra_nationalgeographic_2708459.jpg",
    },
    {
      name: "Tsingy de Bemaraha",
      location: "Madagascar",
      desc: "A national park with sharp limestone pinnacles, deep canyons, and rare wildlife, creating a surreal, rugged landscape.",
      img: "https://www.tripsavvy.com/thmb/mEZjapSjEVErOsJVcT1wVxP68n4%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/tsingy-de-bemaraha-in-madagascar-1211285286-7b7db92120ff4c3f91b704827c2c7104.jpg",
    },
    {
      name: "Fly Geyser",
      location: "Nevada, USA",
      desc: "An accidental man-made geothermal geyser that has grown into a multi-colored masterpiece.",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/41/Fly_geyser.jpg",
    }
  ];

  return (
    <section className="rare-places">
      <div className="section-header">
        <h2 className="title-reveal">HIDDEN GEMS</h2>
        <p>Curated locations for the world's bravest souls.</p>
      </div>

      <div className="places-grid">
        {places.map((place, index) => (
          <div className="place-card" key={index}>
            <div className="place-img-container">
              <img src={place.img} alt={place.name} className="place-img" />
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