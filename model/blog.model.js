const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    postedBy:{
        type:mongoose.Types.ObjectId,
        ref: 'Admin'
    },
}, {timestamps: true});

//Export the model

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;