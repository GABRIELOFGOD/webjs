const express = require('express')
const multer = require('multer')
const { createBlog, getBlogs, subController } = require('../controller/blog.controller')
const authourizer = require('../middleware/userAuthentication')
const adminIdentifier = require('../middleware/identity')

const router = express.Router()

// =========== MULTER CONFIG =========== //
const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, './public/images/')
    // },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({storage})

router.post('/post', upload.single('file'), createBlog)
// router.post('/post', subController)
router.get('/get', getBlogs)

module.exports = router;

