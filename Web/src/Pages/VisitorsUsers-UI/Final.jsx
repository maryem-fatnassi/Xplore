import React from 'react';
import '../../CSS/VisitorsUsersCss/final.css';

const Final = () => {
  return (
    <footer className="final-cta-section">
      <div className="cta-grid-bg"></div>
      
      <div className="cta-content">
        <h2 className="cta-main-text">
          READY TO <span className="blue-flash">LEAVE THE PATH?</span>
        </h2>
        <p className="cta-sub">
          Join 15,000+ elite explorers documenting the unseen world. 
          The next discovery is waiting for you.
        </p>
        
        <div className="cta-input-group">
          <button className="cta-final-btn">
            CREATE YOUR FREE PROFILE
            <span className="btn-glow"></span>
          </button>
        </div>
        
        {/* <div className="cta-footer-links">
          <span className="copyright">© 2026 UNMAPPED. ALL RIGHTS RESERVED.</span>
          <div className="social-mini">
            <span>INSTAGRAM</span>
            <span>TWITTER</span>
            <span>DISCORD</span>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Final;