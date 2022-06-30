const setRouter = require('express').Router()
const { verifySession, decodeJwt, gymLeaderOnly } = require('../../middleware/auth-middleware')
const { addSetsMySQL } = require('../../db/queries/setQueries')

setRouter.post('/', 
    verifySession,
    decodeJwt,
    gymLeaderOnly, 
    addSetsMySQL, 
    (req, res, next) => {
        res.status(201).json(req.results)
})

module.exports = setRouter
