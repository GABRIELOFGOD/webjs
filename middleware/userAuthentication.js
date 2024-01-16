const jwt = require('jsonwebtoken')

const authourizer = async (req, res, next) => {
    const isAdmin = req.headers.cookie
    if(isAdmin){

        // ============== CHECKING FOR COOKIE TOKEN =============== //
        const adminTokenName = isAdmin.split('=')[0]
        const adminToken = isAdmin.split('=')[1]
        if(adminTokenName !== 'admin') return res.status(402).json({error: 'Authorization failure, kindly logout and login again', success: false})

        // ====================== VERIFYING TOKEN ===================== //
        jwt.verify(adminToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if(err) return res.status(402).json({error: 'Authorization failure, kindly logout and login again', success: false, errorMgs: err})

            // =================== PROCCEDING TO THE NEXT FUNCTION =============== //
            req.user = decodedToken
            next()
        })
    }else{
        return res.status(402).json({error: 'authentication failed', success: false})
    }
}

module.exports = authourizer;
