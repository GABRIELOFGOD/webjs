const { blogContextFinder, blogTitleFinder } = require('../utils/validator')
const { blogCreator, allBlogs } = require('../utils/creator')

const createBlog = async (req, res) => {
    const { title, body } = req.body;
    try {
        let poster = req.admin
        // =============== VALIDATING INPUT FIELDS ================== //
        if(!title || !body || !req.file) return res.status(402).json({error: 'Your blog must have a title, context and an image', success: false})

        // ================== CHECKING IF BLOG EXISTS ====================== //
        let isTitle = await blogTitleFinder(title)
        let isBody = await blogContextFinder(body)

        if(isTitle || isBody) return res.status(401).json({error: 'This blog already exists', success: false})
        
        // ================== SAVING BLOG TO DATABASE AND SENDING A SUCCESS RESPONSE =================== //
        let imagePath = req.file.path
        let newPath = imagePath.replace("\\", '/')
        let otherPath = newPath.replace('\\', '/')
        let newPost = {
            title,
            body,
            image: `${req.protocol}://${req.headers.host}/${otherPath}`,
            postedBy: poster._id
        }
        const newBlog = await blogCreator(newPost)
        res.status(201).json({message: 'Blog has been posted successfully', success: true})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err});
    }
}

const getBlogs = async (req, res) => {
    try {
        
        let blogs = await allBlogs()
        res.status(202).json({message: 'This are all the blogs from the database', success: true, data: blogs})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err});
    }
}

module.exports = { createBlog, getBlogs }
