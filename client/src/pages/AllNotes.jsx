import React from "react";
import NotesList from "../components/Notes";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../redux/features/notes/noteSlice";

const AllNotes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch notes on component mount if user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotes());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Notes</h2>
          <p className="text-gray-600 text-sm mt-1">
            Browse and manage all your notes
          </p>
        </div>
        <NotesList showAll={true} />
      </main>
    </div>
  );
};

export default AllNotes;
