import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotes,
  unarchiveNote,
  deleteNote,
} from "../redux/features/notes/noteSlice";
import Navbar from "../components/Navbar";
import { FaArchive, FaTrash, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";

const Archive = () => {
  const dispatch = useDispatch();
  const { notes, isLoading } = useSelector((state) => state.notes);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotes());
    }
  }, [dispatch, isAuthenticated]);

  // Filter only archived notes from the global notes state
  const archivedNotes = notes.filter((note) => note.isArchived);

  // Handle restoring a note from archive
  const handleUnarchive = async (id) => {
    try {
      await dispatch(unarchiveNote(id)).unwrap();
      toast.success("Note unarchived successfully!");
    } catch (error) {
      toast.error(error || "Failed to unarchive note");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to permanently delete this note?")
    ) {
      try {
        await dispatch(deleteNote(id)).unwrap();
        toast.success("Note deleted successfully!");
      } catch (error) {
        toast.error(error || "Failed to delete note");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
              <FaArchive className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Archive
              </h1>
              <p className="text-gray-600 text-sm">
                {archivedNotes.length} archived{" "}
                {archivedNotes.length === 1 ? "note" : "notes"}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : archivedNotes.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaArchive className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No archived notes
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Notes you archive will appear here. Archive notes to keep your
              workspace clean without deleting them.
            </p>
          </div>
        ) : (
          /* Archived Notes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {archivedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 group"
              >
                {/* Note Title */}
                {note.title && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                )}

                {/* Note Content */}
                {note.type === "text" ? (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-4 whitespace-pre-wrap">
                    {note.text}
                  </p>
                ) : (
                  <div className="mb-4 space-y-2">
                    {note.checklist?.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={item.isCompleted}
                          readOnly
                          className="mt-1 rounded text-purple-600 cursor-default"
                        />
                        <span
                          className={`text-sm ${
                            item.isCompleted
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                    {note.checklist?.length > 4 && (
                      <p className="text-xs text-gray-400 pl-6">
                        +{note.checklist.length - 4} more items
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleUnarchive(note.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FaUndo className="text-xs" />
                    <span>Unarchive</span>
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-gray-400 mt-2">
                  Archived {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
