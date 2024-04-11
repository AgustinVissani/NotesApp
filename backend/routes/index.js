var express = require("express");
var router = express.Router();

const notes_controller = require("../controllers/notes_controller");

/* GET home page. */
router.get("/", notes_controller.getNotes);

router.post("/", notes_controller.addNote);

router.put("/:id", notes_controller.updateNote);

router.delete("/:id", notes_controller.deleteNote);

router.put('/:id/archive', notes_controller.archiveNote);

router.put('/:id/unarchive', notes_controller.unarchiveNote);

router.get('/active', notes_controller.getActiveNotes);

router.get('/archived', notes_controller.getArchivedNotes);

module.exports = router;
