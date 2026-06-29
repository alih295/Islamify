const express = require('express')
const { registerUser, loginUser, getMe, logout, getAllUsers , getCreatorMusic } = require('../Controllers/user.controller')
const authUser = require('../middlewares/user.auth')
const router = express.Router()



router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/me' , authUser , getMe)
router.get('/logout' , logout)
router.get('/get-all-users' , authUser , getAllUsers)
router.post('/get-creator-music' , authUser , getCreatorMusic)


module.exports = router