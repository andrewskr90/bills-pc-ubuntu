const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const server = express()
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true
}
server.use(cors(corsOptions))
server.use(bodyParser.json())
server.use(cookieParser(process.env.COOKIE_SECRET))

const rootRouter = require('./router/index')

server.use('/api', rootRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = server
