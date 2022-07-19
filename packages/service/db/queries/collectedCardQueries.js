const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

const addCollectedCardsMySQL = async (req, res, next) => {
    const collectedCards = req.collectedCards
    const queryString = QueryFormatters.objectsToInsert(collectedCards, 'collected_cards')
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
        req.addCollectedCardsResults = await query
        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    addCollectedCardsMySQL
}