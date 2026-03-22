import React from 'react';
import '../../CSS/VisitorsUsersCss/visitorTeaser.css';

const VisitorTeaser = () => {
  const teaserCards = [
    { id: 1, title: "Crystal Caverns", location: "Unknown", difficulty: "Elite" },
    { id: 2, title: "Forgotten Temple", location: "Hidden", difficulty: "Hard" },
    { id: 3, title: "The Blue Abyss", location: "Redacted", difficulty: "Extreme" }
  ];

  return (
    <section className="teaser-section">
      <div className="teaser-header">
        <h2 className="teaser-subtitle">Beyond the Tourist Maps</h2>
        <h3 className="teaser-title">What the 0.01% are discovering right now</h3>
      </div>

      <div className="teaser-grid">
        {teaserCards.map((card) => (
          <div key={card.id} className="teaser-card">
            <div className="card-image-wrapper">
              <div className="blur-overlay">
                <span className="lock-icon">🔒</span>
                <p>ACCESS RESTRICTED</p>
              </div>
              {/* Image would go here as background */}
            </div>
            <div className="card-info">
              <h4>{card.title}</h4>
              <div className="card-meta">
                <span>Location: <strong>{card.location}</strong></span>
                <span className={`diff-badge ${card.difficulty.toLowerCase()}`}>
                  {card.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="teaser-cta">
        <p>This is only the surface. 1,200+ more locations are hidden behind the gates.</p>
        <button className="teaser-btn">UNLOCK ALL COORDINATES</button>
      </div>
    </section>
  );
};

export default VisitorTeaser;