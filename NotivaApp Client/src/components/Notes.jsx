import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteNote,
  updateNote,
  archiveNote,
} from "../redux/features/notes/noteSlice";
import {
  FaTrash,
  FaThumbtack,
  FaEdit,
  FaTimes,
  FaPlus,
  FaArchive,
} from "react-icons/fa";

const NotesList = ({ showAll = false }) => {
  const { notes, filter } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [editingNote, setEditingNote] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    text: "",
    checklist: [],
  });

  const filteredNotes = notes.filter((note) => {
    // Filter out archived notes
    if (note.isArchived) return false;

    const search = filter.search.toLowerCase();
    if (!search) return true;

    const titleMatch = note.title?.toLowerCase().includes(search);
    const textMatch = note.text?.toLowerCase().includes(search);
    const checklistMatch = note.checklist?.some((item) =>
      item.text.toLowerCase().includes(search),
    );

    return titleMatch || textMatch || checklistMatch;
  });

  // Sort notes: Pinned first, then by date (newest first)
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    // First, sort by pinned status
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    }
    // Then sort by creation date (assuming notes have createdAt or id)
    // If using MongoDB, notes typically have _id which contains timestamp
    return 0; // Keep original order if both have same pinned status
  });

  // Filter to show only recent and pinned notes if showAll is false
  const displayNotes = showAll
    ? sortedNotes
    : sortedNotes.filter((note, index) => {
        // Show all pinned notes
        if (note.isPinned) return true;
        // Show only first 10 unpinned notes (most recent)
        const unpinnedIndex = sortedNotes
          .slice(0, index)
          .filter((n) => !n.isPinned).length;
        return unpinnedIndex < 10;
      });

  const handleToggleChecklist = (note, itemIndex) => {
    const newChecklist = [...note.checklist];
    const item = newChecklist[itemIndex];

    // Create new item object with toggled status
    newChecklist[itemIndex] = { ...item, isCompleted: !item.isCompleted };

    // Sort: Incomplete first (false), Completed last (true)
    newChecklist.sort((a, b) => {
      // Use numeric value of boolean: false=0, true=1
      return Number(a.isCompleted) - Number(b.isCompleted);
    });

    dispatch(updateNote({ id: note.id, data: { checklist: newChecklist } }));
  };

  const handleTogglePin = (note) => {
    dispatch(updateNote({ id: note.id, data: { isPinned: !note.isPinned } }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      dispatch(deleteNote(id));
    }
  };

  const handleArchive = (id) => {
    dispatch(archiveNote(id));
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setEditForm({
      title: note.title || "",
      text: note.text || "",
      checklist: note.checklist || [],
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      title: editForm.title,
    };

    if (editingNote.type === "text") {
      updateData.text = editForm.text;
    } else {
      updateData.checklist = editForm.checklist.filter(
        (item) => item.text.trim() !== "",
      );
    }

    dispatch(updateNote({ id: editingNote.id, data: updateData }));
    setEditingNote(null);
  };

  const handleChecklistItemChange = (index, value) => {
    const newChecklist = [...editForm.checklist];
    newChecklist[index].text = value;
    setEditForm({ ...editForm, checklist: newChecklist });
  };

  const handleAddChecklistItem = () => {
    setEditForm({
      ...editForm,
      checklist: [...editForm.checklist, { text: "", isCompleted: false }],
    });
  };

  const handleRemoveChecklistItem = (index) => {
    const newChecklist = editForm.checklist.filter((_, i) => i !== index);
    setEditForm({ ...editForm, checklist: newChecklist });
  };

  return (
    <div className="pb-20">
      {displayNotes.length === 0 ? (
        <div className="text-center py-20 text-gray-400 space-y-2">
          <p className="text-xl font-medium text-gray-300">
            Your mind is clear
          </p>
          <p className="text-sm">Start by creating a note above</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
          {displayNotes.map((note) => (
            <div
              key={note.id}
              className="break-inside-avoid bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 group relative hover:-translate-y-1"
            >
              {/* Pin Button */}
              <button
                onClick={() => handleTogglePin(note)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                  note.isPinned
                    ? "text-yellow-500 opacity-100"
                    : "text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100"
                } ${note.isPinned ? "rotate-45" : ""}`}
                title={note.isPinned ? "Unpin note" : "Pin note"}
              >
                <FaThumbtack />
              </button>

              {/* Title */}
              {note.title && (
                <h3 className="font-bold text-lg text-gray-800 mb-3 pr-6 leading-tight">
                  {note.title}
                </h3>
              )}

              {/* Content */}
              {note.type === "text" && (
                <p className="text-gray-600 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                  {note.text}
                </p>
              )}

              {/* Checklist */}
              {note.type === "checklist" && (
                <div className="space-y-2 mt-2">
                  {note.checklist.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 group/item transition-all duration-300 ${
                        item.isCompleted ? "opacity-50" : "opacity-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleToggleChecklist(note, index)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-200 cursor-pointer"
                      />
                      <span
                        className={`text-sm sm:text-base cursor-pointer select-none transition-all duration-200 ${
                          item.isCompleted
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                        onClick={() => handleToggleChecklist(note, index)}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 pt-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-t border-gray-50/0 group-hover:border-gray-50">
                <button
                  onClick={() => handleEditClick(note)}
                  className="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
                  title="Edit note"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => handleArchive(note.id)}
                  className="text-gray-400 hover:text-purple-500 transition-colors p-2 rounded-full hover:bg-purple-50"
                  title="Archive note"
                >
                  <FaArchive size={14} />
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Delete note"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Edit Note</h2>
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Title Input */}
              <input
                type="text"
                placeholder="Title (optional)"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="w-full text-lg font-bold placeholder-gray-400 border-none outline-none bg-transparent focus:ring-0"
              />

              {/* Content */}
              {editingNote.type === "text" ? (
                <textarea
                  placeholder="Take a note..."
                  value={editForm.text}
                  onChange={(e) =>
                    setEditForm({ ...editForm, text: e.target.value })
                  }
                  className="w-full resize-none border border-gray-200 rounded-lg outline-none bg-white placeholder-gray-500 text-gray-700 focus:ring-2 focus:ring-blue-100 p-3 min-h-[150px]"
                />
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium pb-2 border-b border-gray-100">
                    <span>Checklist Items</span>
                  </div>
                  <div className="space-y-2">
                    {editForm.checklist.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 group/item"
                      >
                        <input
                          type="checkbox"
                          checked={item.isCompleted}
                          onChange={() => {
                            const newChecklist = [...editForm.checklist];
                            newChecklist[index].isCompleted = !item.isCompleted;
                            setEditForm({
                              ...editForm,
                              checklist: newChecklist,
                            });
                          }}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) =>
                            handleChecklistItemChange(index, e.target.value)
                          }
                          placeholder={`Item ${index + 1}`}
                          className="flex-1 border border-gray-200 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-100"
                        />
                        {editForm.checklist.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveChecklistItem(index)}
                            className="text-gray-400 hover:text-red-500 transition-all p-1 rounded hover:bg-red-50"
                          >
                            <FaTimes size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddChecklistItem}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-all"
                  >
                    <FaPlus size={12} /> Add item
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
