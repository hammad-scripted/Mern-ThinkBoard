import Note from '../models/Note.js';
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 }); //// show the newest first
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json({ message: 'Note found successfully', note });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: 'Title and content are required' });
    }

    const newNote = new Note({ title, content });
    await newNote.save();
    return res
      .status(201)
      .json({ message: 'Note created successfully', newNote });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    // if (!title || !content) {
    //   return res.status(400).json({
    //     message: 'Title and content are required',
    //   });
    // }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { returnDocument: 'after' },
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    return res.status(200).json({
      message: 'Note updated successfully',
      updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }
    return res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
