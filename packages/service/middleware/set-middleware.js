const { v4: uuidV4 } = require('uuid')

const generateSetIds = (req, res, next) => {
    const setsWithIds = req.body.map(set => {
        return {
            ...set,
            set_id: uuidV4()
        }
    })
    req.sets = setsWithIds
    next()
}

module.exports = {
    generateSetIds
}