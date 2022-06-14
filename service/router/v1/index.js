const v1Router = require('express').Router()

const authRouter = require('./auth-router')

v1Router.use('/auth', authRouter)

module.exports = v1Router
