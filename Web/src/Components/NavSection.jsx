import React, { useState } from 'react';
import '../CSSComponents/navSection.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">X-Plore</div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#rare-places">Rare places</a></li>
          <li><a href="#challenges">Challenges</a></li>
          <li><a href="#rare-places">Posts</a></li>
          <li><a href="#contact">Contact</a></li>
          
          <li className="mobile-icons">
            <span className="icon"><i class="fa-solid fa-bell"></i></span>
            <span className="icon"><i class="fa-solid fa-user"></i></span>
          </li>
        </ul>

        <div className="desktop-icons">
          <button className="icon-btn" title="Notifications"><i class="fa-solid fa-bell"></i></button>
          <button className="icon-btn" title="Profile"><i class="fa-solid fa-user"></i></button>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'close' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'close' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'close' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;