import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/RegisteredUsers-UI/Home-UI/Home";
import "bootstrap-icons/font/bootstrap-icons.css";
import GalaxyButton from "./Components/ButtonExplore";
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
      <Home/>
      {/* <VerticalSlider/> */}
      {/* <Splash/>*/}
    </div>
  );
}

export default App; 
