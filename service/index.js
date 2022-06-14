const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

const server = express()
server.use(bodyParser.json())
server.use(cookieParser(process.env.COOKIE_SECRET))

const rootRouter = require('./router/index')

server.use('/api', rootRouter)

server.use('*', () => {
    console.log('serve client')
})
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err_message: err.message
    })
})

module.exports = server
