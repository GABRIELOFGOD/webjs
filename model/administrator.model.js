const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
var adminSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    password:String
}, {timestamps: true});

//Export the model

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;