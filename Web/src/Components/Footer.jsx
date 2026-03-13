import React from 'react';
import '../CSS/footer.css';

const Footer = () => {
  return (
    <footer className="unconventional-footer">
      {/* الجزء العلوي: شكل مائل يكسر حدة الصفحة */}
      <div className="footer-skew-bg"></div>

      <div className="footer-inner">
        {/* 1. الجانب الأيسر: بوصلة تقنية متحركة */}
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

        {/* 2. الجانب الأوسط: الشعار والروابط بشكل مبعثر مدروس */}
        <div className="footer-main-info">
          <h2 className="glitch-logo" data-text="X-PLORE">X-PLORE</h2>
          <nav className="scattered-nav">
            <a href="#home" className="nav-item">START_POINT</a>
            <a href="#challenges" className="nav-item">THE_TRIALS</a>
            <a href="#places" className="nav-item">HIDDEN_ZONES</a>
            <a href="#contact" className="nav-item">SIGNAL_BASE</a>
          </nav>
        </div>

        {/* 3. الجانب الأيمن: اشتراك "النشرة السرية" بتصميم مختلف */}
        <div className="footer-cta">
          <p>JOIN THE EXPEDITION</p>
          <div className="input-hex-wrapper">
            <input type="email" placeholder="Enter Agent Email..." />
            <button className="hex-btn">JOIN</button>
          </div>
        </div>
      </div>

      <div className="footer-legal-strip">
        <div className="terminal-text">TERMINAL_ID: 00-XPL-2026 // NO BOUNDARIES FOUND</div>
      </div>
    </footer>
  );
};

export default Footer;