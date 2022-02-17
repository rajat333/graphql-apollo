// Require the mongoose library
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    timestamps: true
}
);
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
