const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const urlSchema = new mongoose.Schema({
    url:String,
    information: String,
    images:[String],
    isExplicit:{
        type: Boolean,
        default: false
    }
}, {timestamps:true});

//Export the model
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;