const express = require('express');
const router = express.Router();
const matchController = require('./controller/match.controller');
const userController = require('./controller/user.controller');
const matchPositionController = require('./controller/match-position.controller');

// MATCH
router.get('/match', matchController.getMatches);
router.post('/match', matchController.addMatch);

// USER
router.get('/user', userController.getUsers);
router.post('/user', userController.addUser);
router.delete('/user', userController.deleteUser);

router.post('/grail', matchPositionController.addMatchPosition);
router.get('/grail', matchPositionController.getMatchPositions);
router.put('/grail',matchPositionController.updatePlayerPosition);

module.exports = router;