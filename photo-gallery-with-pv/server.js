const express = require('express')
const setupAppMiddleware = require("./src/middlewares/index")
require('dotenv').config()
require('./src/DB/connection')
const PORT = process.env.PORT || 3000

const app = express()

setupAppMiddleware(app)

app.use(require('./src/routes/index'))


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
