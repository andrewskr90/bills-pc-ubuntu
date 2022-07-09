const setRouter = require('express').Router()
const { verifySession, decodeJwt, gymLeaderOnly } = require('../../middleware/auth-middleware')
const { addSetsMySQL, getSetsMySQL } = require('../../db/queries/setQueries')

setRouter.get('/', 
    verifySession,
    decodeJwt,
    getSetsMySQL, 
    (req, res, next) => {
        res.status(200).json(req.results)
})

setRouter.post('/', 
    verifySession,
    decodeJwt,
    gymLeaderOnly, 
    addSetsMySQL, 
    (req, res, next) => {
        res.status(201).json(req.results)
})

module.exports = setRouter
