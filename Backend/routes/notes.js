
const express = require('express');
const dairyController = require('../controllers/notes');
const router = express.Router();
router.get('/', dairyController.getAllDairies);
router.post('/:user_id', dairyController.AddnewNote);
router.put('/:user_id', dairyController.editNote);
router.delete('/:user_id', dairyController.deleteNote);
router.get('/:user_id', dairyController.viewNoteById);
router.get('/date/:date',dairyController.viewNoteByDate);

module.exports = router;