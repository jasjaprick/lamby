const express = require('express');
const router = express.Router();
const posKeyController = require('./controller/position-key.controller')

// POSITION KEYS
router.get('/pos-key', posKeyController.getPosKey);
router.post('/pos-key', posKeyController.addPosKey );


module.exports = router;