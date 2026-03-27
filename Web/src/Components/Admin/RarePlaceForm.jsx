import { useEffect, useState,useRef } from "react";
import { getRarePlaceById, createRarePlace, updateRarePlace } from "../../Services/Admin/RarePlacesService";

import '../../CSSComponents/Admin/RarePlacesForm.css';

export default function RarePlaceForm({ id, onSuccess, onCancel }) {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    image: null,
    location: "",
    duration: "",
    desc: ""
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      async function loadRarePlace() {
        const data = await getRarePlaceById(id);

        setForm(data);
      }
      loadRarePlace();
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

      Object.keys(form).forEach(key => {
        data.append(key, form[key]);
      });

      if (isEdit) {
        await updateRarePlace(id, data);
      } else {
        await createRarePlace(data);
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
            <p className="image-title">Choose an image</p>
            <p className="image-desc">
              Recommended: high-quality image (16:9). Click the image to upload.
            </p>
          </div>
        </div>
        <div className="right-container">

            {/* NAME */}
            <div className="row">
                <div className="form-group">
                <label>Name</label>
                <input
                    className="input-field"
                    type="text"
                    name="name"
                    placeholder="Enter place name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                </div>
            </div>

            {/* TYPE + DURATION */}
            <div className="row">

                <div className="form-group">
                <label>Location</label>
                <input
                    className="input-field"
                    type="text"
                    name="location"
                    placeholder="Enter duration"
                    value={form.location}
                    onChange={handleChange}
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