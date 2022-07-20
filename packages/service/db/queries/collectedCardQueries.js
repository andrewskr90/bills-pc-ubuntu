const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

const findCollectedCardsMySQL = async (req, res, next) => {
    const collected_card_user_id = req.claims.user_id
    const queryString = `SELECT * FROM cards 
        RIGHT JOIN collected_cards ON cards.card_id = collected_cards.collected_card_card_id
        LEFT JOIN sets ON cards.card_set_id = sets.set_id
        WHERE collected_card_user_id = '${collected_card_user_id}'`
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
        req.collectedCards = await query
        return next()
    } catch (err) {
        return next(err)
    }
}

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
    addCollectedCardsMySQL,
    findCollectedCardsMySQL
}