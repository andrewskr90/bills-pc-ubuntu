const mysql = require('mysql')
const config = require('../config')


const connection = mysql.createConnection(config.MYSQL)
connection.connect()

module.exports = connection
