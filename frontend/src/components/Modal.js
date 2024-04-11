import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import "../styles/modal.css";
import { getCategories } from "../services/CategoriesService";

const Modal = ({
  showModal,
  closeModal,
  handleSave,
  note,
  handleInputChange,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        toast.error("ERROR! Plase try again.");
        return;
      });
  }, []);

  useEffect(() => {
    setSelectedCategory("");
    if (note.categoryId) {
      setSelectedCategory(note.categoryId);
    }
  }, [note.categoryId]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    e.target.name = "categoryId";
    handleInputChange(e);
  };

  const handleSaveNote = () => {
    const noteWithCategory = { ...note, categoryId: selectedCategory };
    handleSave(noteWithCategory);
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="modal-container bg-white rounded-md shadow-lg w-5/6">
        <div className="p-6 h-full">
          <div className="title-container mb-4 flex justify-between items-center">
            <h3 className="title">Note</h3>
            <button onClick={closeModal} className="b-above-to-close">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="input-row mb-4 flex items-center">
            <label className="label-title">Title:</label>
            <input
              className="input-text-title"
              type="text"
              name="title"
              value={note.title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-row mb-4 flex items-center">
            <label className="label-title">Content:</label>
            <textarea
              className="input-text-content"
              name="content"
              value={note.content}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-row mb-4 flex items-center">
            <label className="label-title">Category:</label>
            <select
              className="select-category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="button-row flex justify-between">
            <button className="save-btn" onClick={handleSaveNote}>
              Save
            </button>
            <button className="cancel-btn" type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
