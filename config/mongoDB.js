const mongoose = require("mongoose");

const databaseConnection = () => {
    const conn = mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('database connected successfully!'))
    .catch(err => console.log('database connection faild', err))
}

module.exports = databaseConnection