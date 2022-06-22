const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

// const mysqlQuery = async (req, res, next) => {
//     connection.query(req.query, (err, results) => {
//         if (err) {
//             // if (err.code === 'ER_DUP_ENTRY') {
//             //     return next({ status: 400, message: 'Set(s) already inserted.'})
//             // }
//             // return next(err)
//             console.log('mysqlQuery err')
//             next(err)
//         } else {
//             console.log('mysqlQuery results')
//             req.results = results
//             next()
//         }
//     })
// }

//find, add, update, remove verbage

const addSetsMySQL = async (req, res, next) => {
    const sets = req.body
    const query = QueryFormatters.objectsToInsert(sets, 'sets')
    connection.query(query, (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return next({ status: 400, message: 'Set(s) already inserted.'})
            }
            return next(err)
        } else {
            console.log('mysqlQuery results')
            req.results = results
            next()
        }
    })
}

module.exports = {
    addSetsMySQL
}