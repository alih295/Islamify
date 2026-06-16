const express = require('express')
const app = express()
const musicRoute = require('./Routes/music.route')
app.use(express.json())


app.use('/music' , musicRoute)





module.exports = app


