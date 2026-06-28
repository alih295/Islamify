const musicModel = require("../Models/music.model");

const createMusic = async (req, res) => {
  try {
    // 1. ROLE CHECK: Agar user creator nahi hai, toh yahin se block kar dein
    if (req.user.role !== "creator") {
      return res
        .status(403) // 403 Forbidden (Matlab user logged in toh hai par permission nahi hai)
        .json({
          success: false,
          message: "Only creators are allowed to upload music/audio!",
        });
    }

    // 2. req.body se data nikalen (Ab artistName ki zaroorat nahi kyunki hum req.user use kar rahe hain)
    const { title, category } = req.body;

    // 3. FIX: Validation check ko correct operator (||) ke sath likhein
    if (!title || !category) {
      return res
        .status(400) // 300 ki jaga 400 (Bad Request) standard hai
        .json({
          success: false,
          message: "All fields (title, category) are required!",
        });
    }

    const audioFile = req.files?.["audioFile"]?.[0];
    const imgFile = req.files?.["coverImg"]?.[0];

    const audioUrl = audioFile ? audioFile.filename : null;
    const coverImg = imgFile ? imgFile.filename : null;

    if (!audioFile) {
      return res
        .status(400)
        .json({ success: false, message: "Audio file is required!" });
    }
    if (!imgFile) {
      return res
        .status(400)
        .json({ success: false, message: "Cover image is required!" });
    }

    // 4. Database mein Save karein
    const newMusic = await musicModel.create({
      title,
      category,
      audioUrl,
      coverImg,
      artist: req.user.id,
    });

    return res.status(201).json({ success: true, data: newMusic });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getAllMusic = async (req, res) => {
  const music = await musicModel.find();

  res.status(200).json({ success: true, message: "music found is ", music });
};

module.exports = { getAllMusic, createMusic };
