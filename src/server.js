require('express-async-errors');
require("dotenv/config");

const express = require('express')
const AppError = require('./utils/AppError')

const cors = require('cors')

const routes = require('./routes')

const migrationsRun = require('./database/sqlite/migrations')

const uploadConfig = require('./config/upload')

const app = express()
app.use(cors())
app.use(express.json())

app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER))

migrationsRun()

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Erro interno de servidor",
    })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))