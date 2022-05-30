const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const NoteDao = require("../dao/note");

router.post("/", jsonParser, async (req, res) => {
    console.log(req.body);
    try {
      const newNote = await NoteDao.createNote(req.body);
      res.json({
        message: `Created a new note with note_id ${newNote.note_id}`,
      });
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  });

  module.exports = router;