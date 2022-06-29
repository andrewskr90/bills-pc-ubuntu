const v1Router = require('express').Router()

const authRouter = require('./auth-router')
const cardRouter = require('./card-router')
const setRouter = require('./set-router')

v1Router.use('/auth', authRouter)
v1Router.use('/sets', setRouter)
v1Router.use('/cards', cardRouter)

module.exports = v1Router
