const cookieParser = require('cookieParser')
require('dotenv')

const verifyUser = (req, res, next) => {
    const verifyCookie = () => {
        const requestCookie = req.cookie
        const verifiedCookie = cookieParser.signedCookie(requestCookie, process.env.COOKIE_SECRET)
        if (!verifiedCookie) {
            res.status(400).json({
                message: 'Inauthentic cookie'
            })
        }
        return verifiedCookie
    }
    verifyCookie()
    next()
}

module.exports = verifyUser
