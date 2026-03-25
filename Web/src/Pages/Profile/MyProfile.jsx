import { useEffect, useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserForm from "../../Components/UserForm";
import Navbar from "../../Components/NavSection";

import '../../CSS/RegisteredUsersCss/MyProfile.css';


export default function MyProfile() {
  let user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;
  console.log(user);
  const navigate = useNavigate();

  return (
    <div id="my_profile_container">
      <Navbar />
      <div className="page-content">
        <div className="form-container profile-form">
          <h2>Profile informations </h2>

          <UserForm
            id={user.id}
            admin={false}
            onSuccess={() => navigate("/home")}
            onCancel={() => navigate("/home")}
          />
        </div>
      </div>
      
    </div>
    
  );
}