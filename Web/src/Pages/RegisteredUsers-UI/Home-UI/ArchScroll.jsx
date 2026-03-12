import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../../CSS/RegisteredUsersCss/archScroll.css';

// تسجيل الإضافة الخاصة بالسكول
gsap.registerPlugin(ScrollTrigger);

const ArchScroll = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // تعريف التايم لاين
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 0.5,
          pin: true,
          start: "top top",
          end: "+=150%"
        }
      })
      .to(".box", {
        force3D: true,
        duration: 1,
        xPercent: 100,
        ease: "power1.inOut",
        stagger: { amount: 1 }
      })
      .to(".box", { 
        ease: "power1.out", 
        duration: 1, 
        rotation: "45deg" 
      }, 0)
      .to(".box", { 
        ease: "power1.in", 
        duration: 1, 
        rotation: "0deg" 
      }, 1);
    }, sectionRef);

    // تنظيف الأنيميشن عند مسح المكون من الذاكرة
    return () => ctx.revert();
  }, []);

  // إنشاء 100 مربع تلقائياً
  const boxes = Array.from({ length: 100 });

  return (
    <section className="trigger" ref={sectionRef}>
      <span className="down">The World Is..</span>
      <span className="up">Bigger Than You Think</span>
      
      <div className="boxes-container">
        {boxes.map((_, index) => (
          <div key={index} className="box"></div>
        ))}
      </div>
    </section>
  );
};

export default ArchScroll;