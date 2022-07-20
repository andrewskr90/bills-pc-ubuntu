const collectedCardRouter = require('express').Router()

const { verifySession, decodeJwt } = require('../../middleware/auth-middleware')
const { findCollectedCardsMySQL } = require('../../db/queries/collectedCardQueries')
collectedCardRouter.get('/', 
    verifySession,
    decodeJwt,
    findCollectedCardsMySQL,
    (req, res, next) => {
        res.status(200).json(req.collectedCards)
    }
)

module.exports = collectedCardRouter