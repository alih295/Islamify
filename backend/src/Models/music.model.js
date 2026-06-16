const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true , 'title is true ']
    },
    artistName:{
        type:String,

    },
    audioUrl:{
        type:String,
        required:[true , 'audio url is compulsory']
    }
})


const musicModel = mongoose.model('music' , musicSchema)

module.exports = musicModel