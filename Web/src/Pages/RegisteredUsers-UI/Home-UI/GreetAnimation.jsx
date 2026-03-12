import React, { useState, useEffect } from 'react';
import '../../../CSS/RegisteredUsersCss/GreetAnimation.css';

const Explorer = () => {
  // const [key, setKey] = useState(0); // لإعادة تشغيل الأنيميشن عند الضغط
  const text = "Welcome Explorer";
  
  // const replay = () => setKey(prev => prev + 1);

  return (
    <div className="explorer-body">
      <div className="greet-container">
        <h1 className="title">
          {text.split("").map((char, index) => {
            // حساب المتغيرات التي كانت Splitting.js توفرها
            const distancePercent = index / (text.length - 1);
            return (
              <span 
                key={index} 
                className="char" 
                data-char={char.toLowerCase()}
                style={{ 
                  '--char-index': index,
                  '--char-offset': index,
                  '--distance-percent': distancePercent,
                  whiteSpace: char === " " ? "pre" : "normal"
                }}
              >
                {char}
              </span>
            );
          })}
        </h1>

        <div className="dot">
          <div className="dot-inner">
            <svg className="dot-wave background" viewBox="0 0 800 800">
              <path d="M799.09 90s11.04 0 0 0c-80.714 0-79.621-90-200-90-120.377 0-118.607 90-200 90-81.391 0-81.215-90-200-90C80.308 0 78.68 89.29-.91 90c-6.946.062 0 0 0 0v510h800V90z" />
            </svg>
            <svg className="dot-wave foreground" viewBox="0 0 800 800">
              <path d="M799.09 90s11.04 0 0 0c-80.714 0-79.621-90-200-90-120.377 0-118.607 90-200 90-81.391 0-81.215-90-200-90C80.308 0 78.68 89.29-.91 90c-6.946.062 0 0 0 0v510h800V90z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;