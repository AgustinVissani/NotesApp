import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Switch from "react-switch";

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote as editNote,
  archiveNote,
  unarchiveNote,
  getArchivedNotes,
} from "../services/NotesService";
import { getCategories } from "../services/CategoriesService";
import "../styles/notes.css";
import TablePagination from "./utils/TablePagination";
import GlobalFilter from "./utils/GlobalFilter";
import Cards from "./Cards";
import Modal from "./Modal";

import {
  TrashIcon,
  PencilIcon,
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [categories, setCategories] = useState([]);

  const notesPerPage = 12;

  useEffect(() => {
    if (!showArchived) {
      getNotes()
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          toast.error("ERROR! Please try again.");
        });
    } else {
      getArchivedNotes()
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          toast.error("ERROR! Please try again.");
        });
    }
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        toast.error("ERROR! Plase try again.");
        return;
      });
  }, [showArchived]);

  const nextPage = () => {
    if (currentPage < Math.ceil(notes.length / notesPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const gotoPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(notes.length / notesPerPage);

  const filteredNotes = notes.filter((note) => {
    const noteDisplayName = note.title || "";
    return noteDisplayName.toLowerCase().includes(filter.toLowerCase());
  });

  const indexOfLastnote = (currentPage + 1) * notesPerPage;
  const indexOfFirstnote = indexOfLastnote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstnote, indexOfLastnote);

  const filteredNotesByCategory = currentNotes.filter((note) => {
    if (!categoryFilter) {
      return true;
    } else {
      return note.categoryId === parseInt(categoryFilter);
    }
  });

  const updateNote = () => {
    editNote(currentNote)
      .then((response) => {
        toast.success("Note successfully updated.");
        setShowArchived(false);
        return getNotes();
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        toast.error("ERROR! Plase try again.");
      });
  };

  const addNote = () => {
    createNote(currentNote)
      .then((response) => {
        toast.success("Note successfully added.");
        return getNotes();
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        toast.error("ERROR! Plase try again.");
      });
  };

  const handleOpenModal = (note = null) => {
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentNote(null);
  };

  const handleCreateOrUpdateNote = () => {
    if (currentNote.id) {
      updateNote();
    } else {
      addNote();
    }
    handleCloseModal();
  };

  const handleDelete = (noteId) => {
    const shouldProceed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!shouldProceed) return;

    deleteNote(noteId)
      .then((response) => {
        setNotes(notes.filter((note) => note.id !== noteId));
        toast.success("Note successfully deleted.");
      })
      .catch((error) => {
        toast.error("ERROR! Please try again.");
      });
  };

  const handleArchive = (noteId) => {
    archiveNote(noteId)
      .then((response) => {
        setNotes(notes.filter((note) => note.id !== noteId));
        toast.success("Note successfully archived.");
      })
      .catch((error) => {
        toast.error("ERROR! Please try again.");
      });
  };

  const handleUnarchive = (noteId) => {
    unarchiveNote(noteId)
      .then((response) => {
        setNotes(notes.filter((note) => note.id !== noteId));
        toast.success("Note successfully unarchived.");
      })
      .catch((error) => {
        toast.error("ERROR! Please try again.");
      });
  };

  return (
    <div>
      <div className="main-section min-h-screen my-8">
        <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center">
          <h2 id="notes" className="main-title">
            Notes
          </h2>
          <button onClick={() => handleOpenModal()} className="add-note-btn">
            Add note
          </button>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center p-2">
          <div className="flex items-center justify-center space-x-2 p-2">
            <Switch
              checked={showArchived}
              onChange={() => setShowArchived(!showArchived)}
              onColor="#1F618D"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
            />
            <span className="text-sm font-medium text-cyan-900 p-2">
              {showArchived ? "Hide Archived" : "Show Archived"}
            </span>
          </div>
          <div className="mt-2 sm:ml-4">
            <select
              className="form-select block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="search-container mt-2 sm:mt-0">
            <GlobalFilter filter={filter} setFilter={setFilter} />
          </div>
        </div>
        {filteredNotesByCategory.length > 0 ? (
          <div href="table" className="main-section-grid my-12">
            {filteredNotesByCategory.map((note, index) => (
              <div key={index} className="card-container">
                <Cards key={index} note={note} />
                <div className="button-container">
                  <button
                    className="primary-button button-style m-2"
                    onClick={() => handleOpenModal(note)}
                  >
                    <PencilIcon className="h-5 w-5 text-black" />
                  </button>
                  <button
                    className="primary-button button-style m-2"
                    onClick={() => handleDelete(note.id)}
                  >
                    <TrashIcon className="h-5 w-5 text-black" />
                  </button>
                  {!showArchived && (
                    <button
                      className="primary-button button-style m-2"
                      onClick={() => handleArchive(note.id)}
                    >
                      <ArchiveBoxIcon className="h-5 w-5 text-black" />
                    </button>
                  )}
                  {showArchived && (
                    <button
                      className="primary-button button-style m-2"
                      onClick={() => handleUnarchive(note.id)}
                    >
                      <ArchiveBoxXMarkIcon className="h-5 w-5 text-black" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="pb-2">No note found.</p>
        )}
        <TablePagination
          pageIndex={currentPage}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          canPreviousPage={currentPage > 0}
          canNextPage={currentPage < pageCount - 1}
        />

        <Modal
          showModal={showModal}
          closeModal={handleCloseModal}
          handleSave={handleCreateOrUpdateNote}
          note={currentNote || { title: "", content: "" }}
          handleInputChange={(e) =>
            setCurrentNote({
              ...currentNote,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default Notes;
