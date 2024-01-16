const express = require('express')
const searchInput = require('../controller/search.controller')

const router = express.Router()

router.route('/check').post(searchInput)

module.exports = router;
