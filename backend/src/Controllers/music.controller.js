const musicModel = require("../Models/music.model");

 const createMusic = async (req, res) => {
  try {
    const { title, artistName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const audioUrl = req.file.path; 

    const newMusic = await musicModel.create({ 
      title, 
      artistName, 
      audioUrl 
    });

    return res.status(201).json({ success: true, data: newMusic });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getAllMusic = async (req, res) => {
  const music = await musicModel.find();

  res.status(200).json({ message: "music found is ", music });
};

module.exports = { getAllMusic, createMusic };
