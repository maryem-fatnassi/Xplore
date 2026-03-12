import React, { useEffect, useState } from "react";
import "../../../CSS/RegisteredUsersCss/rarePlaces.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import GalaxyButton from "../../../Components/ButtonExplore";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// const planets = [
//   {
//     name: "Socotra Island – Yemen",
//     desc: "A remote island famous for its alien-like dragon blood trees, unique flora, and untouched landscapes.",
//     color: "#c0a288",
//     image:
//       "https://i.natgeofe.com/n/81ae00be-9196-45c0-a487-a8d592983cd6/01_socotra_nationalgeographic_2708459.jpg",
//     location: { lat: 12.4634, lng: 53.8237 },
//   },
//   {
//     name: "Tsingy de Bemaraha – Madagascar",
//     desc: "A national park with sharp limestone pinnacles, deep canyons, and rare wildlife, creating a surreal, rugged landscape.",
//     color: "#8485d6",
//     image:
//       "https://www.tripsavvy.com/thmb/mEZjapSjEVErOsJVcT1wVxP68n4%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/tsingy-de-bemaraha-in-madagascar-1211285286-7b7db92120ff4c3f91b704827c2c7104.jpg",
//     location: { lat: -18.6667, lng: 44.75 },
//   },
//   {
//     name: "Waitomo Glowworm Caves – New Zealand",
//     desc: "A network of limestone caves illuminated by thousands of tiny glowworms, creating a magical, starry underground world.",
//     color: "#c8c9a0",
//     image:
//       "https://www.newzealand.com.au/assets/uploads/images/Waikato/Waitomo/waitomo-glowworm-caves-boat-tour-new-zealand.jpg",
//     location: { lat: -38.261894, lng: 175.098572 },
//   },
//   {
//     name: "Fly Geyser – Nevada, USA",
//     desc: "A man-made geothermal geyser known for its vibrant colors and unique, otherworldly formations in the Nevada desert.",
//     color: "#a0b5c2",
//     image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Fly_geyser.jpg",
//     location: { lat: 40.8557, lng: -119.3258 },
//   },
// ];

const VerticalSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [placeData,setPlaceData] = useState([]);
  const slidesLength = placeData.length;

  const changeSlide = (direction) => {
    if (direction === "up") {
      setActiveIndex((prev) => (prev + 1 >= slidesLength ? 0 : prev + 1));
    } else {
      setActiveIndex((prev) => (prev - 1 < 0 ? slidesLength - 1 : prev - 1));
    }
  };

  // نصوص: عكس ترتيب العناصر لتتوافق مع الصور
  const leftSlideStyle = {
    top: `-${(slidesLength - 1) * 100}vh`,
    transform: `translateY(${activeIndex * 100}vh)`,
  };

  const rightSlideStyle = {
    transform: `translateY(-${activeIndex * 100}vh)`,
  };

  // fetch data
  const fetchPlaces = ()=>{
    fetch("http://localhost:5000/fetchPlaces/place")
      .then((res) => res.json())
      .then((data) => setPlaceData(data))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="rare-places">
      <h1>RARE PLACES IN THE WORLD</h1>
      <div className="slider-container">
        {/* النصوص - نعرضها بالعكس */}
        <div className="left-slide" style={leftSlideStyle}>
          {placeData
            .slice(0)
            .reverse()
            .map((planet, index) => (
              <div key={index} style={{ color: planet.color }}>
                <h1>{planet.name}</h1>
                <p>{planet.desc}</p>
                <GalaxyButton />
                {/* <MapContainer
      center={[0, 0]} // مركزة عامة
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    > */}
                {/* <TileLayer
  url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
/> */}
                {/* <Marker key={index} position={[planet.location.lat, planet.location.lng]}>
          <Popup>
            {planet.name} <br /> Lat: {planet.location.lat}, Lng: {planet.location.lng}
          </Popup>
        </Marker>
    </MapContainer> */}
              </div>
            ))}
        </div>

        {/* الصور */}
        <div className="right-slide" style={rightSlideStyle}>
          {placeData.map((planet, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${planet.image})`,
                filter: "brightness(0.7)",
              }}
            ></div>
          ))}
        </div>

        {/* أزرار التحكم */}
        <div className="action-buttons">
          <button className="down-button" onClick={() => changeSlide("down")}>
            <i className="fa-solid fa-caret-down"></i>
          </button>
          <button className="up-button" onClick={() => changeSlide("up")}>
            <i className="fa-solid fa-caret-up"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerticalSlider;
