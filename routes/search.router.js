const express = require('express')
const {searchInput, getAllUrls, getSingleUrl, flagExplicit} = require('../controller/search.controller');
const authourizer = require('../middleware/userAuthentication');
const adminIdentifier = require('../middleware/identity');

const router = express.Router()

router.route('/check').post(searchInput).get(authourizer, adminIdentifier, getAllUrls)
router.route('/check/:id').get(getSingleUrl).put(flagExplicit)

module.exports = router;
