import Note from "../models/Note.js";

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
// Fetch all notes for the authenticated user, sorted by creation date (newest first).
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create note
// @route   POST /api/notes
// @access  Private
// Create a new note. Validates that the note has some content (title, text, or checklist items).
const createNote = async (req, res) => {
  try {
    const { title, type, text, checklist, isPinned } = req.body;

    if (!title && !text && (!checklist || checklist.length === 0)) {
      return res
        .status(400)
        .json({ message: "Please add content to your note" });
    }

    const note = await Note.create({
      user: req.user.id,
      title,
      type,
      text,
      checklist,
      isPinned,
    });

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
// Update an existing note. Checks if the note exists and if the user is authorized to update it.
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Make sure the logged in user matches the note user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
// Delete a specific note. Verifies the note exists and belongs to the user before deletion.
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Make sure the logged in user matches the note user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await note.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Archive note
// @route   PUT /api/notes/:id/archive
// @access  Private
// Mark a note as archived. This moves it to the archive section without deleting it.
const archiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Make sure the logged in user matches the note user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true },
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Unarchive note
// @route   PUT /api/notes/:id/unarchive
// @access  Private
// Remove a note from the archive and restore it to the main notes list.
const unarchiveNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Make sure the logged in user matches the note user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { isArchived: false },
      { new: true },
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
};
