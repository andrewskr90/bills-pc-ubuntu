const authRouter = require('express').Router()
const { addUserMySQL, findUsersByMySQL } = require('../../../db/queries')
const { 
    formatUser, 
    prepLoginFilter, 
    createSession, 
    encryptSession, 
    verifySession,
    decodeJwt
} = require('../../middleware/auth-middleware')

authRouter.post('/register', formatUser, addUserMySQL, async (req, res, next) => {
    res.status(200).json(res.results)
})

authRouter.post('/login', 
    prepLoginFilter, findUsersByMySQL, 
    // createSession, encryptSession,
    (req, res, next) => {
    res.status(200).send({
        message: 'Welcome, user!',
        data: req.results,
        sessionJwt: req.sessionJwt
    })
})

//authorize cookie
authRouter.get('/', verifySession, decodeJwt, (req, res, next) => {
    const session = req.decodedJwt
    res.status(200).json({
        message: 'Welcome, User',
        session: session
    })
})

module.exports = authRouter
