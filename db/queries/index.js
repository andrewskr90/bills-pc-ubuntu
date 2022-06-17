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
    //req.filter is key/value pairs to search for
    const filter = req.filter
    const queryFilter = filterConcatinated(filter)
    const query = `SELECT * FROM users WHERE (${queryFilter});`

    connection.query(query, (err, results) => {
        if (err) next(err)
        req.results = results
        next()
    })
}

// const updateUser
// const removeUser

module.exports = {
    addUserMySQL,
    findUsersByMySQL
}
