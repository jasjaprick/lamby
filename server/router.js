const express = require('express');
const router = express.Router();
const matchController = require('./controller/match.controller');
const userController = require('./controller/user.controller');
const matchPositionController = require('./controller/match-position.controller');

// MATCH
router.get('/match', matchController.getMatches);
router.post('/match', matchController.addMatch);
router.get('/next-match', matchController.getNextMatch);

// USER
router.get('/user/:id', userController.getPlayerById);
router.get('/user', userController.getPlayers);
router.get('/current-user', userController.getCurrentUser);
router.post('/user', userController.addUser);

router.delete('/user', userController.deleteUser);

router.post('/positions', matchPositionController.addMatchPosition);
router.get('/positions', matchPositionController.getMatchPositions);

module.exports = router;
