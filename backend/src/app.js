const express = require('express')
const app = express()
const musicRoute = require('./Routes/music.route')
const userRouter = require('../src/Routes/user.route')
app.use(express.json())


app.use('/api/music' , musicRoute)
app.use('/api/user' , userRouter)





module.exports = app


