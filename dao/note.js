
const Note = require("../models/note");

async function createNote({
    user_id,
    note ,
}) {
  return Note.create({
    user_id,
    note,
    date: new Date(),
  });
}

module.exports = { createNote};