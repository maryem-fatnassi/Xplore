import React, { use, useEffect, useState } from 'react';
import styles from '../CSSComponents/profile.module.css';
import { User, X, MapPin, Compass, Trophy, Settings, LogOut, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



// const defaultAvatar = "https://via.placeholder.com/110";
const ProfileSidebar = ({ isOpen, onClose }) => {
  // const saved = localStorage.getItem("user");
  // const user =  JSON.parse(saved)
  // console.log(saved)
  const [userData, setUserData] = useState({ userName: "", email: "" });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("user");
      if (saved) {
        setUserData(JSON.parse(saved));
      }
    }
  }, [isOpen]);

  const navigate = useNavigate();

  return (
<>
      {/* Background Overlay with higher contrast */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`} 
        onClick={onClose} 
      />

      {/* Main Sidebar Container */}
      <div className={`${styles.sidebarWrapper} ${isOpen ? styles.open : ''}`}>
        
        {/* Header - Branding & Close Button */}
        <div className={styles.header}>
          <div className={styles.explorerBadge}>EXPLORER</div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close profile">
            <X size={20} />
          </button>
        </div>

        {/* User Identity Section */}
        <div className={styles.userSection}>

<div className={styles.userSection}>
  <div className={styles.avatarContainer}>
    {userData.avatar ? (
      <img 
        src={userData.avatar} 
        alt="User avatar" 
        className={styles.avatarImage} 
      />
    ) : (
      <img 
        src={userData.gender === "female" ? "/images/unknown_user_female1.jpg" : "/images/unknown_user_male1.jpg"} 
        alt="Default avatar" 
        className={styles.avatarImage} 
      />
    )}
  </div>
  <h3 className={styles.userName}>{userData.userName}</h3> 
  <p className={styles.userEmail}>{userData.email}</p>
</div>

        </div>

        {/* Added Stats Bar - Vital for Exploration Apps */}
        {/* <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statCount}>42</span>
            <span className={styles.statLabel}>Expeditions</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>15</span>
            <span className={styles.statLabel}>Rare Spots</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>850</span>
            <span className={styles.statLabel}>XP Points</span>
          </div>
        </div> */}

        {/* Refined Navigation Links */}
        <nav className={styles.navLinks}>
          <NavigationItem icon={<User size={18}/>} text="My Profile" onClick={() => navigate("/my-profile")}/>
          {/* <NavigationItem icon={<Compass size={18}/>} text="My Expeditions" /> */}
          <NavigationItem icon={<Trophy size={18}/>} text="Challenges" onClick={() => navigate("/my-challenge")}/>
          {/* <NavigationItem icon={<Settings size={18}/>} text="Account Settings" /> */}
          
          <div style={{ marginTop: '20px' }} onClick={() => navigate("/login")}>
            <NavigationItem 
              icon={<LogOut size={18}/>} 
              text="Sign Out" 
              className={styles.logoutBtn} 
            />
          </div>
        </nav>

        {/* Brand Footer */}
        <div className={styles.footer}>
          <p className={styles.brandText}>X-Plore RARE DISCOVERIES</p>
        </div>
      </div>
    </>
  );
};

const NavigationItem = ({ icon, text, className = '' , onClick}) => (
  <button className={`${styles.navButton} ${className}`} onClick={onClick}>
    <span className={styles.navIconContainer}>{icon}</span>
    <span className={styles.navText}>{text}</span>
  </button>
);


export default ProfileSidebar;