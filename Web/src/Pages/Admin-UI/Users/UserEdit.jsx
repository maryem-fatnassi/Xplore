import { useEffect, useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, createUser, updateUser } from "../../../Services/Admin/UsersService";

import '../../../CSS/Admin/UserEdit.css';

import UserForm from "../../../Components/UserForm";


export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  return (
    <div className="form-container admin-form">
      <h2>{isEdit ? "Edit User" : "Add User"}</h2>

      <button
        type="button"
        className="btn-normal"
        onClick={() => navigate("/admin/users")}
      >
        <i className="fa fa-arrow-left"></i>
        Return to users
      </button>

      <UserForm
        id={id}
        onSuccess={() => navigate("/admin/users")}
        onCancel={() => navigate("/admin/users")}
      />
    </div>
  );
}