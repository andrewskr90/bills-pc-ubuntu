const connection = require('..')
const QueryFormatters = require('../../utils/QueryFormatters')

//find, add, update, remove verbage

const addSetsMySQL = async (req, res, next) => {
    const sets = req.body
    const query = QueryFormatters.objectsToInsert(sets, 'sets')
    connection.query(query, (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return next({ status: 400, message: 'Set(s) already inserted.'})
            }
            return next(err)
        } else {
            req.results = results
            next()
        }
    })
}

const getSetsMySQL = async (req, res, next) => {
    const query = `SELECT * FROM sets`
    connection.query(query, (err, results) => {
        if (err) {
            return next(err)
        } else {
            req.results = results
            return next()
        }
    })
}

const getSetByPtcgioIdMySQL = async (req, res, next) => {
    const { set_ptcgio_id } = req.body
    const queryFilter = QueryFormatters.filterConcatinated(set_ptcgio_id)
    const query = `SELECT * FROM sets WHERE ${queryFilter};`
    connection.query(query, (err, results) => {
        if (err) {
            return next(err)
        }
        req.set = results[0]
        return next()
    })
}

module.exports = {
    addSetsMySQL,
    getSetsMySQL,
    getSetByPtcgioIdMySQL
}
