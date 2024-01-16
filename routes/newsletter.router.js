const express = require('express')
const createNewsletter = require('../controller/newsletter.controller')

const router = express.Router()

router.route('/subscribe').post(createNewsletter)

module.exports = router;
