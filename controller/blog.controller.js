const { blogContextFinder, blogTitleFinder } = require('../utils/validator')
const { blogCreator, allBlogs } = require('../utils/creator');
const cloudinary = require('../utils/cloudinary');

const createBlog = async (req, res) => {
    const { title, body } = req.body;
    try {
        let poster = req.admin
        let image = req.file.path
        console.log(req.file.path)
        // =============== VALIDATING INPUT FIELDS ================== //
        // if(!title || !body || !image) return res.status(402).json({error: 'Your blog must have a title, context and an image', success: false})

        // ================== CHECKING IF BLOG EXISTS ====================== //
        let isTitle = await blogTitleFinder(title)
        let isBody = await blogContextFinder(body)

        if(isTitle || isBody) return res.status(401).json({error: 'This blog already exists', success: false})

        // ======================== UPLOADING IMAGE TO CLOUDINARY =========================== //
        const imageResult = await cloudinary.uploader.upload(image, (err, result) => {
            if(err) return res.status(401).json({error: 'This is a cloudinary error', success: false, errMsg: err})
            let newPost = {
                title,
                body,
                image: result.secure_url
                // postedBy: poster._id
            }
            console.log(newPost)
            res.status(201).json({message: 'Blog has been posted successfully', success: true})

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
        res.status(202).json({message: 'This are all the blogs from the database', success: true, data: blogs})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err});
    }
}

module.exports = { createBlog, getBlogs, subController }
