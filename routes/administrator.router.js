const express = require('express')
const { registerAdmin, administratorLogin, allUrls, findAdmin, logout } = require('../controller/administrator.controller')
const authourizer = require('../middleware/userAuthentication')
const adminIdentifier = require('../middleware/identity')

const router = express.Router()

// ================ REGISTRATION ROUTE ================= //
router.route('/register').post(authourizer, registerAdmin)

// ================= LOGIN ROUTE ================== //
router.route('/login').post(administratorLogin).get(authourizer, adminIdentifier, findAdmin)
router.get('/logout', logout)

// =================== DATABASE URLS ================== //
router.route('/urls').get(allUrls)

module.exports = router;
