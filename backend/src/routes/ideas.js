const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');
const auth = require('../middleware/auth');

// All routes are protected
router.post('/', auth, ideaController.createIdea);
router.get('/', auth, ideaController.getIdeas);
router.get('/:id', auth, ideaController.getIdeaById);
router.delete('/:id', auth, ideaController.deleteIdea);

module.exports = router;
