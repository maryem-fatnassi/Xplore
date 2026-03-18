import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../../CSS/RegisteredUsersCss/ChallengesCSS/challenges.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchAllChallenges } from "../../../Services/challengesService/allChallenges";
import Navbar from "../../../Components/NavSection";
import Footer from "../../../Components/Footer";
import { ShieldAlert, CheckCircle, X, Info, Zap } from 'lucide-react'; 

const ChallengesPage = () => {
  const [challengesData, setChallengesData] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const handleJoinClick = (challenge) => {
    setSelected(challenge);
    setShowModal(true);
  };
  useEffect(() => {
    fetchAllChallenges(setChallengesData);
  }, []);
  useEffect(() => {
    if (challengesData.length > 0 && !selected) setSelected(challengesData[0]);
  }, [challengesData, selected]);

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
      map.invalidateSize(); 
    }, 100);
    return null;
  }

  const filteredChallenges = challengesData.filter((ch)=>ch.difficulty.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <div>
      <Navbar />
      <div className="challenges">
        {/* Side bar*/}
        <div className="mission-list">
          <div className="search-container">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Search by Difficulty Levels..." type="text" onChange={(e)=>setinputValue(e.target.value)}/>
            </div>
          <h3 className="list-label">ACTIVE_MISSIONS</h3>
          {filteredChallenges.map((ch) => (
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

        {/* The Briefing*/}
        <div className="mission-briefing">
          <div className="challenge-header">
            <p><span>Challenge Difficulty Levels :</span> Easy / Medium / Hard / Extreme</p>
            <div className="stats-grid">
              <div className="stat">
                <span>JOINED:</span> <strong>{selected?.usersJoined}</strong>
              </div>
              <div className="stat">
                <span>TIME:</span> <strong>{selected?.duration}</strong>
              </div>
            </div>
          </div>
          <div className="briefing-header">
            <div className="header-text">
              <h1>{selected?.title}</h1>
              <p>{selected?.desc}</p>
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
              <button className="deploy-btn" onClick={() => handleJoinClick(selected)}>JOIN CHALLENGE</button>
            </div>

            {/* --- Mission Briefing Modal --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="mission-modal-glass">
            <header className="modal-header">
              <div className="header-title">
                <ShieldAlert size={20} color="#00aaff" />
                <span>MISSION_BRIEFING: {selected?.title}</span>
              </div>
              <button className="close-modal" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </header>

            <div className="modal-body">
              <section className="brief-section">
                <h4><Info size={14} /> DESCRIPTION</h4>
                <p>{selected?.desc || "Prepare for a high-stakes expedition into uncharted territory. Mental and physical resilience is required."}</p>
              </section>

              <section className="rules-section">
                <h4><CheckCircle size={14} /> MISSION_RULES</h4>
                <ul>
                  <li>Maintain GPS signal at all times.</li>
                  <li>Do not leave the designated expedition zone.</li>
                  <li>Document key milestones via the X-Plore Logbook.</li>
                  <li>Strict adherence to local environmental laws.</li>
                </ul>
              </section>

              <section className="warning-box">
                <Zap size={18} />
                <p>BY PROCEEDING, YOU ACCEPT FULL RESPONSIBILITY FOR YOUR SAFETY DURING THIS CHALLENGE.</p>
              </section>
            </div>

            <footer className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>ABORT</button>
              <button className="confirm-btn" onClick={() => {
                alert("Mission Accepted! Tracking engaged.");
                setShowModal(false);
              }}>
                I ACCEPT & DEPLOY
              </button>
            </footer>
          </div>
        </div>
      )}

            <div className="image-frame">
              <img src={selected?.image} alt="mission" />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>

        {/* Map container*/}
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
                Deploy anywhere in the world. System is tracking your movement
                via satellite.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ChallengesPage;
