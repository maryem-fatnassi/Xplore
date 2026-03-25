
import { useState } from 'react';
import '../../CSS/Admin/Sidebar.css';

import { NavLink } from "react-router-dom";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>

      <div className="top_container">
        <h2 className="logo">X{isOpen ? '-Plore' : ''}</h2>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="fa-solid fa-angle-left"></i>
          ) : (
            <i className="fa-solid fa-angle-right"></i>
          )}
        </div>
      </div>

      <div className="line"></div>

      
      <ul>
        <li>
          <NavLink to="/admin" end className="nav-link">
            <i className="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users" className="nav-link">
            <i className="fa-solid fa-users"></i>
            <span>Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/places" className="nav-link">
            <i className="fa-solid fa-location-dot"></i>
            <span>Places</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/challenges" className="nav-link">
            <i className="fa-solid fa-trophy"></i>
            <span>Challenges</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/posts" className="nav-link">
            <i className="fa-solid fa-file-lines"></i>
            <span>Posts</span>
          </NavLink>
        </li>
      </ul>
        
      

      <div className="sidebar-bottom">
        <div className="line"></div>
        {showSettings && isOpen && (
          <ul className="settings-menu">
            <li>
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </li>
            <li>
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </li>
            <li>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </li>
          </ul>
        )}

        <div className="user-info">
          <div className="circle">
            <div className="circle-text">J</div>
          </div>

          <div className="user-text">
            <div className="username">John Doe</div>
            <div className="user-role">Admin</div>
          </div>

          <div
            className="setting-logo"
            onClick={() => setShowSettings(!showSettings)}
          >
            <i className="fa-solid fa-gear"></i>
          </div>
        </div>

      </div>


    </div>
  );
}