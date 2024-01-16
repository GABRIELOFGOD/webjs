const { validEmail, newsletterEmailChecker } = require('../utils/validator')
const { addingNewsletter } = require('../utils/creator')

const createNewsletter = async (req, res) => {
    const { name, email } = req.body
    try {
        // ================= VALIDATINGN INPUTS ===================== //
        if(!name || !email) return res.status(402).json({error: 'All input fields are required', success: false})

        // ===================== CHECKING FOR VALID EMAIL ====================== //
        const isEmail = validEmail(email)
        if(!isEmail) return res.status(401).json({success: false, error: 'This is not a valid email'})

        // ===================== CHECKING EMAIL FROM DATABASE ================= //
        const isExist = await newsletterEmailChecker(email)
        if(isExist) return res.status(202).json({success: true, message: 'You have successfully subscribe to our newsletter'})

        // ==================== ADDING USUER TO NEWSLETTER ==================== //
        const newNewsletter = await addingNewsletter({email, name})
        res.status(201).json({message: 'You have successfully subscribe to our newsletter', success: true})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

module.exports = createNewsletter