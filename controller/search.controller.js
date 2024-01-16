const request = require('request')
const cherio = require('cherio')
const { validUrl, urlExist } = require('../utils/validator')
const { newUri } = require('../utils/creator')

const searchInput = async (req, res) => {
    const { url } = req.body
    try {
        const urls = []
        // =============== VALIDATING URL ================== //
        const isUrl = validUrl(url)
        if(!isUrl) return res.status(401).json({error: 'This is not a url', success: false})

        // =============== CHECKING IF URL EXISTS ================= //
        const urlChecker = await urlExist(url)
        if(urlChecker) return res.status(401).json({error: 'this URL already exists in our database', success: false})

        // ================ PERFORMING WEB SCARPING ============= //
        request(url, async (err, resp, html) => {
            if(!err && resp.statusCode == 200){
                const $ = cherio.load(html)
                $('img').each((index, image) => {
                    let img = $(image).attr('src')
                    const link = url + img
                    urls.push(link)
                })
                const savedData = await newUri({
                    url:url,
                    images:urls
                })

                // ==================== SENDING SUCCESS RESPONSE ====================== //
                // userIPGetter()
                res.status(201).json({message: 'Thank you for using our server, Your url will be looked into and we we will get back you.', success: true})
            }
            else{
                return res.status(500).json({error: 'invalid url, check your input and try again.', success: false})
            }
        })

        // ================= SENDING SUCCESS RESPONSE ================= //
        // res.status(201).json({success: "url successfully checked"}) 

    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

module.exports = searchInput;
