import React from 'react';
import '../../CSS/RegisteredUsersCss/aboutSection.css';

const AboutSection = () => {
const features = [
    {
      title: "Untamed Places",
      desc: "We take you to the corners of the Earth left off the map, from forgotten caves to abandoned peaks.",
      icon: "🏔️"
    },
    {
      title: "Epic Challenges",
      desc: "Challenges designed to test your physical and mental limits. Are you ready to go beyond the impossible?",
      icon: "⚡"
    },
    {
      title: "Share the Journey",
      desc: "Share your adventures through live posts, inspire others with your photos, and join the elite league of explorers.",
      icon: "🌍"
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        {/* العنوان والوصف الرئيسي */}
        <div className="about-header">
          <span className="section-tag">Our Mission</span>
          <h2 className="about-title">WE ARE THE <span className="blue-gradient">X-PLORE</span> GENERATION</h2>
          <p className="about-lead">
            we are a community built on bold curiosity. Our mission is to break the routine of daily life by igniting the spirit of adventure, discovering the rarest corners of the world, and documenting every moment of challenge we live together
          </p>
        </div>

        {/* كروت الأهداف */}
        <div className="features-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* قسم إحصائي بسيط أو شعار جانبي */}
        <div className="about-footer">
          <p>"Don't just exist. Explore."</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;