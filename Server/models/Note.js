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
        required: true
    },
    status: {
        type: String,
        default: "in-progress",
        enum: ["in-progress", "done"]
    }
});

module.exports = mongoose.model('notes', notesSchema);
