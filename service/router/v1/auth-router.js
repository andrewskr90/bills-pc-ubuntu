const authRouter = require('express').Router()
const { 
    registerUser, 
    loginUser, 
    createSession, 
    encryptSession, 
    verifySession,
    decodeJwt
 } = require('../../middleware/auth-middleware')

authRouter.post('/register', 
registerUser, createSession, encryptSession, 
(req, res, next) => {
    res.status(200).send({
        message: 'User registered!',
        sessionJwt: req.sessionJwt
    })
})

authRouter.post('/login', 
    loginUser, createSession, encryptSession,
    (req, res, next) => {
    res.status(200).send({
        message: 'Welcome, user!',
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
