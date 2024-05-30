// basically models folder contains our schemas that we will make using mongoose to use in mongodb. it gives structure to the documents(tables) we will make

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true ,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
    ,

    date: {
        type: Date,
        default: Date.now 
    },
    projects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project',
        },
      ],
    }, { timestamps: true 
});

const User = mongoose.model('User' , userSchema);
module.exports = User ;