const Admin = require('../model/administrator.model')
const Blog = require('../model/blog.model')
const Newsletter = require('../model/newsletter.model')
const Url = require('../model/urls.model')

const jwt = require('jsonwebtoken')

// interface uriProp{
//     url:string,
//     images:string[]
// }

// interface adminProp{
//     name:string,
//     email:string,
//     phone:string,
//     password:string
// }

// interface newsletterProp{
//     email: string;
//     name: string;
// }

// interface blogProp{
//     title:string;
//     body:string;
//     image:string | undefined;
//     postedBy?: string | undefined
// }

const newUri = (prop) => Url.create(prop)

const adminCreator = (information) => Admin.create(information)

const addingNewsletter = (user) => Newsletter.create(user)

const blogCreator = (blog) => Blog.create(blog)

const createdToken = (id) => {
    return(jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: '3d'}))
}

const urlData = () => Url.find()

const allBlogs = () => Blog.find()

const getAUrl = (id) => Url.findById(id)

const changeExplicit = (id, body) => Url.findByIdAndUpdate(id, body)

module.exports = { newUri, adminCreator, addingNewsletter, blogCreator, createdToken, urlData, allBlogs, getAUrl, changeExplicit }
