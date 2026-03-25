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
import VisitorMission from "./Pages/VisitorsUsers-UI/VisitorMission";
import Footer from "./Components/Footer";
import VisitorShowcase from "./Pages/VisitorsUsers-UI/VisitorShowcase";
import Final from "./Pages/VisitorsUsers-UI/Final";
import VisitorsHome from "./Pages/VisitorsUsers-UI/Home";
import AdminPage from "./Pages/Admin-UI/AdminPage";
import MyProfile from "./Pages/Profile/MyProfile";

 function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VisitorsHome/>} />
         <Route path="/login" element={<LoginSignUp/>} />
         <Route path="/home" element={<Home/>}/>
          <Route path="rarePlaces" element={<RarePlacesPage/>}/>
          <Route path="challenges" element={<ChallengesPage/>}/>
          <Route path="/posts" element={<FeedPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>} />
         <Route path="/my-profile" element={<MyProfile/>} />
      </Routes>
    </BrowserRouter>
  )
}

// export default App 



// function App() {
//   return (
//     <div className="App">
      {/* <Navbar/> */}
      {/* <Home/>
      <RarePlacesPage/> */}
      {/* <ChallengesPage/> */}
      {/* <FeedPage/>
      <LoginSignUp/> 
      <HeroSection/>
      <VisitorTeaser/>
      <VisitorMission/>
      <VisitorShowcase/>
      <Final/>
      <Footer/> */}
//      </div>
//   );
// }

export default App; 
