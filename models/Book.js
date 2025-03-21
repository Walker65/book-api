const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  publishedYear: {
    type: Number
  },
  genre: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isbn: {
    type: String,
    trim: true,
    unique: true
  },
  pages: {
    type: Number
  },
  language: {
    type: String,
    default: 'Français'
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;