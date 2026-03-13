import React from "react";
import NavSection from "../../../Components/NavSection";
// import video from "../../assets/homePage/group-video.mp4";
import "../../../CSS/RegisteredUsersCss/home.css";
import GalleryOverlay from "./GreetAnimation";
import ArchScroll from "./ArchScroll";
import VerticalSlider from "./RarePlaces";
import Starfield from "../../../Components/Starfield";

function Home() {
  return (
    <div className="home-section">
      <NavSection />
      {/* <video src={video} className='group-video' loop muted autoPlay/> */}
    </div>
  );
}

export default Home;

// #00ff80