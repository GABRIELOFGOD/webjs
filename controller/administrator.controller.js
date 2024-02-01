const { isStrongPassword } = require('validator')
const { passwordHasher, saltGenerator } = require('../utils/workingWithPassword')

const { validEmail, validPhone, userEmailChecker, userPhoneChecker, passwordCompare } = require('../utils/validator')

const { adminCreator, createdToken, urlData } = require('../utils/creator')

const registerAdmin = async (req, res) => {
    const { name, phone, email, password } = req.body
    try {
        
        // =================== VALIDATING ADMIN INPUTS ====================== //
        if(!name || !phone || !email || !password) return res.status(401).json({error: 'All input fields are required', success: false})

        // ================== VALIDATING EMAIL AND PHONE ==================== //
        const isEmail = validEmail(email)
        const isPhone = validPhone(phone)

        if(!isEmail) return res.status(401).json({error: 'This is not a valid Email, Kindly check your input and try again'})

        if(!isPhone) return res.status(401).json({error: 'This is not a valid phone number, Kindly check your input and try again'})

        // ================== CHECKING FOR STRONG PASSWORD ================== //
        const strongPassword = isStrongPassword(password)
        if(!strongPassword) return res.status(402).json({error: 'password must include at least an uppercase, a lowercase alphabet, a number, a special character and must be at least 6 character long', success: false})

        // ==================== CHECKING IF USER EXISTS ===================== //
        const checkEmail = await userEmailChecker(email)
        const checkPhone = await userPhoneChecker(phone)
        if(checkEmail || checkPhone) return res.status(401).json({error: 'user already exists, kindly login with your credentials or try forgot password', success: false})

        // ===================== HASHING PASSWORD ===================== //
        const salter = await saltGenerator()
        const hashedPassword = await passwordHasher(password, salter)
        
        // ====================== CREATING NEW ADMIN ==================== //
        const newAdmin = {
            name,
            email,
            phone,
            password: hashedPassword
        }

        const createdAdmin = await adminCreator(newAdmin)
        // const { password, ...other } = await createdAdmin

        // ============== CREATING AND SENDING TOKEN WITH SUCCESS MESSAGE ================== //
        const token = createdToken(createdAdmin._id)
        res.cookie('admin', token, { httpOnly: true, maxAge: 1000*60*60*24*3 })
        res.status(201).json({message: 'New Admin created successfully', success:true})

    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

const administratorLogin = async (req, res) => {
    const {email, phone, password} = req.body
    try {

        // =================== VALIDATING INPUTS ================ //
        if(!phone && !email || !password) return res.status(401).json({error: 'Fill all input fields accordingly', success: false})

        // ================== CHECKING FOR EITHER PHONE OR MAIL ================ //
        if(email && phone) return res.status(401).json({error: 'input either phone or email, cannot pass in both inputs', success:false})

        // ================== FINDING USER FROM DATABASE ================= //
        const isPhone = await userPhoneChecker(phone)
        const isEmail = await userEmailChecker(email)
        const admin = isEmail || isPhone
        if(!admin) return res.status(401).json({error: 'Invalid credentials, please check and try again', success:false})
        
        // ==================== COMPARING USER PASSWORD ================= //
        const isUser = await passwordCompare(password, admin.password)
        if(!isUser) return res.status(401).json({error: 'Invalid credentials, please check and try again', success:false})

        // ================= SIGNING AND SENDING COOKIE WITH SUCCESS RESPONSE ============ //
        const token = createdToken(admin._id)
        res.cookie('admin', token, { httpOnly: true, maxAge: 1000*60*60*24*3 })
        res.status(202).json({message: `Admin ${admin.name} login successfully`, success:true})
        
    } catch (err) {
        res.status(500).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }

}

const allUrls = async (req, res) => {
    try {
        const theUrls = await urlData()
        res.status(202).json({success: true, message: 'All url datas', data: theUrls})
    } catch (err) {
        res.status(500).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

const findAdmin = async (req, res) => {
    const { _id, name, phone, email } = req.admin
    res.status(201).json({message: 'Current admin data', data: { name, phone, email, _id }})
}

const logout = (req, res) => {
    // const { admin } = req.headers.cookie
    try {
        req.headers.cookie
        res.status(201).clearCookie('admin')
        console.log('reached')
    } catch (err) {
        res.status(500).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

module.exports = { registerAdmin, administratorLogin, allUrls, findAdmin, logout }
