const express = require('express');
const credentialController = require('../controllers/credentials');
const router = express.Router();
router.get('/', credentialController.getUserCredentials);
router.get('/:user_id', credentialController.viewcredentialsById);

router.post('/:user_id', credentialController.AddCredentials);
router.put('/:user_id', credentialController.UpdateCredentials);
router.delete('/:user_id', credentialController.deleteCredentials);

module.exports = router;