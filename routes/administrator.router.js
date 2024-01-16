const express = require('express')
const { registerAdmin, administratorLogin, allUrls } = require('../controller/administrator.controller')
const authourizer = require('../middleware/userAuthentication')

const router = express.Router()

// ================ REGISTRATION ROUTE ================= //
router.route('/register').post(authourizer, registerAdmin)

// ================= LOGIN ROUTE ================== //
router.route('/login').post(administratorLogin)

// =================== DATABASE URLS ================== //
router.route('/urls').get(allUrls)

module.exports = router;
