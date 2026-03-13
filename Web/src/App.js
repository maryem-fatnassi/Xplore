import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/RegisteredUsers-UI/Home-UI/Home";
import "bootstrap-icons/font/bootstrap-icons.css";
import GalaxyButton from "./Components/ButtonExplore";
import GreetAnimation from "./Pages/RegisteredUsers-UI/Home-UI/GreetAnimation";
import Navbar from "./Components/NavSection";
import HeroSection from "./Pages/RegisteredUsers-UI/Home-UI/HeroSection";
import AboutSection from "./Pages/RegisteredUsers-UI/AboutSection";
import RarePlaces from "./Pages/RegisteredUsers-UI/Home-UI/RarePlaces2";
import Challenges from "./Pages/RegisteredUsers-UI/Home-UI/Challenges";
import SocialFeed from "./Pages/RegisteredUsers-UI/Home-UI/SocialFeed";
import Footer from "./Components/Footer";
// import Login from "./Pages/Login";
// import Home from "./Pages/Home";
// import SignUp from "./Pages/SignUp";
// import PortalPreloader from "./Splash";
// import Preloader from "./Splash";
// import Splash from "./Components/Splash";
// import Home from "./Pages/RegisteredUsers-UI/Home-UI/Home";

// function App(){

//   return(
//     <BrowserRouter>
//       <Routes>
        {/* <Route path="/" element={<Login/>} />
        <Route path="/sign" element={<SignUp/>}/> */}
        {/* <Route path="/" element={<Splash/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App */}

// import React, { useState } from "react";
// import Splash from "./Components/Splash";
// import Home from "./Pages/RegisteredUsers-UI/Home";

// function App() {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <>
//       {!loaded && <Splash onFinish={() => setLoaded(true)} />}
//       {loaded && <Home/>}
//     </>
//   );
// }

// export default App;
// import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./Pages/RegisteredUsers-UI/Home-UI/Home";
// import ArchScroll from "./Pages/RegisteredUsers-UI/Home-UI/ArchScroll";
// import GalleryOverlay from "./Pages/RegisteredUsers-UI/Home-UI/GreetAnimation";
// import VerticalSlider from "./Pages/RegisteredUsers-UI/RarePlaces";
// import Splash from "./Components/Splash";
function App() {
  return (
    <div className="App">
      {/* <ArchScroll/> */}
      <Navbar/>
      {/* <VerticalSlider/> */}
      {/* <Splash/>*/}
      <HeroSection/>
      <AboutSection/>
      <RarePlaces/>
      <Challenges/>
      <SocialFeed/>
      <Footer/>
    </div>
  );
}

export default App; 
