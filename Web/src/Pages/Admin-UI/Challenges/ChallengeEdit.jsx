import { useNavigate, useParams } from "react-router-dom";

import ChallengeForm from "../../../Components/Admin/ChallengeForm";


export default function ChallengeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  return (
    <div className="form-container admin-challenge-form">
      <h2>{isEdit ? "Edit Challenge" : "Add Challenge"}</h2>

      <button
        type="button"
        className="btn-normal"
        onClick={() => navigate("/admin/challenges")}
      >
        <i className="fa fa-arrow-left"></i>
        Return to challenges
      </button>

      <ChallengeForm
        id={id}
        onSuccess={() => navigate("/admin/challenges")}
        onCancel={() => navigate("/admin/challenges")}
      />

      {isEdit ? 
        <div className="joined-list-container"></div> : ''
      }
    </div>
  );
}