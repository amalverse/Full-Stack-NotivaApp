import React from "react";
import CreateNote from "../components/CreateNote";
import NotesList from "../components/Notes";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../redux/features/notes/noteSlice";
import { Link } from "react-router-dom";
import {
  FaStickyNote,
  FaCheckCircle,
  FaArchive,
  FaSearch,
  FaLock,
} from "react-icons/fa";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch notes when the user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchNotes());
    }
  }, [dispatch, isAuthenticated]);

  // Dummy notes for showcase on the landing page
  const dummyNotes = [
    {
      id: 1,
      title: "Welcome to NotivaApp! 🎉",
      type: "text",
      text: "Organize your thoughts, ideas, and tasks in one beautiful place. Start creating notes today!",
      isPinned: true,
    },
    {
      id: 2,
      title: "Shopping List",
      type: "checklist",
      checklist: [
        { text: "Fresh vegetables", isCompleted: true },
        { text: "Organic fruits", isCompleted: false },
        { text: "Whole grain bread", isCompleted: false },
        { text: "Greek yogurt", isCompleted: true },
      ],
      isPinned: false,
    },
    {
      id: 3,
      title: "Project Ideas 💡",
      type: "text",
      text: "1. Build a personal portfolio website\n2. Learn React and Node.js\n3. Create a mobile app\n4. Start a tech blog",
      isPinned: false,
    },
    {
      id: 4,
      title: "Daily Goals",
      type: "checklist",
      checklist: [
        { text: "Morning workout", isCompleted: true },
        { text: "Read for 30 minutes", isCompleted: true },
        { text: "Work on side project", isCompleted: false },
        { text: "Meditation", isCompleted: false },
      ],
      isPinned: false,
    },
  ];

  // Render the Landing Page for non-authenticated users
  // This section displays the hero, features, and demo notes
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <Navbar />

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <FaStickyNote className="text-white text-3xl sm:text-4xl" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Capture Your Ideas
              </span>
              <br />
              <span className="text-gray-800">Organize Your Life</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              NotivaApp helps you keep track of your thoughts, tasks, and ideas
              with beautiful notes and smart checklists.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-purple-600 bg-white border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200 shadow-md hover:shadow-lg text-center"
              >
                Sign In
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-16 px-4">
              <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-md">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <FaStickyNote className="text-blue-600 text-lg sm:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                  Rich Notes
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Create text notes and checklists with ease
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-md">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <FaCheckCircle className="text-purple-600 text-lg sm:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                  Smart Checklists
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Track tasks with auto-sorting checklists
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-md sm:col-span-2 md:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <FaArchive className="text-pink-600 text-lg sm:text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                  Archive & Search
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Keep organized with archive and search
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Notes Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              See It In Action
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Here's what your notes could look like
            </p>
          </div>

          {/* Dummy Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {/* Overlay to prevent interaction */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-50/50 to-transparent z-10 rounded-2xl pointer-events-none"></div>

            {dummyNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-md p-4 sm:p-5 relative hover:shadow-lg transition-all duration-200"
              >
                {/* Pin indicator */}
                {note.isPinned && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-yellow-500">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
                    </svg>
                  </div>
                )}

                {/* Title */}
                {note.title && (
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 sm:mb-3 pr-6">
                    {note.title}
                  </h3>
                )}

                {/* Content */}
                {note.type === "text" ? (
                  <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-wrap line-clamp-4">
                    {note.text}
                  </p>
                ) : (
                  <div className="space-y-1.5 sm:space-y-2">
                    {note.checklist.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={item.isCompleted}
                          readOnly
                          className="mt-0.5 sm:mt-1 rounded text-purple-600 cursor-default w-4 h-4"
                        />
                        <span
                          className={`text-xs sm:text-sm ${
                            item.isCompleted
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lock Overlay Message */}
          <div className="text-center mt-6 sm:mt-8 bg-white/90 backdrop-blur-sm rounded-xl p-5 sm:p-6 shadow-lg max-w-md mx-auto border-2 border-purple-200">
            <FaLock className="text-purple-600 text-2xl sm:text-3xl mx-auto mb-2 sm:mb-3" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Sign up now to create your own notes and stay organized!
            </p>
            <Link
              to="/register"
              className="inline-block w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Render the Dashboard for authenticated users
  // This section displays the Navbar, CreateNote component, and the list of notes
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateNote />

        {/* Recent & Pinned Notes Section */}
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Recent & Pinned Notes
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Your pinned notes and 10 most recent notes
            </p>
          </div>
          <NotesList showAll={false} />
        </div>
      </main>
    </div>
  );
};

export default Home;
