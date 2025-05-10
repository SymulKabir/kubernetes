const router = require('express').Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Image = require('../DB/models/Image')

const galleryFolderLocation = process.env.GALLERY_FOLDER_LOCATION || '../../../../storage/photo-gallery'
const photoGalleryRootPath = path.join(__dirname, galleryFolderLocation)
console.log("photoGalleryRootPath -->>", photoGalleryRootPath)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, photoGalleryRootPath),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})

const upload = multer({ storage })

router.get('/', async (req, res) => {
    const images = await Image.find().sort({ createdAt: -1 })
    res.render('index', { images })
})

router.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) return res.send('No file uploaded')
    console.log(req.file)
    await Image.create({ filename: req.file.filename })
    res.redirect('/')
})
router.get('/media/:filename', async (req, res) => {
    try {
        const filePath = path.join(photoGalleryRootPath, req.params.filename)
        if (!fs.existsSync(filePath)) {
            res.json({ message: "File not exist" })
        }
        const fileStream = fs.createReadStream(filePath)
        fileStream.pipe(res)
    } catch (error) {
        console.log("error form /media/:filename route -->>", error)
        res.json({ message: "Internal server error" })
    }

})


 

module.exports = router;