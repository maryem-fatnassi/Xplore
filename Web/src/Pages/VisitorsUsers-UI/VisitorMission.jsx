import React from 'react';
import '../../CSS/VisitorsUsersCss/visitorMission.css';

const VisitorMission = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="mission-header animate-fade">
          <span className="mission-tag">CORE PROTOCOL</span>
          <h2 className="mission-main-title">Why We Exist</h2>
          <div className="mission-underline"></div>
        </div>

        <div className="mission-grid">
          {/* Pillar 1: Discovery */}
          <div className="mission-pillar">
            <div className="pillar-icon">01</div>
            <h3>UNMAP THE WORLD</h3>
            <p>We don't show you tourist attractions. We provide coordinates to places that shouldn't exist—untouched, undocumented, and breathtaking.</p>
            <div className="pillar-glow"></div>
          </div>

          {/* Pillar 2: Challenge */}
          <div className="mission-pillar active-pillar">
            <div className="pillar-icon">02</div>
            <h3>PROVE YOUR LEGACY</h3>
            <p>Every location is a challenge. Document your arrival through our secure system and earn your place in the global hall of fame.</p>
            <div className="pillar-glow"></div>
          </div>

          {/* Pillar 3: Community */}
          <div className="mission-pillar">
            <div className="pillar-icon">03</div>
            <h3>THE ELITE CIRCLE</h3>
            <p>Connect with the 0.01% of travelers who dare to go further. Share intel, trade secrets, and dominate the leaderboard.</p>
            <div className="pillar-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitorMission;