const Author = require('../models/Author');
const Book = require('../models/Book');

// Créer un nouvel auteur
exports.createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    
    res.status(201).json({
      success: true,
      message: 'Auteur créé avec succès',
      author: newAuthor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'auteur',
      error: error.message
    });
  }
};

// Récupérer tous les auteurs
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    
    res.status(200).json({
      success: true,
      count: authors.length,
      authors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des auteurs',
      error: error.message
    });
  }
};

// Récupérer un auteur par son ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Auteur non trouvé'
      });
    }
    
    // Récupérer les livres de l'auteur
    const books = await Book.find({ author: req.params.id }).select('title publishedYear');
    
    res.status(200).json({
      success: true,
      author,
      books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'auteur',
      error: error.message
    });
  }
};

// Mettre à jour un auteur
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Auteur non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Auteur mis à jour avec succès',
      author
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'auteur',
      error: error.message
    });
  }
};

// Supprimer un auteur
exports.deleteAuthor = async (req, res) => {
  try {
    // Vérifier si l'auteur a des livres associés
    const bookCount = await Book.countDocuments({ author: req.params.id });
    
    if (bookCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de supprimer l\'auteur car il a des livres associés'
      });
    }
    
    const author = await Author.findByIdAndDelete(req.params.id);
    
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Auteur non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Auteur supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'auteur',
      error: error.message
    });
  }
};