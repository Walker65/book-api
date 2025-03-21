const express = require('express');
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes publiques
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);

// Routes protégées
router.post('/', authMiddleware.protect, authorController.createAuthor);
router.put('/:id', authMiddleware.protect, authorController.updateAuthor);
router.delete('/:id', authMiddleware.protect, authorController.deleteAuthor);

module.exports = router;