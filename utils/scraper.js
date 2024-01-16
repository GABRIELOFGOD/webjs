// import cherio from 'cherio'
const request = require('request')

const filterer = (url) => {
    request(url, (err, res, html) => {
        if(!err && res.statusCode == 200){
            console.log('request success')
        }
        else{
            throw Error('can make request')
        }
    })
}

module.exports = filterer