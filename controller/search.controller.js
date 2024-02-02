const request = require('request')
const cherio = require('cherio')
const { validUrl, urlExist } = require('../utils/validator')
const { newUri, urlData, getAUrl, changeExplicit } = require('../utils/creator')

const searchInput = async (req, res) => {
    const { url, information } = req.body
    try {

        if(!url) return res.status(401).json({error: 'Input a url and information if there is any.', success: false})

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
                    images:urls,
                    information
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

const getAllUrls = async(req, res) => {
    try {
        const allUrls = await urlData()
        res.status(201).json({data: allUrls})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

const getSingleUrl = async (req, res) => {
    try {
        const {id} = req.params
        const result = await getAUrl(id)
        res.status(202).json({data: result})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

const flagExplicit = async (req, res) => {
    const {id} = req.params
    const isExplicit = req.body
    try {
        const updatedUrl = await changeExplicit(id, isExplicit)
        const post = await getAUrl(id)
        res.status(201).json({message: 'Url updated successfully', data: updatedUrl})
    } catch (err) {
        res.status(501).json({error: 'Server not reached, check your internet and try again. If this error persists, kindly reach out to our support', success: false, errMsg: err})
    }
}

module.exports = {searchInput, getAllUrls, getSingleUrl, flagExplicit};
