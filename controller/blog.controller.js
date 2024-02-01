const { blogContextFinder, blogTitleFinder } = require('../utils/validator')
const { blogCreator, allBlogs } = require('../utils/creator');
const cloudinary = require('../utils/cloudinary');
const jwt = require('jsonwebtoken');
const Admin = require('../model/administrator.model');

const createBlog = async (req, res) => {
    const { title, body } = req.body;
    try {
        let image = ''
        
        // =============== VALIDATING INPUT FIELDS ================== //
        if(!title || !body) return res.status(402).json({error: 'Your blog must have a title, context and an image', success: false})
        // if(!req.file) return res.status(402).json({error: 'Your blog must include an image', success: false})
        if(req.file) image = req.file.path
        const theAdmin = req.headers.cookie
        const token = theAdmin.split('=')[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if(err) return res.status(401).json({error: 'This is not a valid token', success: false, errMsg: err})
            const {id} = decodedToken;
            const user = await Admin.findById(id)
            if(!user) return res.status(401).json({error: 'User not found, this user might have been deleted from our server or network issue'})
            const poster = user.name

            // ================== CHECKING IF BLOG EXISTS ====================== //
            let isTitle = await blogTitleFinder(title)
            let isBody = await blogContextFinder(body)
    
            if(isTitle || isBody) return res.status(401).json({error: 'This blog already exists', success: false})
    
            // ======================== UPLOADING IMAGE TO CLOUDINARY =========================== //
            if(req.file){
                const imageResult = await cloudinary.uploader.upload(image, (err, result) => {
                    if(err) return res.status(401).json({error: 'This is a cloudinary error', success: false, errMsg: err})
                    let newPost = {
                        title,
                        body,
                        image: result ? result.secure_url : '',
                        postedBy: user._id,
                        posterName: poster
                    }
                    blogCreator(newPost)
                    return res.status(201).json({message: 'Blog has been posted successfully', success: true})
        
                })
            } else {
                let newPost = {
                    title,
                    body,
                    postedBy: user._id,
                    posterName: poster
                }
                blogCreator(newPost)
                return res.status(201).json({message: 'Blog has been posted successfully', success: true})
            }
        })
        
        // ================== SAVING BLOG TO DATABASE AND SENDING A SUCCESS RESPONSE =================== //
        
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err});
    }
}

const subController = (req, res) => {
    // const { title, body } = req.body;
    // try {
    //     console.log(req.body)
    // } catch (err) {
    //     res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err});
    // }
}

const getBlogs = async (req, res) => {
    try {
        
        let blogs = await allBlogs()
        res.json({message: 'This are all the blogs from the database', success: true, data: blogs})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err});
    }
}

module.exports = { createBlog, getBlogs, subController }
