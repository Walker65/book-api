const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes publiques
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Routes protégées
router.post('/', authMiddleware.protect, bookController.createBook);
router.put('/:id', authMiddleware.protect, bookController.updateBook);
router.delete('/:id', authMiddleware.protect, bookController.deleteBook);

module.exports = router;