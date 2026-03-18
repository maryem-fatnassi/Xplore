import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, PlusCircle, MapPin, Film, Image, UserCircle ,TrendingUp, Users, Award, Map as MapIcon, Globe} from 'lucide-react';
import '../../../CSS/RegisteredUsersCss/PostsCSS/feed.css';
import Navbar from '../../../Components/NavSection';

const FeedPage = () => {
  // 1. إدارة حالة المنشورات (State for Posts List)
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: "Alex Rivers", avatar: "https://i.pravatar.cc/150?u=alex", rank: "Pro Scout" },
      location: "Vatnajökull Ice Caves, Iceland",
      description: "Stepping into this crystal blue dimension. The silence here is heavy, beautiful, and terrifying all at once. Absolute core memory unlocked. 🧊💙 #XPloreIceland",
      media: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000",
      type: "image",
      likes: 1240,
      isLiked: false, // حالة الإعجاب الخاصة بالمستخدم الحالي
      comments: [
        { id: 101, user: "Sarah", text: "Unreal! Added to my bucket list immediately." },
        { id: 102, user: "Mike", text: "How was the temperature inside?" }
      ],
      time: "4H AGO"
    },
    {
      id: 2,
      user: { name: "Elena Thorne", avatar: "https://i.pravatar.cc/150?u=elena", rank: "Elite Voyager" },
      location: "Namib Desert, Big Daddy Dune",
      description: "Caught the orange glow at Big Daddy dune. 325 meters of pure sand. The descent was faster than expected! Check the footage.",
      media: "https://www.w3schools.com/html/mov_bbb.mp4", 
      type: "video",
      likes: 5100,
      isLiked: true,
      comments: [],
      time: "12H AGO"
    }
  ]);

  // 2. إدارة حالة إنشاء منشور جديد (State for New Post Form)
  const [newPostContent, setNewPostContent] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null); // معرف التعليق النشط حالياً
  const [newCommentText, setNewCommentText] = useState('');

  // --- دالات التفاعل (Interaction Functions) ---

  // أ. إنشاء منشور جديد (Submit New Post)
  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return; // تجنب النشر الفارغ
    const newPost = {
      id: Date.now(), // معرف فريد مؤقت
      user: { name: "Current Explorer", avatar: "https://i.pravatar.cc/150?u=me", rank: "Newbie" },
      location: "Unknown Location", // يمكن إضافتها لاحقاً عبر GPS
      description: newPostContent,
      media: null, // إضافة الميديا تحتاج لمعالجة ملفات
      type: "text",
      likes: 0,
      isLiked: false,
      comments: [],
      time: "JUST NOW"
    };
    setPosts([newPost, ...posts]); // إضافة المنشور الجديد في البداية
    setNewPostContent(''); // إعادة تعيين الحقل
  };

  // ب. التفاعل مع الإعجاب (Toggle Like)
  const handleLikeToggle = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1 // زيادة أو نقصان العدد
        };
      }
      return post;
    }));
  };

  // ج. إضافة تعليق جديد (Submit New Comment)
  const handleCommentSubmit = (postId) => {
    if (!newCommentText.trim()) return;
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = { id: Date.now(), user: "Me", text: newCommentText };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
    setNewCommentText('');
    setActiveCommentId(null); // إغلاق حقل التعليق
  };

  return (
    <div className='posts-container'>
        <Navbar/>
        <div className="xplore-feed-page">
      <div className="feed-layout-wrapper">
        <div className="feed-layout">
        
        {/* === 1. منطقة إنشاء المنشور (Create Post Area) === */}
        <div className="create-post-glass">
          <div className="create-header">
            <UserCircle className="default-avatar" size={40} />
            <textarea 
              placeholder="What did you discover today, Explorer?" 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          </div>
          <div className="create-actions">
            <div className="upload-options">
              <button className="media-btn"><Image size={18}/> Photo</button>
              <button className="media-btn"><Film size={18}/> Video</button>
            </div>
            <button className="publish-btn" onClick={handlePostSubmit}>
              <PlusCircle size={18}/> PUBLISH LOG
            </button>
          </div>
        </div>

        {/* === 2. قائمة المنشورات (Posts List) === */}
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post-card-luxury">
              
              {/* رأس المنشور (Post Header) */}
              <header className="post-header">
                <img src={post.user.avatar} alt={post.user.name} className="user-avatar" />
                <div className="user-details">
                  <h4 className="user-name">{post.user.name}</h4>
                  <span className="user-rank">{post.user.rank}</span>
                  <span className="post-meta"><MapPin size={10} /> {post.location} • {post.time}</span>
                </div>
              </header>

              {/* المحتوى (Content) */}
              <div className="post-main">
                <p className="post-desc">{post.description}</p>
                {post.media && (
                  <div className="post-media-wrapper">
                    {post.type === 'video' ? (
                      <video controls className="post-video"><source src={post.media} type="video/mp4" /></video>
                    ) : (
                      <img src={post.media} alt="discovery" className="post-img" />
                    )}
                  </div>
                )}
              </div>

              {/* شريط التفاعل (Interaction Bar) */}
              <footer className="post-footer">
                <div className="stats-bar">
                  <button className={`stat-btn ${post.isLiked ? 'liked' : ''}`} onClick={() => handleLikeToggle(post.id)}>
                    <Heart size={18} fill={post.isLiked ? "#ff4b2b" : "none"} /> {post.likes}
                  </button>
                  <button className="stat-btn" onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}>
                    <MessageCircle size={18} /> {post.comments.length}
                  </button>
                  <button className="stat-btn share-btn"><Share2 size={18} /></button>
                </div>

                {/* قسم التعليقات (Comments Section) */}
                <div className={`comments-section ${activeCommentId === post.id ? 'active' : ''}`}>
                  <div className="comments-list">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="comment-item">
                        <strong>{comment.user}</strong> {comment.text}
                      </div>
                    ))}
                  </div>
                  <div className="comment-input-area">
                    <input 
                      type="text" 
                      placeholder="Write a transmission..." 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <button className="send-comment-btn" onClick={() => handleCommentSubmit(post.id)}><Send size={16} /></button>
                  </div>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
        {/* --- LEFT SIDE: Main Feed (The logic we built before) --- */}
        <div className="main-feed-content">
          {/* Create Post and Posts List go here */}
        </div>

        {/* --- RIGHT SIDE: Expedition Sidebar --- */}
        <aside className="expedition-sidebar">
          
          {/* Section 1: Top Explorers */}
          <div className="sidebar-widget luxury-glass">
            <h3 className="widget-title"><Award size={18} color="#00aaff" /> TOP_EXPLORERS</h3>
            <div className="explorer-ranking">
              {[
                { name: "Commander_Z", xp: "12.4k", rank: "Master" },
                { name: "Nova_Scout", xp: "8.1k", rank: "Elite" },
                { name: "Deep_Blue", xp: "5.5k", rank: "Pro" }
              ].map((user, i) => (
                <div key={i} className="ranking-item">
                  <div className="rank-num">0{i+1}</div>
                  <div className="rank-info">
                    <span className="rank-name">{user.name}</span>
                    <span className="rank-xp">{user.xp} XP • {user.rank}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Trending Destinations */}
          <div className="sidebar-widget luxury-glass">
            <h3 className="widget-title"><TrendingUp size={18} color="#00ff88" /> TRENDING_ZONES</h3>
            <ul className="trending-list">
              <li>#Danakil_Depression <span>124 logs</span></li>
              <li>#Socotra_Island <span>89 logs</span></li>
              <li>#Mariana_Trench <span>42 logs</span></li>
            </ul>
          </div>

          {/* Section 3: Live Statistics */}
          <div className="sidebar-widget live-status luxury-glass">
            <div className="stat-row">
              <div className="mini-stat">
                <Globe size={14} /> <span>GLOBAL_PINS: 2,401</span>
              </div>
              <div className="mini-stat pulse">
                <Users size={14} /> <span>ON_FIELD: 142</span>
              </div>
            </div>
            <button className="view-map-btn"><MapIcon size={16} /> EXPLORE WORLD MAP</button>
          </div>

        </aside>

      </div>

    </div>
    </div>
  );
};

export default FeedPage;