import { useNavigate, useParams } from "react-router-dom";

import RarePlaceForm from "../../../Components/Admin/RarePlaceForm";


export default function RarePlaceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  return (
    <div className="form-container admin-challenge-form">
      <h2>{isEdit ? "Edit Rare Place" : "Add Rare Place"}</h2>

      <button
        type="button"
        className="btn-normal"
        onClick={() => navigate("/admin/places")}
      >
        <i className="fa fa-arrow-left"></i>
        Return to rare places
      </button>

      <RarePlaceForm
        id={id}
        onSuccess={() => navigate("/admin/places")}
        onCancel={() => navigate("/admin/places")}
      />
    </div>
  );
}