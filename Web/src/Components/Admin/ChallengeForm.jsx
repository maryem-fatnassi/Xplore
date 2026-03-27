import { useEffect, useState,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChallengeById, createChallenge, updateChallenge } from "../../Services/Admin/ChallengesService";

import '../../CSSComponents/Admin/ChallengeForm.css';

export default function ChallengeForm({ id, onSuccess, onCancel }) {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    image: null,
    difficulty: "easy",
    type: "location",
    location: {lat : '' , lng : ''},
    duration: "",
    date: null,
    desc: "",
    equipment: [],
    rules: []
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      async function loadChallenge() {
        const data = await getChallengeById(id);

        setForm({
          ...data,
          date: data.date ? data.date.split("T")[0] : "",
          location: data.location || { lat: "", lng: "" },
          equipment: data.equipment || [],
          rules: data.rules || []
        });
      }
      loadChallenge();
    }
  }, [id]);

  useEffect(() => {
    if (form.image instanceof File) {
      const url = URL.createObjectURL(form.image);
      setImagePreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImagePreview(null);
    }
  }, [form.image]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = new FormData();
/*
      Object.keys(form).forEach(key => {
        data.append(key, form[key]);
      });
*/
      data.append("title", form.title);
      data.append("image", form.image);
      data.append("difficulty", form.difficulty);
      data.append("type", form.type);
      data.append("duration", form.duration);
      data.append("date", form.date);
      data.append("desc", form.desc);

      // ✅ FIX HERE
      data.append("location", JSON.stringify(form.location));
      data.append("equipment", JSON.stringify(form.equipment));
      data.append("rules", JSON.stringify(form.rules));

      if (isEdit) {
        await updateChallenge(id, data);
      } else {
        await createChallenge(data);
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  }

  return (

      <form onSubmit={handleSubmit} className="section">

        <div className="image-section">          
          <div 
            className="image-preview"
            onClick={() => fileInputRef.current.click()}
          >
            {form.image instanceof File ? (
              <img
                src={imagePreview}
                className="image-img-input"
                alt="image"
              />
            ) : form.image ? (
              <img
                src={form.image}
                className="image-img-input"
                alt="image"
              />
            ) :
              <div className="image-img-input">
                <i className="fas fa-plus"></i>
              </div>
            }
           
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                image: e.target.files[0]
              }))
            }
          />

          <div className="image-hint">
            <p className="image-title">Choose a challenge image</p>
            <p className="image-desc">
              Recommended: high-quality image (16:9). Click the image to upload.
            </p>
          </div>
        </div>
        <div className="right-container">

            {/* DIFFICULTY */}
            <div className="row">
                <div className="difficulty-toggle">

                {["easy", "medium", "hard", "extreme"].map(level => (
                    <div
                    key={level}
                    className={`difficulty-option difficulty-option-${level} ${form.difficulty === level ? "active" : ""}`}
                    onClick={() => setForm(prev => ({ ...prev, difficulty: level }))}
                    >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                    </div>
                ))}

                </div>
            </div>
            {/* TITLE */}
            <div className="row">
                <div className="form-group">
                <label>Title</label>
                <input
                    className="input-field"
                    type="text"
                    name="title"
                    placeholder="Enter challenge title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                </div>
            </div>

            {/* TYPE + DURATION */}
            <div className="row">

                <div className="form-group">
                <label>Type</label>
                <select
                  className="input-field"
                  name="type"
                  value={form.type || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="global">Global</option>
                  <option value="location">Location</option>
                </select>
              </div>

                <div className="form-group">
                <label>Duration (hours)</label>
                <input
                    className="input-field"
                    type="text"
                    name="duration"
                    placeholder="Enter duration"
                    value={form.duration}
                    onChange={handleChange}
                />
                </div>

            </div>

            <div className="row">
              {/* LOCATION */}

                  <div className="form-group">
                  <label>Latitude</label>
                  <input
                      className="input-field"
                      type="number"
                      placeholder="Latitude"
                      value={form.location.lat || ""}
                      onChange={(e) =>
                      setForm(prev => ({
                          ...prev,
                          location: { ...prev.location, lat: e.target.value }
                      }))
                      }
                  />
                  </div>

                  <div className="form-group">
                  <label>Longitude</label>
                  <input
                      className="input-field"
                      type="number"
                      placeholder="Longitude"
                      value={form.location.lng || ""}
                      onChange={(e) =>
                      setForm(prev => ({
                          ...prev,
                          location: { ...prev.location, lng: e.target.value }
                      }))
                      }
                  />
                  </div>


                <div className="form-group">
                  <label>Date</label>
                  <input
                    className="input-field"
                    type="date"
                    value={form.date || ""}
                    onChange={(e) =>
                      setForm(prev => ({
                        ...prev,
                        date: e.target.value
                      }))
                    }
                  />
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className="row">
                <div className="form-group">
                <label>Description</label>
                <textarea
                    className="input-field"
                    name="desc"
                    placeholder="Write description"
                    value={form.desc}
                    onChange={handleChange}
                    required
                />
                </div>
            </div>

        </div>

        {/* EQUIPMENT */}
        <div className="row">
          <div className="form-group">
            <label>Equipment</label>

            {form.equipment.map((item, index) => (
              <div key={index} className="dynamic-input">
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter equipment"
                  value={item}
                  onChange={(e) => {
                    const updated = [...form.equipment];
                    updated[index] = e.target.value;

                    setForm(prev => ({
                      ...prev,
                      equipment: updated
                    }));
                  }}
                />

                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => {
                    const updated = form.equipment.filter((_, i) => i !== index);

                    setForm(prev => ({
                      ...prev,
                      equipment: updated
                    }));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn-add"
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  equipment: [...prev.equipment, ""]
                }))
              }
            >
              + Add Equipment
            </button>
          </div>
        </div>
        {/* RULES */}
        <div className="row">
          <div className="form-group">
            <label>Rules</label>

            {form.rules.map((item, index) => (
              <div key={index} className="dynamic-input">
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter rule"
                  value={item}
                  onChange={(e) => {
                    const updated = [...form.rules];
                    updated[index] = e.target.value;

                    setForm(prev => ({
                      ...prev,
                      rules: updated
                    }));
                  }}
                />

                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => {
                    const updated = form.rules.filter((_, i) => i !== index);

                    setForm(prev => ({
                      ...prev,
                      rules: updated
                    }));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn-add"
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  rules: [...prev.rules, ""]
                }))
              }
            >
              + Add Rule
            </button>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="button-group">
            <button type="submit" className="btn-normal">
            {isEdit ? "Update" : "Create"}
            </button>
            <button type="button" className="btn-cancel" onClick={() => onCancel?.()}>
            Cancel
            </button>
        </div>
      </form>
  );
}