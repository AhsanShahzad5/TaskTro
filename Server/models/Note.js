// models/Note.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true // or default: Date.now if you want to make it optional
    }
});

module.exports = mongoose.model('notes', notesSchema);
