const Admin = require('../model/administrator.model')

const adminIdentifier = async (req, res, next) => {
    const {id} = req.user
    try {
        
        // =============== IDENTIFYING ADMIN ================ //
        const theAdmin = await Admin.findById(id)
        if(!theAdmin) return res.status(402).json({error: 'This admin does not long exist', success: false})
        
        // =================== PROCCEDING TO THE NEXT FUNCTION =============== //
        req.admin = theAdmin
        next()
    } catch (err) {
        res.status(402).json({error: 'something went wrong, please try again', success: false, errorMsg: err})
    }
}

module.exports = adminIdentifier;
