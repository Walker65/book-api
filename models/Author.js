const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  biography: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  nationality: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;