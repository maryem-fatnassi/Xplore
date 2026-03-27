import { useEffect, useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, createUser, updateUser } from "../Services/Admin/UsersService";

import '../CSSComponents/UserForm.css';

export default function UserForm({ id,admin = true, onSuccess, onCancel }) {
  const fileInputRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    description: "",
    is_admin: false,
    active: true,
    gender: "male",
    avatar: null
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      async function loadUser() {
        const data = await getUserById(id);
        setForm({ ...data, password: "" });
      }
      loadUser();
    }
  }, [id]);

  useEffect(() => {
    if (form.avatar instanceof File) {
      const url = URL.createObjectURL(form.avatar);
      setAvatarPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setAvatarPreview(null);
    }
  }, [form.avatar]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }


    // e.preventDefault();

    // try {
    //   const data = new FormData();

    //   Object.keys(form).forEach(key => {
    //     data.append(key, form[key]);
    //   });

    //   if (isEdit) {
    //     await updateUser(id, data);
    //   } else {
    //     await createUser(data);
    //   }

    //   //navigate("/admin/users");
    //   onSuccess?.();
    // } catch (err) {
    //   console.error(err);
    // }
    async function handleSubmit(e) {
  e.preventDefault();

  try {
    const data = new FormData();

    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== undefined) {
        data.append(key, form[key]);
      }
    });

    if (isEdit) {
      const updatedUserResponse = await updateUser(id, data);

      const currentUser = JSON.parse(localStorage.getItem("user"));

      const newUserInfo = { 
        ...currentUser, 
        ...updatedUserResponse, 
        userName: form.userName, 
        email: form.email,
        description: form.description
      };

      localStorage.setItem("user", JSON.stringify(newUserInfo));
      
    } else {
      await createUser(data);
    }

    onSuccess?.();
  } catch (err) {
    console.error("Error during submission:", err);
  }
}
  

  return (

      <form onSubmit={handleSubmit} className="section form-section">

        <div className="avatar-section">
          <div 
            className="avatar-preview"
            onClick={() => fileInputRef.current.click()}
          >
            {form.avatar instanceof File ? (
              <img
                src={avatarPreview}
                className="avatar-img-input"
                alt="avatar"
              />
            ) : form.avatar ? (
              <img
                src={form.avatar}
                className="avatar-img-input"
                alt="avatar"
              />
            ) : form.gender === "female" ? (
              <img src="/images/unknown_user_female1.jpg" className="avatar-img-input" alt="female" />
            ) : (
              <img src="/images/unknown_user_male1.jpg" className="avatar-img-input" alt="male" />
            )}
          </div>

          <div className="avatar-hint">
            <p className="avatar-title">Choose a profile picture</p>
            <p className="avatar-desc">
              Recommended size: square image (1:1). Max size: 2MB. Click the image to upload.
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                avatar: e.target.files[0]
              }))
            }
          />
        </div>
        <div className="right-container">
          <div className="row">

            <div className="gender-toggle">
              <div
                className={`gender-option gender-option-male ${form.gender === "male" ? "active" : ""}`}
                onClick={() => setForm(prev => ({ ...prev, gender: "male" }))}
              >
                <i className={"fa fa-mars male-icon"}></i>
                Male
              </div>

              <div
                className={`gender-option  gender-option-female ${form.gender === "female" ? "active" : ""}`}
                onClick={() => setForm(prev => ({ ...prev, gender: "female" }))}
              >
                <i className={"fa fa-mars female-icon"}></i>
                Female
              </div>
            </div>

            {admin && (
            <>
            <div
              className={`active-button toggle-btn ${form.active ? "active" : ""}`}
              onClick={() =>
                setForm(prev => ({ ...prev, active: !prev.active }))
              }
            >
              {form.active ? "Active" : "Inactive"}
            </div>

            <div
              className={`admin-button toggle-btn ${form.is_admin ? "active" : ""}`}
              onClick={() =>
                setForm(prev => ({ ...prev, is_admin: !prev.is_admin }))
              }
            >
              {form.is_admin ? "Admin Enabled" : "Admin Disabled"}
            </div>
            </>
            )}
          </div>
          
          <div className="row">

            <div className="form-group">
              <label>Username</label>
              <input
                className="input-field"
                type="text"
                name="userName"
                placeholder="Enter username"
                value={form.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {!isEdit && (
              <div className="form-group">
                <label>Password</label>
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

          </div>

          <div className="row">
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="input-field"
                name="description"
                placeholder="Write Description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-normal">
              {isEdit ? "Update" : "Create"}
            </button>
            <button type="button" className="btn-cancel" onClick={() => onCancel?.()}>Cancel</button>
          </div>
        </div>
      </form>
  );
}