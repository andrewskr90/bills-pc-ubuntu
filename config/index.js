require('dotenv').config()

console.log(process.env.SQL_PASSWORD)
module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        database: 'bills_pc',
        password: process.env.SQL_PASSWORD
    }
}