const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv')

const authenticateUser = (req, res, next) => {
    if (req.body.user_name) {
        next()
    } else {
        next({
            message: 'user does not exist'
        })
    }
}

const createSession = (req, res, next) => {
    const { user_id, user_name, user_role, user_email } = req.body
    const claims = {
        id: user_id,
        sub: user_name,
        role: user_role,
        email: user_email,
        iat: Date.now()
    }
    const jwtOptions = {
        expiresIn: '2h'
    }

    try {
        const sessionJwt = jwt.sign(claims, process.env.JWT_SECRET, jwtOptions)
        // req.sessionJwt = sessionJwt
        next()
    } catch (err) {
        next(err)
    }
}

const encryptSession = (req, res, next) => {
    const cookieOptions = {
        signed: true,
        httpOnly: true,
        maxAge: 1000*60*60*2
    }
    res.cookie('billsPcSession', req.sessionJwt, cookieOptions)
    next()
}

const verifySession = async (req, res, next) => {
    const verifyCookie = () => {
        console.log(req.cookies)
        const requestCookies = req.cookies
        const verifiedCookies = cookieParser.signedCookies(requestCookies, process.env.COOKIE_SECRET)
        if (!verifiedCookies.billsPcSession) {
            res.status(400).json({
                message: 'Inauthentic cookie'
            })
        }
        return verifiedCookies.billsPcSession
    }
    try {
        req.verifiedSession = await verifyCookie()
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenticateUser,
    createSession,
    encryptSession,
    verifySession
}
