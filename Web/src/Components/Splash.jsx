import React, { useEffect, useState } from 'react';
import '../CSSComponents/splash.css';
import { useNavigate } from 'react-router-dom';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);

    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/visitors");
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  if (!loading) return null;

  return (
    <div className="preloader-wrapper">
      <div className="scanner-container">
        <div className="radar-circle"></div>
        
        <div className="loader-logo">
          X<span>-</span>PLORE
        </div>

        <div className="scan-info">
          <div className="scan-line"></div>
          <p className="status-text">SYSTEM_SCANNING...</p>
          <p className="percent-text">{percent}%</p>
          <p className="coord-text">LAT: 34.0522 N / LONG: 118.2437 W</p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;