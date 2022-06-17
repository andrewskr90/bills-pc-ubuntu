const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const isOnlyLetters = (string) => {
    return /^[a-zA-Z]+$/.test(string)
}

const checkRegisterValues = (req, res, next) => {
    const { user_name, user_email, user_password, repeat_user_password, user_favorite_gen } = req.body

    const onlyLetters = isOnlyLetters(user_name)
    
    if (!user_name) {
        next({ status: 400, message: 'Username required.' })
    } else if (!onlyLetters) {
        next({ status: 400, message: 'Username can only have letters.'})
    } else if (!user_email) {
        next({ status: 400, message: 'Email required.' })
    } else if (!user_favorite_gen) {
        next({ status: 400, message: 'Favorite gen required.' })
    } else if (!user_password) {
        next({ status: 400, message: 'Password required.' })
    } else if (!repeat_user_password) {
        next({ status: 400, message: 'Confirm password.' })
    } else if (user_name.length < 3) {
        next({ status: 400, message: 'Trainer name must be at least 3 letters.' })
    } else if (user_password.length < 7) {
        next({ status: 400, message: 'Password must be at least 7 characters long.' })
    } else if (user_password !== repeat_user_password) {
        next({ status: 400, message: 'Passwords do not match.' })
    } 
    next()
}

const formatUser = (req, res, next) => {
    const { user_name, user_email, user_password, user_favorite_gen } = req.body

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
        if (parsedCookies.billsPcSession === undefined) {
            return next({
                status: 401,
                message: 'Missing cookie.'
            })
        }
        if (!parsedCookies.billsPcSession) {
            return next({
                status: 401,
                message: 'Inauthentic cookie.'
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

const prepUserFilter = (req, res, next) => {
    const preppedFilter = { user_name: req.body.user_name}
    req.preppedFilter = preppedFilter
    next()
}

module.exports = {
    formatUser,
    createSession,
    encryptSessionCookie,
    verifySession,
    decodeJwt, 
    encryptPassword, 
    authenticateUser,
    prepUserFilter,
    checkRegisterValues
}
