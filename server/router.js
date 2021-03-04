const express = require('express');
const router = express.Router();
const posKeyController = require('./controller/position-key.controller');
const matchController = require('./controller/match.controller');
const instructionController = require('./controller/instruction.controller');
const userController = require('./controller/user.controller');


// POSITION KEY
router.get('/pos-key', posKeyController.getPosKey);
router.post('/pos-key', posKeyController.addPosKey );

// MATCH
router.get('/match', matchController.getMatches);
router.post('/match', matchController.addMatch);

// INSTRUCTION
router.get('/instruction', instructionController.getInstructions);
router.post('/instruction', instructionController.addInstruction);

// USER
router.get('/user', userController.getUsers);
router.post('/user', userController.addUser);

module.exports = router;