const mysql = require('mysql')
const config = require('../config')


const connection = mysql.createConnection(config.DB)
connection.connect()

module.exports = connection
