const v1Router = require('express').Router()

const authRouter = require('./auth-router')
const setRouter = require('./set-router')

v1Router.use('/auth', authRouter)
v1Router.use('/sets', setRouter)

module.exports = v1Router
