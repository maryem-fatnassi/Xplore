import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../CSS/RegisteredUsersCss/ChallengesCSS/challenges.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const challengesData = [
  {
    id: 1,
    title: "Sleepless in Sahara",
    type: "global",
    difficulty: "Hard",
    usersJoined: 1240,
    equipment: ["Thermal Blanket", "Sand Filter", "GPS"],
    duration: "48 Hours",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1000",
    desc: "Survive two nights in open dunes without a tent."
  },
  {
    id: 2,
    title: "The Silent Crater",
    type: "location",
    location: { lat: 40.2522, lng: 58.4397 }, // Darvaza
    difficulty: "Extreme",
    usersJoined: 85,
    equipment: ["Heat Suit", "Oxygen Tank", "Steel Ropes"],
    duration: "12 Hours",
    image: "https://images.unsplash.com/photo-1578330103632-602016259020?q=80&w=1000",
    desc: "Descent 20 meters into the gas crater perimeter."
  },
  {
    
title :"Sleep in the Desert - Tunisia",
image :"https://excursionstunisia.com/wp-content/uploads/2023/12/SAHARANSKY-NEWYEAR1.jpg",
difficulty : "medium",
usersJoined :4,
type :"location",
location :{
lat :33.4667,
lng : 9.0167},
equipment :["Tent Water" , "Flashlight"],
duration:"1 Night",
  }
];

const ChallengesPage = () => {
  const [selected, setSelected] = useState(challengesData[0]);
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function RecenterMap({ coords }) {
  const map = useMap();
  map.setView(coords);
  setTimeout(() => {
    map.invalidateSize(); // هذا الأمر السحري يعيد حساب أبعاد الخريطة لتملأ الحاوية
  }, 100);
  return null;
}

  return (
    <div className="challenges">
      {/* 1. القائمة الجانبية للتحديات */}
      <div className="mission-list">
        <h3 className="list-label">ACTIVE_MISSIONS</h3>
        {challengesData.map(ch => (
          <div 
            key={ch.id} 
            className={`mission-item ${selected.id === ch.id ? 'active' : ''}`}
            onClick={() => setSelected(ch)}
          >
            <div className={`difficulty-dot ${ch.difficulty.toLowerCase()}`}></div>
            <div className="mission-meta">
              <span className="m-title">{ch.title}</span>
              <span className="m-type">{ch.type.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. عرض تفاصيل التحدي (The Briefing) */}
      <div className="mission-briefing">
        <div className="briefing-header">
          <div className="header-text">
            <h1>{selected.title}</h1>
            <p>{selected.desc}</p>
          </div>
          <div className="stats-grid">
            <div className="stat"><span>JOINED:</span> <strong>{selected.usersJoined}</strong></div>
            <div className="stat"><span>TIME:</span> <strong>{selected.duration}</strong></div>
          </div>
        </div>

        <div className="briefing-content">
          <div className="equipment-section">
            <h4>REQUIRED_EQUIPMENT</h4>
            <ul>
              {selected.equipment.map((item, i) => (
                <li key={i}> {item}</li>
              ))}
            </ul>
            <button className="deploy-btn">START MISSION</button>
          </div>
          
          <div className="image-frame">
             <img src={selected.image} alt="mission" />
             <div className="image-overlay"></div>
          </div>
        </div>
      </div>

      {/* 3. منطقة الخريطة أو الرادار */}
      <div className="location-radar">
        {selected.type === 'location' ? (
          <div className="map-wrapper">
             <h4 className="radar-label">GEO_COORDINATES</h4>
<MapContainer 
  key={`${selected.location.lat}-${selected.location.lng}`} // هذا السطر يضمن إعادة ريندر الخريطة عند تغيير الموقع
  center={[selected.location.lat, selected.location.lng]} 
  zoom={13} 
  style={{ height: "300px", width: "100%" }}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[selected.location.lat, selected.location.lng]} />
  <RecenterMap coords={[selected.location.lat, selected.location.lng]} />
</MapContainer>
             <div className="coords">LAT: {selected.location.lat} | LNG: {selected.location.lng}</div>
          </div>
        ) : (
          <div className="global-status">
            <div className="globe-icon">🌍</div>
            <h4>GLOBAL_MISSION</h4>
            <p>Deploy anywhere in the world. System is tracking your movement via satellite.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;