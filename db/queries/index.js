const connection = require('../../db')
const { seperateColumnsValues, filterConcatinated } = require('../../utils/queryFormatters')

//find, add, update, remove verbage

const addUserMySQL = (req, res, next) => {
    const user = req.user
    const { columns, values } = seperateColumnsValues(user)
    const query = `INSERT INTO users (${columns}) VALUES (${values});`

    connection.query(query, (err, results) => {
        if (err) next(err)
        req.results = results
        next()
    })
}

const findUsersByMySQL = (req, res, next) => {
    const queryFilter = filterConcatinated({ user_name: req.body.user_name})
    const query = `SELECT * FROM users WHERE ${queryFilter};`
    connection.query(query, (err, results) => {
        if (err) next(err)
        req.results = results[0]
        next()
    })
}

// const updateUser
// const removeUser

module.exports = {
    addUserMySQL,
    findUsersByMySQL
}
