const authRouter = require('express').Router()

authRouter.post('/login', (req, res, next) => {
    console.log(req.body)
    res.status(200).json({
        message: 'Welcome, User'
    })
})

module.exports = authRouter
