import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import '../../../CSS/RegisteredUsersCss/RarePlacesCSS/portalExperience.css';

// مكون العالم الـ 360
const Panorama = ({ image }) => {
  const texture = useTexture(image);
  texture.image.crossOrigin = "anonymous";
  return (
    
    <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
};

const PortalExperience = ({ isOpen, onClose, place }) => {
  if (!isOpen) return null;
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  return (
    <div className={`portal-overlay ${isOpen ? 'active' : ''}`}>
      {/* زر الخروج من المهمة */}
      <button className="exit-portal" onClick={onClose}>EXIT EXPEDITION</button>
      
      {/* واجهة المعلومات التكتيكية فوق الـ 3D */}
      <div className="hud-display">
        <div className="hud-corner top-left">
          <span>SYSTEM: ACTIVE</span>
          <span>LOCATION: {place.name}</span>
        </div>
        <div className="hud-center-aim"></div>
      </div>

      {/* عالم الـ 3D */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 0.1] }}>
          <Suspense fallback={null}>
            <Panorama image={ place.image} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              rotateSpeed={-0.5} // لجعل الحركة طبيعية مع الماوس
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* صوت الطبيعة (اختياري - يحتاج ملف صوتي) */}
      <audio autoPlay loop src={place.audio} />
    </div>
  );
};

export default PortalExperience;