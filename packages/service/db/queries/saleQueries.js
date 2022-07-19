const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

const addSalesMySQL = async (req, res, next) => {
    const sales = req.sales
    const queryString = QueryFormatters.objectsToInsert(sales, 'sales')
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
        req.addSalesResults = await query
        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    addSalesMySQL
}