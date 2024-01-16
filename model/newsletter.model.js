const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
var newsletterSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    }
}, {timestamps: true});

//Export the model

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
module.exports = Newsletter;