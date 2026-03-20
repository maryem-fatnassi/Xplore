import React from 'react';
import '../CSSComponents/notifications.css';
import { X, Bell, Compass, MapPin } from 'lucide-react';

const Notifications = ({ isOpen, onClose }) => {
  // بيانات تجريبية لمحاكاة التنبيهات العامة
  const notifications = [
    { id: 1, title: "New spot discovered in Iceland!", time: "2m ago" },
    { id: 2, title: "A new challenge is waiting for you.", time: "1h ago" },
    { id: 3, title: "Someone shared a post in Rare Spots.", time: "3h ago" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay visible" 
          onClick={onClose} 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1999 }}
        />
      )}

      {/* Notifications Sidebar */}
      <div className={`notif-sidebar-wrapper ${isOpen ? 'open' : ''}`}>
        
        <div className="notif-header">
          <h2>Notifications</h2>
          <button className="close-notif-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="notif-list">
          {notifications.map((notif) => (
            <div key={notif.id} className="notif-item">
              <div className="notif-item-icon">
                <Compass size={20} />
              </div>
              <div className="notif-item-content">
                <span className="notif-item-title">{notif.title}</span>
                <span className="notif-item-time">{notif.time}</span>
              </div>
            </div>
          ))}
          
          {/* في حال عدم وجود تنبيهات */}
          {notifications.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '50px', opacity: 0.5 }}>
              <Bell size={40} style={{ marginBottom: '10px' }} />
              <p>No new notifications</p>
            </div>
          )}
        </div>

        <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button style={{ background: 'none', border: 'none', color: '#FB923C', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                MARK ALL AS READ
            </button>
        </div>
      </div>
    </>
  );
};

export default Notifications;