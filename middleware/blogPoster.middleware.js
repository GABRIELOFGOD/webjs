const jwt = require('jsonwebtoken')
const Admin = require('../model/administrator.model')

const getPoster = async (admin, res, username) => {
    const token = admin.split('=')[1]
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
        if(err) return res.status(401).json({error: 'This is not a valid token', success: false, errMsg: err})
        const {id} = decodedToken;
        const user = await Admin.findById(id)
        if(!user) return res.status(401).json({error: 'User not found, this user might have been deleted from our server or network issue'})
        username = user.name
    })
    console.log(username)
    return username;
}

module.exports = getPoster;