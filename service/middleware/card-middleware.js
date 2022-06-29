const { getSetByPtcgioIdMySQL } = require('../../db/queries/setQueries')

const findCardSetId = async (req, res, next) => {
    req.setPtcgioId = req.body[0].card_set_id 
    await getSetByPtcgioIdMySQL(req, res, (err) => {
        if (err) next(err)
        req.set_id = req.set.set_id
        next()
    })
}

const alterCardSetIds = (req, res, next) => {
    const cardsWithBPCSetId = req.body.map(card => {
        const cardWithBPCSetId = {
            ...card,
            card_set_id: req.set_id
        }
        return cardWithBPCSetId
    })
    req.body = cardsWithBPCSetId
    next()
}

module.exports = {
    findCardSetId,
    alterCardSetIds
}