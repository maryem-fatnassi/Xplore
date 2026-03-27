import React from 'react';
import { MapPin, Clock, Zap } from 'lucide-react'; // إذا لم تكن لديك Lucide، سأضع بدائل CSS

const ChallengeCard = ({ challenge }) => {
  return (
    <div style={styles.card}>
      {/* قسم الصورة مع Overlay */}
      <div style={{ ...styles.imageSection, backgroundImage: `url(${challenge.image})` }}>
        <div style={styles.difficultyBadge}>{challenge.difficulty}</div>
        <div style={styles.typeBadge}>{challenge.type}</div>
      </div>

      {/* تفاصيل التحدي */}
      <div style={styles.content}>
        <h3 style={styles.title}>{challenge.title}</h3>
        <p style={styles.description}>{challenge.desc?.substring(0, 80)}...</p>
        
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <Clock size={16} color="#FB923C" />
            <span>{challenge.duration}</span>
          </div>
          <div style={styles.infoItem}>
            <Zap size={16} color="#FB923C" />
            <span>{challenge.equipment?.length} Tools</span>
          </div>
        </div>

        <button style={styles.button}>View Details</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '320px',
    backgroundColor: '#0f172a', 
    borderRadius: '25px',
    overflow: 'hidden',
    border: '1px solid rgba(251, 146, 60, 0.1)', 
    boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
    transition: 'all 0.3s ease',
    margin: '15px',
    position: 'relative',
  },

  imageSection: {
    height: '190px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px',
  },

  difficultyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FB923C', // لونك البرتقالي
    color: '#fff',
    padding: '5px 12px',
    borderRadius: '10px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  },

  typeBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(30, 58, 138, 0.8)', // Navy Blue شفاف
    backdropFilter: 'blur(5px)',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '0.65rem',
    border: '1px solid rgba(255,255,255,0.1)',
  },

  content: {
    padding: '20px',
  },

  title: {
    color: '#fff',
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '10px',
    // تأثير تدرج لوني على النص
    background: 'linear-gradient(to right, #fff, #FB923C)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  description: {
    color: '#cccccc75', // اللون الرمادي الذي اخترته
    fontSize: '0.85rem',
    lineHeight: '1.5',
    marginBottom: '20px',
    height: '40px', // توحيد الارتفاع
    overflow: 'hidden',
  },

  infoGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    marginBottom: '20px',
  },

  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
    fontSize: '0.8rem',
  },

  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '15px',
    border: 'none',
    background: 'linear-gradient(45deg, #FB923C, #f97316)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(251, 146, 60, 0.3)',
    transition: 'transform 0.2s ease',
  }
};

export default ChallengeCard;