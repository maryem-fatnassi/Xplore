import React, { useState } from 'react';
import '../CSSComponents/navSection.css';
import ProfileSidebar from './ProfileSidebar';
import Notifications from './Notifications';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">X-Plore</div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to={"/home"}>Home</Link></li>
          <li><Link to={"/rarePlaces"}>Rare Places</Link></li>
          <li><Link to={"/challenges"}>Challenges</Link></li>
          <li><Link to={"/posts"}>Posts</Link></li>
                    
          <li className="mobile-icons">
            <span className="icon"><i class="fa-solid fa-bell"></i></span>
            <span className="icon"><i class="fa-solid fa-user"></i></span>
          </li>
        </ul>

        <div className="desktop-icons">
          {/* <button className="icon-btn" title="Notifications" onClick={() => setIsNotifOpen(true)}><i class="fa-solid fa-bell"></i></button> */}
          {
            location.pathname !== "/" ? <button className="icon-btn" title="Profile" onClick={() => setIsSidebarOpen(true)}><i class="fa-solid fa-user"></i></button> : <button className='auth-button' onClick={()=>navigate("/login")}>Login</button>
          }
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'close' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'close' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'close' : ''}`}></div>
        </div>
      </div>
      <ProfileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <Notifications isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </nav>
  );
};

export default Navbar;