// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/RegisteredUsers-UI/Home-UI/Home";
import "bootstrap-icons/font/bootstrap-icons.css";
import RarePlacesPage from "./Pages/RegisteredUsers-UI/RarePlaces-UI_Page/rarePlaces";
import ChallengesPage from "./Pages/RegisteredUsers-UI/Challenges-UI_Page/ChallengesPage";
import FeedPage from "./Pages/RegisteredUsers-UI/PostsPage/FeedPage";
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



function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      {/* <RarePlacesPage/> */}
      {/* <ChallengesPage/> */}
      <FeedPage/>
    </div>
  );
}

export default App; 
