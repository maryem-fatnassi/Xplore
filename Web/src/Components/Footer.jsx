import React from 'react';
import '../CSSComponents/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="unconventional-footer">
      <div className="footer-skew-bg"></div>

      <div className="footer-inner">
        <div className="footer-compass-section">
          <div className="compass">
            <div className="compass-inner">
              <div className="north">N</div>
              <div className="needle"></div>
            </div>
          </div>
          <div className="coordinates">
            <span>LAT: 27.1751° N</span>
            <span>LONG: 78.0421° E</span>
          </div>
        </div>

        <div className="footer-main-info">
          <h2 className="glitch-logo" data-text="X-PLORE">X-PLORE</h2>
          <nav className="scattered-nav">
            <li className='nav-item'><Link to={"/home"}>Home</Link></li>
          <li className='nav-item'><Link to={"/rarePlaces"}>Rare Places</Link></li>
          <li className='nav-item'><Link to={"/challenges"}>Challenges</Link></li>
          <li className='nav-item'><Link to={"/posts"}>Posts</Link></li>
          </nav>
        </div>

        <div className="footer-cta">
          <p>JOIN THE EXPEDITION</p>
          <div className="input-hex-wrapper">
            <input type="email" placeholder="Enter Agent Email..." />
            <button className="hex-btn">JOIN</button>
          </div>
        </div>
      </div>

      <div className="footer-legal-strip">
        <div className="terminal-text">© 2026 UNMAPPED. ALL RIGHTS RESERVED.</div>
        <div className="terminal-text">xPloreWebsite@gmail.com</div>
      </div>
    </footer>
  );
};

export default Footer;