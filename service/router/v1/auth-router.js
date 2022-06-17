const authRouter = require('express').Router()
const { addUserMySQL, findUsersByFilterMySQL } = require('../../../db/queries')
const { 
    formatUser, 
    createSession, 
    encryptSessionCookie, 
    verifySession,
    decodeJwt,
    encryptPassword,
    authenticateUser,
    prepUserFilter
} = require('../../middleware/auth-middleware')

authRouter.post('/register', formatUser, encryptPassword, addUserMySQL, async (req, res, next) => {
    res.status(200).json(res.results)
})

authRouter.post('/login',
    prepUserFilter,
    findUsersByFilterMySQL, 
    authenticateUser,
    createSession, 
    encryptSessionCookie,
    (req, res, next) => {
    res.status(200).send({
        message: 'Welcome, user!',
        data: req.claims
    })
})

//authorize cookie
authRouter.get('/', verifySession, decodeJwt, (req, res, next) => {
    res.status(200).json({
        message: 'Welcome, user!',
        data: req.decodedJwt
    })
})

module.exports = authRouter
