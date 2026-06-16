const express = require('express')
const { getAllMusic, createMusic } = require('../Controllers/music.controller')
const router = express.Router()
const upload = require('../config/multer/multer')


router.get('/get' , getAllMusic)
router.post('/create' , upload.single('audioFile') , createMusic)


module.exports = router