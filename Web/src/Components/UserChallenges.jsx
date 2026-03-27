import React from 'react';
import { Award, Clock, CheckCircle2, MapPin, Target, Zap } from 'lucide-react';
import '../CSSComponents/userChallenges.css';

const UserChallenges = () => {
  const userChallenges = [
  {
    _id: "ch1",
    title: "The Silent Peaks",
    location: "Mount Everest Base, Nepal",
    category: "Mountain Trekking",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000",
    status: "completed",
    progress: 100,
    xp: 850,
  },
  {
    _id: "ch2",
    title: "Crystal Blue Dimension",
    location: "Vatnajökull Ice Caves, Iceland",
    category: "Arctic Exploration",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000",
    status: "in-progress",
    progress: 65,
    xp: 1200,
  },
  {
    _id: "ch3",
    title: "The Orange Glow",
    location: "Namib Desert, Namibia",
    category: "Desert Survival",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1000",
    status: "in-progress",
    progress: 30,
    xp: 500,
  },
  {
    _id: "ch4",
    title: "Deep Sea Mystery",
    location: "Great Barrier Reef, Australia",
    category: "Diving",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000",
    status: "completed",
    progress: 100,
    xp: 750,
  }
];
  return (
    <div className="user-challenges-page">
      <header className="achievements-header">
        <div className="header-content">
          <Award className="trophy-icon" size={48} color="#FB923C" />
          <h1>Mission Logs</h1>
          <p>Tracking your legendary footprints across the globe.</p>
        </div>
        
        <div className="stats-glass-bar">
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">COMPLETED</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">2,450</span>
            <span className="stat-label">TOTAL XP</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">Pro</span>
            <span className="stat-label">RANK</span>
          </div>
        </div>
      </header>

      <div className="challenges-grid">
        {userChallenges.map((challenge) => (
          <div key={challenge._id} className="challenge-card-premium">
            <div className="card-image-wrapper">
              <img src={challenge.image} alt={challenge.title} />
              <div className="status-badge" data-status={challenge.status}>
                {challenge.status === 'completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                {challenge.status.toUpperCase()}
              </div>
            </div>

            <div className="card-details">
              <div className="card-top">
                <span className="category-tag">{challenge.category}</span>
                <span className="xp-reward">+{challenge.xp} XP</span>
              </div>
              
              <h3>{challenge.title}</h3>
              <p className="location-info">
                <MapPin size={14} /> {challenge.location}
              </p>

              <div className="progress-container">
                <div className="progress-text">
                  <span>Mission Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="card-footer">
                <button className="view-details-btn">
                  VIEW MISSION LOG <Zap size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChallenges;