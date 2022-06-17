const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
        user_favorite_gen
    }
    req.user = formattedUser
    next()
}

const createSession = (req, res, next) => {
    const { user_id,
         user_name,
         user_role,
         user_email,
         user_favorite_gen,
         created_date,
         modified_date } = req.results
    const claims = {
        id: user_id,
        sub: user_name,
        role: user_role,
        email: user_email,
        favorite_gen: user_favorite_gen,
        created_date: created_date,
        modified_date: modified_date,
        iat: Date.now()
    }
    req.claims = claims
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

const encryptSessionCookie = (req, res, next) => {
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

const encryptPassword = (req, res, next) => {
    const rounds = 10
    bcrypt.hash(req.user.user_password, rounds, (err, hash) => {
        if (err) {
            next(err)
        } else {
            req.user.user_password = hash
            next()
        }
    })
}

const authenticateUser = (req, res, next) => {
    const password = req.body.user_password
    const hash = req.results.user_password
    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            next(err)
        } else if (!result) {
            next({ message: 'Incorrect username and password.' })
        } else {
            next()
        }
    })
}

module.exports = {
    formatUser,
    createSession,
    encryptSessionCookie,
    verifySession,
    decodeJwt, 
    encryptPassword, 
    authenticateUser
}
