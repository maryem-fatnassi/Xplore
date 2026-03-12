import React, { useEffect, useState } from "react";
import "../CSS/splash.css";
import Home from "../Pages/RegisteredUsers-UI/Home-UI/Home";
import { useNavigate } from "react-router-dom";

export default function Splash({ onFinish }) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Preloader يدوم 4 ثواني
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
      navigate("/home", { replace: true });
    }, 8000);
    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  if (!show) return null;

  return (
    <div className="splash-container">
      {/* طبقات الطبيعة */}
      <div className="layer mountains"></div>
      <div className="layer forest"></div>
      <div className="layer lake"></div>

      {/* النقطة المركزية */}
      <div className="light-center"></div>

      {/* الشهب */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`shooting-star star-${i + 1}`} />
      ))}

      {/* الأوراق */}
      {[...Array(7)].map((_, i) => (
        <div key={i} className={`leaf leaf-${i + 1}`} />
      ))}

      {/* نص متحرك */}
      <div className="splash-text">Your adventure begins...</div>
    </div>
  );
}