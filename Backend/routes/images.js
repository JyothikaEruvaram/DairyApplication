const express = require('express');
const imageController = require('../controllers/images');
const router = express.Router();


router.post('/:note_id',imageController.upload,imageController.multipleFileUpload);
router.get('/:note_id', imageController.getallMultipleFiles);


module.exports = router;