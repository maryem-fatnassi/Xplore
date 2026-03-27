import React, { useEffect, useState } from 'react';
import '../../../CSS/RegisteredUsersCss/socialFeed.css';
import { fetchPosts } from '../../../Services/HomePosts/homePosts';

const SocialFeed = () => {
const [posts, setPosts] = useState([]);

useEffect(()=>{
   fetchPosts(setPosts)
},[])
console.log(posts)
  // دالة لاستخراج أول حرف من الاسم
  const getInitial = (name) => name?.charAt(0).toUpperCase();

  return (
    <section className="social-feed">
      <div className="feed-header">
        <h2 className="feed-title">VOICES OF ADVENTURE</h2>
        <p className="feed-subtitle">Real stories and raw emotions from our global community of explorers.</p>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <div className="compact-post" key={post._id}>
            {/* الجزء العلوي: الأفاتار والاسم */}
            <div className="post-top-bar">
              <div className="user-avatar-initial">
                {getInitial(post.user?.userName)}
              </div>
              <div className="user-text-info">
                <h5>{post.user?.userName}</h5>
                <span>{post?.location}</span>
              </div>
            </div>

            {/* الصورة */}
            <div className="post-media-box">
              <img src={post.media} alt={post.location} />
              <div className="like-badge">❤️ {post.likes.length}</div>
            </div>

            {/* رأي المستكشف */}
            <div className="post-opinion">
              <p>"{post.description}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialFeed;