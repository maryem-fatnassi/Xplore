import React from 'react';
import '../../../CSS/RegisteredUsersCss/challenges.css';

const Challenges = () => {
  const challenges = [
    {
      title: "Sahara Night Trek",
      location: "Morocco",
      joined: "1.2k",
      difficulty: "Hard",
      img: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=400"
    },
    {
      title: "Deep Sea Dive",
      location: "Belize",
      joined: "850",
      difficulty: "Extreme",
      img: "https://www.dresseldivers.com/wp-content/uploads/deep-water-diving-buceo-profundo-4.jpg"
    },
    {
      title: "Alpine Peak Solo",
      location: "Switzerland",
      joined: "430",
      difficulty: "Pro",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400"
    },
    {
      title: "Amazon Survival",
      location: "Brazil",
      joined: "2.1k",
      difficulty: "Medium",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400"
    },
    {
      title: "Arctic Silence",
      location: "Norway",
      joined: "320",
      difficulty: "Hard",
      img: "https://images.unsplash.com/photo-1454177643390-7f100d1bbeec?q=80&w=400"
    }
  ];

  return (
    <section className="challenges-section">
      <div className="infinite-bg-element"></div>
      
      <div className="section-intro">
        <h2 className="glitch-text">ACTIVE CHALLENGES</h2>
        <p>Do you have what it takes to join the ranks?</p>
      </div>

      <div className="challenges-container">
        {challenges.map((task, index) => (
          <div className="challenge-card" key={index} style={{"--delay": `${index * 0.2}s`}}>
            <div className="card-badge">{task.difficulty}</div>
            <img src={task.img} alt={task.title} className="challenge-img" />
            
            <div className="challenge-details">
              <h3>{task.title} <span>{task.location}</span></h3>
              <div className="stats">
                <span className="user-count">👥 {task.joined} explorers joined</span>
              </div>
              <button className="join-btn">Accept Challenge</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Challenges;