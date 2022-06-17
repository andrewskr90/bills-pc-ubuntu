const jwt = require('jsonwebtoken')
require('dotenv')

const formatUser = (req, res, next) => {
    const { user_name, user_email, user_password, user_favorite_gen } = req.body
    if (!user_name) {
        next({
            message: 'Username required.'
        })
    } else if (!user_email) {
        next({
            message: 'Email required.'
        })
    }

    const formattedUser = {
        user_name,
        user_password,
        user_role: 'Trainer',
        user_email,
        user_favorite_gen,
        // created_at: Date.UTC()
    }
    req.user = formattedUser
    next()
}

const prepLoginFilter = (req, res, next) => {
    const { user_name, user_password } = req.body
    req.filter = { user_name, user_password }
    next()
}

const createSession = (req, res, next) => {
    const { user_id, user_name, user_role, user_email } = req.userObject
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
        req.sessionJwt = sessionJwt
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
        const parsedCookies = req.signedCookies
        if (!parsedCookies.billsPcSession) {
            res.status(400).json({
                message: 'Inauthentic cookie'
            })
        }
        return parsedCookies.billsPcSession
    }
    try {
        req.verifiedSession = await verifyCookie()
        next()
    } catch (err) {
        next(err)
    }
}

const decodeJwt = async (req, res, next) => {
    try {
        const decodedJwt = await jwt.verify(req.verifiedSession, process.env.JWT_SECRET)
        req.decodedJwt = decodedJwt
        next()
    } catch (err) {
        next(err)
    }
    
}

module.exports = {
    formatUser,
    prepLoginFilter,
    createSession,
    encryptSession,
    verifySession,
    decodeJwt
}
