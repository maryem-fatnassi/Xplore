import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../../CSS/RegisteredUsersCss/ChallengesCSS/challenges.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchAllChallenges } from "../../../Services/challengesService/allChallenges";


const ChallengesPage = () => {
  const [challengesData, setChallengesData] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetchAllChallenges(setChallengesData);
  }, []);
useEffect(() => {
  if(challengesData.length > 0 && !selected) setSelected(challengesData[0])
}, [challengesData,selected])

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  console.log(challengesData);
  function RecenterMap({ coords }) {
    const map = useMap();
    map.setView(coords);
    setTimeout(() => {
      map.invalidateSize(); // هذا الأمر السحري يعيد حساب أبعاد الخريطة لتملأ الحاوية
    }, 100);
    return null;
  }
 
  // if(challengesData.length > 0) setSelected(challengesData[0])
  return (
<div className="challenges">
      {/* 1. القائمة الجانبية للتحديات */}
      <div className="mission-list">
        <h3 className="list-label">ACTIVE_MISSIONS</h3>
        {challengesData.map((ch) => (
          <div
            key={ch?.id}
            className={`mission-item ${selected?.id === ch.id ? "active" : ""}`}
            onClick={() => setSelected(ch)}
          >
            <div
              className={`difficulty-dot ${ch.difficulty.toLowerCase()}`}
            ></div>
            <div className="mission-meta">
              <span className="m-title">{ch?.title}</span>
              <span className="m-type">{ch?.type.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. عرض تفاصيل التحدي (The Briefing) */}
      <div className="mission-briefing">
        <div className="briefing-header">
          <div className="header-text">
            <h1>{selected?.title}</h1>
            <p>{selected?.desc}</p>
          </div>
          <div className="stats-grid">
            <div className="stat">
              <span>JOINED:</span> <strong>{selected?.usersJoined}</strong>
            </div>
            <div className="stat">
              <span>TIME:</span> <strong>{selected?.duration}</strong>
            </div>
          </div>
        </div>

        <div className="briefing-content">
          <div className="equipment-section">
            <h4>REQUIRED_EQUIPMENT</h4>
            <ul>
              {selected?.equipment.map((item, i) => (
                <li key={i}> {item}</li>
              ))}
            </ul>
            <button className="deploy-btn">START MISSION</button>
          </div>

          <div className="image-frame">
            <img src={selected?.image} alt="mission" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>

      {/* 3. منطقة الخريطة أو الرادار */}
      <div className="location-radar">
        {selected?.type === "location" ? (
          <div className="map-wrapper">
            <h4 className="radar-label">GEO_COORDINATES</h4>
            <MapContainer
              key={`${selected?.location?.lat}-${selected?.location?.lng}`} // هذا السطر يضمن إعادة ريندر الخريطة عند تغيير الموقع
              center={[selected?.location?.lat, selected?.location?.lng]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[selected?.location?.lat, selected?.location?.lng]}
              />
              <RecenterMap
                coords={[selected?.location?.lat, selected?.location?.lng]}
              />
            </MapContainer>
            <div className="coords">
              LAT: {selected?.location?.lat} | LNG: {selected?.location?.lng}
            </div>
          </div>
        ) : (
          <div className="global-status">
            <div className="globe-icon">🌍</div>
            <h4>GLOBAL_MISSION</h4>
            <p>
              Deploy anywhere in the world. System is tracking your movement via
              satellite.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;
