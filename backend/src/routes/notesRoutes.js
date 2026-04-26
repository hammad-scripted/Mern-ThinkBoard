import express from 'express';
import { createNote, getAllNotes } from '../controllers/notesController.js';
const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
export default router;
