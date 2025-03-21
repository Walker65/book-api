const Book = require('../models/Book');

// Créer un nouveau livre
exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    
    res.status(201).json({
      success: true,
      message: 'Livre créé avec succès',
      book: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du livre',
      error: error.message
    });
  }
};

// Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'name');
    
    res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des livres',
      error: error.message
    });
  }
};

// Récupérer un livre par son ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author');
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du livre',
      error: error.message
    });
  }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author');
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Livre mis à jour avec succès',
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du livre',
      error: error.message
    });
  }
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livre non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Livre supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du livre',
      error: error.message
    });
  }
};