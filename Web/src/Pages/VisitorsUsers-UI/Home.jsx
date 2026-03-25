import React from 'react'
import HeroSection from './HeroSection';
import VisitorMission from './VisitorMission';
import VisitorShowcase from './VisitorShowcase';
import VisitorTeaser from './VisitorTeaser';
import Final from './Final';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/NavSection';

function VisitorsHome() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <VisitorMission/>
        <VisitorShowcase/>
        <Final/>
        <Footer/>
    </div>
  )
}

export default VisitorsHome;