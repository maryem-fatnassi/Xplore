import React, { useState } from 'react';
import '../../../CSS/RegisteredUsersCss/socialFeed.css';

const SocialFeed = () => {
  const posts = [
    {
      id: 1,
      username: "Alex Explorer",
      location: "Grand Canyon",
      content: "https://www.undercanvas.com/wp-content/uploads/2023/10/Grand-Canyon-scaled-1.webp",
      opinion: "An absolute test of endurance, but the view at the top is worth every drop of sweat.",
      likes: "1.2k",
    },
    {
      id: 2,
      username: "Sarah Wild",
      location: "Iceland",
      content: "https://images.unsplash.com/photo-1520637102912-2df6bb2aec6d?q=80&w=600",
      opinion: "Nature's magic is real. Floating between glaciers felt like being on another planet.",
      likes: "3.1k",
    },
    {
      id: 3,
      username: "Marco Travels",
      location: "Namib Desert",
      content: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=600",
      opinion: "The silence here is powerful. The orange dunes go on forever. Pure peace.",
      likes: "890",
    }
  ];

  // دالة لاستخراج أول حرف من الاسم
  const getInitial = (name) => name.charAt(0).toUpperCase();

  return (
    <section className="social-feed">
      <div className="feed-header">
        <h2 className="feed-title">VOICES OF ADVENTURE</h2>
        <p className="feed-subtitle">Real stories and raw emotions from our global community of explorers.</p>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <div className="compact-post" key={post.id}>
            {/* الجزء العلوي: الأفاتار والاسم */}
            <div className="post-top-bar">
              <div className="user-avatar-initial">
                {getInitial(post.username)}
              </div>
              <div className="user-text-info">
                <h5>{post.username}</h5>
                <span>{post.location}</span>
              </div>
            </div>

            {/* الصورة */}
            <div className="post-media-box">
              <img src={post.content} alt={post.location} />
              <div className="like-badge">❤️ {post.likes}</div>
            </div>

            {/* رأي المستكشف */}
            <div className="post-opinion">
              <p>"{post.opinion}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialFeed;