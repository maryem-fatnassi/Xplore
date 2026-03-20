import React from 'react';
import styles from '../CSSComponents/profile.module.css';
import { User, X, MapPin, Compass, Trophy, Settings, LogOut, Image as ImageIcon } from 'lucide-react';



// const defaultAvatar = "https://via.placeholder.com/110";
const ProfileSidebar = ({ isOpen, onClose }) => {
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
          {/* <div className={styles.avatarContainer}>
            <img 
              src={defaultAvatar} // استبدل برابط صورة المستخدم الحقيقي
              alt="User avatar" 
              className={styles.avatarImage} 
            />
          </div> */}
          <h3 className={styles.userName}>Alex Rivers</h3> {/* الاسم المذكور في صورتك */}
          <p className={styles.userEmail}>alex.rivers@explorer.com</p>
        </div>

        {/* Added Stats Bar - Vital for Exploration Apps */}
        <div className={styles.statsBar}>
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
        </div>

        {/* Refined Navigation Links */}
        <nav className={styles.navLinks}>
          <NavigationItem icon={<User size={18}/>} text="My Profile" />
          <NavigationItem icon={<Compass size={18}/>} text="My Expeditions" />
          <NavigationItem icon={<Trophy size={18}/>} text="Challenges" />
          <NavigationItem icon={<Settings size={18}/>} text="Account Settings" />
          
          <div style={{ marginTop: '20px' }}>
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

// مكون فرعي للأزرار لضمان نظافة الكود
const NavigationItem = ({ icon, text, className = '' }) => (
  <button className={`${styles.navButton} ${className}`}>
    <span className={styles.navIconContainer}>{icon}</span>
    <span className={styles.navText}>{text}</span>
  </button>
);


export default ProfileSidebar;