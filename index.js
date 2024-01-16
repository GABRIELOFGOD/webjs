const express = require('express')
const cors = require('cors')
const databaseConnection = require('./config/mongoDB')
require('dotenv').config()
const adminRouter = require('./routes/administrator.router')
const blogRouter = require('./routes/blog.router')
const newsLetterRouter = require('./routes/newsletter.router')
const searchRouter = require('./routes/search.router')

const app = express()

const PORT = process.env.PORT || 3200
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json())

databaseConnection()

const whitelist = [
    '*'
];

app.use((req, res, next) => {
    const origin = req.get('referer');
    const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
    if (isWhitelisted) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    // Pass to next layer of middleware
    if (req.method === 'OPTIONS') res.sendStatus(200);
    else next();
});

app.use('/admin', adminRouter)
app.use('/search', searchRouter)
app.use('/blog', blogRouter)
app.use('/newsletter', newsLetterRouter)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})