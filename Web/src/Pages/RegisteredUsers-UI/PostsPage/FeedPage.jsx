import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  PlusCircle,
  MapPin,
  Film,
  Image,
  UserCircle,
  TrendingUp,
  Users,
  Award,
  Map as MapIcon,
  Globe,
} from "lucide-react";
import "../../../CSS/RegisteredUsersCss/PostsCSS/feed.css";
import Navbar from "../../../Components/NavSection";

const FeedPage = () => {
  // 1. إدارة حالة المنشورات (State for Posts List)
  const [posts, setPosts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id || userData?._id;

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch("http://localhost:5000/api/posts/all");
      const data = await response.json();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);

    if (diffInMinutes < 1) return "JUST NOW";
    if (diffInMinutes < 60) return `${diffInMinutes}M AGO`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}H AGO`;
    return date.toLocaleDateString();
  };

const [selectedFile, setSelectedFile] = useState(null);

// دالة لاختيار الملف من الجهاز
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

const handlePostSubmit = async () => {
  if (!newPostContent.trim() && !selectedFile) return;

  // استخدام FormData بدلاً من JSON
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("description", newPostContent);
  formData.append("location", "Crystal Caves");
  if (selectedFile) {
    formData.append("media", selectedFile);
  }

  try {
    const response = await fetch("http://localhost:5000/api/posts/create", {
      method: "POST",
      // ملاحظة: لا تضع Headers للـ Content-Type، المتصفح سيفعل ذلك تلقائياً مع FormData
      body: formData 
    });
    
    const savedPost = await response.json();
    setPosts([savedPost, ...posts]);
    setNewPostContent('');
    setSelectedFile(null);
  }catch (error) {
  console.error("Full Error Details:", error); // هذا سيخبرك إذا كان الخطأ 404 أو 500 أو Network Error
  alert("Upload Failed: " + error.message);
}
};

  // 4. الإعجاب (Like)
  const handleLikeToggle = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/like/${postId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        },
      );
      const updatedLikes = await response.json();

      setPosts(
        posts.map((p) =>
          p._id === postId ? { ...p, likes: updatedLikes } : p,
        ),
      );
    } catch (error) {
      console.error("Like error");
    }
  };

  // 2. إدارة حالة إنشاء منشور جديد (State for New Post Form)
  const [newPostContent, setNewPostContent] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null); // معرف التعليق النشط حالياً
  const [newCommentText, setNewCommentText] = useState("");

  // ج. إضافة تعليق جديد (Submit New Comment)
  const handleCommentSubmit = async (postId) => {
    if (!newCommentText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/comment/${postId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            userName: userData.userName, // نأخذه من الـ localStorage
            text: newCommentText,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to post comment");

      const updatedComments = await response.json();

      // تحديث الواجهة فوراً بالتعليقات الجديدة من السيرفر
      setPosts(
        posts.map((post) => {
          if (post._id === postId) {
            return { ...post, comments: updatedComments };
          }
          return post;
        }),
      );

      setNewCommentText("");
      setActiveCommentId(null); // إغلاق صندوق التعليقات بعد الإرسال
    } catch (error) {
      alert("Could not send transmission: " + error.message);
    }
  };

  return (
    <div className="posts-container">
      <Navbar />
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
  <input 
    type="file" 
    id="file-upload" 
    style={{ display: 'none' }} 
    onChange={handleFileChange} 
    accept="image/*,video/*"
  />
  <label htmlFor="file-upload" className="media-btn">
    <Image size={18}/> Photo/Video
  </label>
  {selectedFile && <span className="file-name">{selectedFile.name}</span>}
</div>
                <button className="publish-btn" onClick={handlePostSubmit}>
                  <PlusCircle size={18} /> PUBLISH LOG
                </button>
              </div>
            </div>

            {/* === 2. قائمة المنشورات (Posts List) === */}
            <div className="posts-container">
              {posts.map((post) => (
                <div key={post.id} className="post-card-luxury">
                  {/* رأس المنشور (Post Header) */}
                  <header className="post-header">
                    {/* عرض أول حرف من الاسم بدلاً من الـ Avatar */}
                    <div className="user-avatar-placeholder">
                      {post.user?.userName?.charAt(0).toUpperCase() || "E"}
                    </div>
                    <div className="user-details">
                      <h4 className="user-name">{post.user?.userName}</h4>
                      <span className="post-meta">
                        <MapPin size={10} /> {post.location} •{" "}
                        {formatTime(post.createdAt)}
                      </span>
                    </div>
                  </header>

                  {/* المحتوى (Content) */}
                  <div className="post-main">
                    <p className="post-desc">{post.description}</p>
                    {post.media && (
                      <div className="post-media-wrapper">
                        {post.type === "video" ? (
                          <video controls className="post-video">
                            <source src={post.media} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={post.media}
                            alt="discovery"
                            className="post-img"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* شريط التفاعل (Interaction Bar) */}
                  <footer className="post-footer">
                    <div className="stats-bar">
                      <button
                        className={`stat-btn ${post.isLiked ? "liked" : ""}`}
                        onClick={() => handleLikeToggle(post._id)}
                      >
                        <Heart
                          size={18}
                          fill={post.isLiked ? "#ff4b2b" : "none"}
                        />{" "}
                        {post.likes.length}
                      </button>
                      <button
                        className="stat-btn"
                        onClick={() =>
                          setActiveCommentId(
                            activeCommentId === post._id ? null : post._id,
                          )
                        }
                      >
                        <MessageCircle size={18} /> {post.comments.length}
                      </button>
                      <button className="stat-btn share-btn">
                        <Share2 size={18} />
                      </button>
                    </div>

                    {/* قسم التعليقات (Comments Section) */}
                    <div
                      className={`comments-section ${activeCommentId === post._id ? "active" : ""}`}
                    >
                      <div className="comments-list">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="comment-item">
                            <strong>{comment.userName}</strong>: {comment.text}
                            <span className="comment-time" style={{fontSize:"10px",color:"goldenrod",marginLeft:"8px"}}>
                              {" "}
                              • {formatTime(comment.createdAt)}
                            </span>
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
                        <button
                          className="send-comment-btn"
                          onClick={() => handleCommentSubmit(post._id)}
                        >
                          <Send size={16} />
                        </button>
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
            {/* <div className="sidebar-widget luxury-glass">
              <h3 className="widget-title">
                <Award size={18} color="#00aaff" /> TOP_EXPLORERS
              </h3>
              <div className="explorer-ranking">
                {[
                  { name: "Commander_Z", xp: "12.4k", rank: "Master" },
                  { name: "Nova_Scout", xp: "8.1k", rank: "Elite" },
                  { name: "Deep_Blue", xp: "5.5k", rank: "Pro" },
                ].map((user, i) => (
                  <div key={i} className="ranking-item">
                    <div className="rank-num">0{i + 1}</div>
                    <div className="rank-info">
                      <span className="rank-name">{user.name}</span>
                      <span className="rank-xp">
                        {user.xp} XP • {user.rank}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Section 2: Trending Destinations */}
            <div className="sidebar-widget luxury-glass">
              <h3 className="widget-title">
                <TrendingUp size={18} color="#00ff88" /> TRENDING_ZONES
              </h3>
              <ul className="trending-list">
                <li>
                  #Danakil_Depression <span>124 logs</span>
                </li>
                <li>
                  #Socotra_Island <span>89 logs</span>
                </li>
                <li>
                  #Mariana_Trench <span>42 logs</span>
                </li>
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
              <button className="view-map-btn">
                <MapIcon size={16} /> EXPLORE WORLD MAP
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
