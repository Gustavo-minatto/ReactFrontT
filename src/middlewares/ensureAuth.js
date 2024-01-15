const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')

function ensureAuth(request, response, next) {
    const authHeader = request.headers.authorization


    if (!authHeader) {
        throw new AppError('JWT Token não existe', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const subToken = verify(token, authConfig.jwt.secret)

        const data = JSON.parse(subToken.sub)

        request.user = data

        return next()

    } catch {
        throw new AppError('JWT Token inválido', 401)
    }
}

module.exports = ensureAuth