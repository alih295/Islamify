const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"], // Validation message thoda clean kiya
    trim: true // Taaki faltu spaces remove ho jayein (e.g. "  Naat " -> "Naat")
  },
  coverImg:{
    type:String,

  }
  ,
  // STRING KI JAGA USER MODEL KI ID CONNECT KAREIN
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Jo aapke User/Creator model ka naam hoga
    required: [true, "Artist reference is required!"]
  },

  audioUrl: {
    type: String,
    required: [true, "Audio URL is compulsory!"],
  },
  
  category: {
    type: String,
    enum: ["byan", "naat", "nazam"],
    default: "naat",
    required: [true, "Please select a specific category!"],
  }
}, { 
  timestamps: true // Isse 'createdAt' aur 'updatedAt' automatically add ho jayenge
});

const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel;