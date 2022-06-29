const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

//find, add, update, remove verbage

const addCardsMySQL = async (req, res, next) => {
    const cards = req.body
    const query = QueryFormatters.objectsToInsert(cards, 'cards')
    connection.query(query, (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return next({ status: 400, message: 'Card(s) already inserted.'})
            }
            return next(err)
        } else {
            req.results = results
            next()
        }
    })
}

module.exports = {
    addCardsMySQL
}
