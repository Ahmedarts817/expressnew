const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
    googleId : {
        type : String,
        required:true,
    },
    createdAt : {
        type : Date,
        default : new Date(),
        required:true,

    }
})

module.exports = mongoose.model('GoogleUser',googleUserSchema);