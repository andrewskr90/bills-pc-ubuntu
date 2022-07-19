const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

const addSaleNotesMySQL = async (req, res, next) => {
    const saleNotes = req.saleNotes
    const queryString = QueryFormatters.objectsToInsert(saleNotes, 'sale_notes')
    const query = new Promise((resolve, reject) => {
        connection.query(queryString, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
    try {
        req.addSaleNotesResults = await query
        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    addSaleNotesMySQL
}
