const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017'
const BD_NAME = 'image-gallery'

mongoose.connect(`${DB_URL}/${BD_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch(() => {
    console.log('Failed to connect with MongoDB')
})