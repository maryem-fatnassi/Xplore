import React, { useState } from 'react';
import '../CSSComponents/navSection.css';
import ProfileSidebar from './ProfileSidebar';
import Notifications from './Notifications';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">X-Plore</div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="/home">Home</a></li>
          <li><a href="/rarePlaces"><Link to={"/rarePlaces"}></Link> Rare places</a></li>
          <li><a href="/challenges">Challenges</a></li>
          <li><a href="/posts">Posts</a></li>
                    
          <li className="mobile-icons">
            <span className="icon"><i class="fa-solid fa-bell"></i></span>
            <span className="icon"><i class="fa-solid fa-user"></i></span>
          </li>
        </ul>

        <div className="desktop-icons">
          {/* <button className="icon-btn" title="Notifications" onClick={() => setIsNotifOpen(true)}><i class="fa-solid fa-bell"></i></button> */}
          <button className="icon-btn" title="Profile" onClick={() => setIsSidebarOpen(true)}><i class="fa-solid fa-user"></i></button>
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