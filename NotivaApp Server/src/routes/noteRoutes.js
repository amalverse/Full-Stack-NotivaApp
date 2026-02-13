import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: The notes managing API
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Returns the list of all the notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: The created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 */
// Base route: /api/notes
// Routes for getting all notes and creating a new note
// Protected by auth middleware
router.route("/").get(protect, getNotes).post(protect, createNote);

// Routes for updating and deleting a specific note by ID
router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

// Routes for archiving and unarchiving a note
router.route("/:id/archive").put(protect, archiveNote);
router.route("/:id/unarchive").put(protect, unarchiveNote);

export default router;
