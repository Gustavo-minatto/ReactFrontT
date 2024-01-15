const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { compare } = require('bcryptjs')

const authConfig = require('../config/auth')

const { sign } = require('jsonwebtoken')

class SessionController {
    async create(request, response) {
        const { email, password } = request.body

        const user = await knex('users').where({ email }).first()

        if (!user) {
            throw new AppError('Email ou senha incorrenta', 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Email ou senha incorrenta', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const subject = {
            id: user.id,
            isAdm: user.isAdm
        }

        const token = sign({}, secret, {
            subject: JSON.stringify(subject),
            expiresIn
        })


        return response.json({ user, token })
    }
}

module.exports = SessionController