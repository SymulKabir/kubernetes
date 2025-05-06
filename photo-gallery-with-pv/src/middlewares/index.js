
const express = require('express')
const cors = require('cors')
const path = require('path')
const viewFolder = path.join(__dirname, '../../src/views')
 
const setupAppMiddleware = (app) => {
    app.set('views', viewFolder)
    app.set('view engine', 'ejs')
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
}


module.exports = setupAppMiddleware