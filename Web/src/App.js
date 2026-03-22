// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/RegisteredUsers-UI/Home-UI/Home";
import "bootstrap-icons/font/bootstrap-icons.css";
import RarePlacesPage from "./Pages/RegisteredUsers-UI/RarePlaces-UI_Page/rarePlaces";
import ChallengesPage from "./Pages/RegisteredUsers-UI/Challenges-UI_Page/ChallengesPage";
import FeedPage from "./Pages/RegisteredUsers-UI/PostsPage/FeedPage";
import LoginSignUp from "./Pages/LoginSignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroVisitor from "./Pages/VisitorsUsers-UI/HeroSection";
import HeroSection from "./Pages/VisitorsUsers-UI/HeroSection";
import Navbar from "./Components/NavSection";
import VisitorTeaser from "./Pages/VisitorsUsers-UI/VisitorTeaser";
// import Home from "./Pages/RegisteredUsers-UI/Home-UI/Home";

 function App(){
  return(
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LoginSignUp/>} />
          <Route path="/challenges" element={<FeedPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

// export default App 



// function App() {
//   return (
//     <div className="App">
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <RarePlacesPage/> */}
      {/* <ChallengesPage/> */}
      {/* <FeedPage/> */}
      {/* <LoginSignUp/>  */}
      {/* <HeroSection/> */}
      {/* <VisitorTeaser/> */}
     {/* </div>
  );
} */}

export default App; 
