const authRouter = require('express').Router()
const { authenticateUser, createSession, encryptSession, verifySession } = require('../../middleware/auth-middleware')

authRouter.post('/login', authenticateUser, createSession, encryptSession, (req, res, next) => {
    res.status(200).json({
        message: 'Welcome, User',
        date: Date.now(),
        sessionJwt: req.sessionJwt
    })
})

authRouter.post('/cookie', verifySession, (req, res, next) => {
    if (!verifiedSession) {
        next({ message: 'undefined session'})
    }
    res.status(200).json({
        message: 'Welcome, User',
        verifiedCookies: req.verifiedSession
    })
})

module.exports = authRouter
