import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Sidebar from '../../Components/Admin/Sidebar';
import UserPage from "./Users/UserPage";
import UserEdit from "./Users/UserEdit";

import PostsPage from "./Posts/PostsPage";
import ChallengesPage from "./Challenges/ChallengesPage";

import '../../CSS/Admin/AdminPage.css';

export default function AdminPage() {
  return (
    <div className="admin-container">
      <Sidebar />
      
      <div className="main-content">
        <Routes>
          <Route path="/dash" element={<h1>Dashboard</h1>} />
          <Route path="users" element={<UserPage/>} />
          {/* Add user */}
          <Route path="users/new" element={<UserEdit />} />

          {/* Edit user */}
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="posts" element={<PostsPage/>} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="places" element={<h1>Places Page</h1>} />
        </Routes>
      </div>
    </div>
  );
}