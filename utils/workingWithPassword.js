const bcrypt = require('bcryptjs')

const saltGenerator = () => bcrypt.genSalt(10)

const passwordHasher = (password, salt) => bcrypt.hash(password, salt)

module.exports = { saltGenerator, passwordHasher }