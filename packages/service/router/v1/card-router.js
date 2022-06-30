const cardRouter = require('express').Router()
const { verifySession, decodeJwt, gymLeaderOnly } = require('../../middleware/auth-middleware')
const { addCardsMySQL } = require('../../db/queries/cardQueries')
const { findCardSetId, alterCardSetIds } = require('../../middleware/card-middleware')

cardRouter.post('/',
    verifySession, 
    decodeJwt,
    gymLeaderOnly,
    findCardSetId,
    alterCardSetIds,
    addCardsMySQL,
    (req, res, next) => {
        const results = req.results
        res.status(200).json({
            data: results
        })
})

module.exports = cardRouter