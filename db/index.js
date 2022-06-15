const mysql = require('mysql')
const config = require('../config')

const connection = mysql.createConnection(config.db)
console.log(config.db)
connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('DB connected')
        connection.query('SHOW DATABASES', (err, result) => {
            if (err) {console.log(`Error executing query - ${err}`)}
            else {console.log('Result', result)}
        })
    }
})