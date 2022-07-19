const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

const addCollectedCardNotesMySQL = async (req, res, next) => {
    const collectedCardNotes = req.collectedCardNotes
    const queryString = QueryFormatters.objectsToInsert(collectedCardNotes, 'collected_card_notes')
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
        req.addCollectedCardNotesResults = await query
        return next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCollectedCardNotesMySQL
}
