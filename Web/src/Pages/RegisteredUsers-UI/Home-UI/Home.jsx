import React from "react";
// import video from "../../assets/homePage/group-video.mp4";
import "../../../CSS/RegisteredUsersCss/home.css";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import RarePlaces from "./RarePlaces2";
import Challenges from "./Challenges";
import SocialFeed from "./SocialFeed";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/NavSection";

function Home() {
  return (
    <div className="home-section">
      <Navbar/>
      <HeroSection/>
      <AboutSection/>
      <RarePlaces/>
      <Challenges/>
      <SocialFeed/>
      <Footer/>
    </div>
  );
}

export default Home;

// #00ff80