const Sequelize = require("sequelize");
const { Note, Category } = require("../models");

exports.addNote = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const note = await Note.create({ title, content, categoryId });
    res.json(note);
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ error: "The specified category does not exist" });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Note already exists" });
    } else {
      res.status(500).json({ error: "Error creating note" });
    }
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error getting notes" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const noteUpdated = await Note.update(req.body, {
      where: { id: id },
    });
    res.json(noteUpdated);
  } catch (error) {
    res.status(500).json({ error: "Error editing note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    await note.destroy();
    res.json({ message: "Note successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting note" });
  }
};

exports.archiveNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    note.archived = true;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error archiving note" });
  }
};

exports.unarchiveNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    note.archived = false;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error unarchiving note" });
  }
};

exports.getArchivedNotes = async (req, res) => {
  try {
    const archivedNotes = await Note.findAll({
      where: {
        archived: true,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.json(archivedNotes);
  } catch (error) {
    res.status(500).json({ error: "Error getting archived notes" });
  }
};

exports.getActiveNotes = async (req, res) => {
  try {
    const archivedNotes = await Note.findAll({
      where: {
        archived: false,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    res.json(archivedNotes);
  } catch (error) {
    res.status(500).json({ error: "Error getting active notes" });
  }
};
