import React, { useEffect, useState } from 'react';
import '../../../CSS/RegisteredUsersCss/heroSection.css';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  // لتفعيل الحركة عند تحميل الصفحة
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="hero-container">
      {/* طبقة تراكب لإعطاء عمق وتغميق الخلفية قليلاً */}
      <div className="hero-overlay"></div>
      
      {/* محتوى القسم الترحيبي */}
      <div className={`hero-content ${loaded ? 'fade-in' : ''}`}>
        <h2 className="hero-subtitle">ARE YOU READY TO</h2>
        <h1 className="hero-title">
          X-PLORE <span className="text-highlight">THE UNKNOWN</span>
        </h1>
        <p className="hero-description">
         "Where the map ends... your adventure begins. Join the community of first explorers, discover places where no foot has stepped before, and challenge the limits of your potential. The world is waiting for you."
        </p>
        
        <div className="hero-btns">
          <button className="btn-primary">Begin Your Challenge</button>
          <button className="btn-secondary">Discover Hidden Gems</button>
        </div>
      </div>

      {/* عنصر جرافيكي متحرك بسيط خلف النص (اختياري) */}
      <div className="bouncing-ball"></div>
    </section>
  );
};

export default HeroSection;