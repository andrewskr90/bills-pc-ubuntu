const saleRouter = require('express').Router()
const { verifySession, decodeJwt } = require('../../middleware/auth-middleware')
const { 
    checkSaleType,
    formatSales,
    formatSaleNotes,
    formatCollectedCards,
    formatCollectedCardNotes,
    formatSaleCards,
    compileSaleResults
} = require('../../middleware/sale-middleware')
const { addCollectedCardsMySQL } = require('../../db/queries/collectedCardQueries')
const { addSalesMySQL } = require('../../db/queries/saleQueries')
const { addSaleCardsMySQL } = require('../../db/queries/saleCardQueries')
const { addSaleNotesMySQL } = require('../../db/queries/saleNoteQueries')
const { addCollectedCardNotesMySQL } = require('../../db/queries/collectedCardNoteQueries')

saleRouter.post('/', 
    verifySession,
    decodeJwt,
    checkSaleType,
    formatSales,
    formatSaleNotes,
    formatCollectedCards,
    formatCollectedCardNotes,
    formatSaleCards,
    addCollectedCardsMySQL,
    addSalesMySQL,
    addSaleCardsMySQL,
    addSaleNotesMySQL,
    addCollectedCardNotesMySQL,
    compileSaleResults,
    (req, res, next) => {
        res.status(200).json(req.saleType)
})

module.exports = saleRouter
