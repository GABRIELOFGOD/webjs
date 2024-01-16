const Admin = require('../model/administrator.model')
const Blog = require('../model/blog.model')
const Newsletter = require('../model/newsletter.model')
const Url = require('../model/urls.model')

const validator = require('validator')
const bcrypt = require('bcryptjs')

const validUrl = (input) => validator.isURL(input)

const urlExist = (url) => Url.findOne({url})

const validEmail = (email) => validator.isEmail(email)

const validPhone = (phone) => validator.isMobilePhone(phone)

const strongPassword = (password) => validator.isStrongPassword(password)

const passwordCompare = (userPassword, dataBasePassword) => bcrypt.compare(userPassword, dataBasePassword)

// ===================== EXISTENCE CHECKERS ===================== //
const userEmailChecker = (email) => Admin.findOne({email})

const userPhoneChecker = (phone) => Admin.findOne({phone})

const newsletterEmailChecker = (email) => Newsletter.findOne({email})

const blogTitleFinder = (title) => Blog.findOne({title})

const blogContextFinder = (body) => Blog.findOne({body})

module.exports = { validUrl, urlExist, validEmail, validPhone, strongPassword, passwordCompare, userEmailChecker, userPhoneChecker, newsletterEmailChecker, blogTitleFinder, blogContextFinder }