import React from "react";
import NavSection from "../../../Components/NavSection";
// import video from "../../assets/homePage/group-video.mp4";
import "../../../CSS/RegisteredUsersCss/home.css";
import GalleryOverlay from "./GreetAnimation";
import ArchScroll from "./ArchScroll";
import VerticalSlider from "./RarePlaces";

function Home() {
  return (
    <div className="home-section">
      <NavSection />
      {/* <video src={video} className='group-video' loop muted autoPlay/> */}
      <GalleryOverlay /> 
      <ArchScroll />
       <VerticalSlider />
    </div>
  );
}

export default Home;
