import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../services/CategoriesService";
import "../styles/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [originalCategoryName, setOriginalCategoryName] = useState("");
  const [editingCategoryName, setEditingCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error("ERROR! Please try again.");
    }
  };

  const handleCreateCategory = async () => {
    try {
      if (newCategoryName === "") {
        toast.error("Category name is required!");
      } else {
        const newCategoryData = {
          name: newCategoryName,
        };
        await createCategory(newCategoryData);
        fetchCategories();
        setNewCategoryName("");
      }
    } catch (error) {
      toast.error("ERROR! Please try again.");
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const updatedCategory = {
        id: editingCategoryId,
        name: editingCategoryName,
      };
      await updateCategory(updatedCategory);
      fetchCategories();
      setEditingCategoryId(null);
    } catch (error) {
      toast.error("ERROR! Please try again.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const shouldProceed = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!shouldProceed) return;

      await deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      toast.error("ERROR! Please try again.");
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setOriginalCategoryName(category.name);
    setEditingCategoryName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditingCategoryName(originalCategoryName);
  };

  return (
    <div>
      <input
        className="input-text-category"
        type="text"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="Category name"
      />
      <button className="save-btn" onClick={handleCreateCategory}>
        Add
      </button>
      <div className="flex justify-center items-center">
        {categories.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.filter(category => category.id !== 1).map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2">
                    {editingCategoryId === category.id ? (
                      <input
                        className="edit-input-category"
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingCategoryId === category.id ? (
                      <>
                        <button
                          className="button mr-2"
                          onClick={handleUpdateCategory}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-edit-btn mr-2"
                          type="button"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="button mr-2"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No category found, add one!</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
