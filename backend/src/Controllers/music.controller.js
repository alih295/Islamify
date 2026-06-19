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

    // 4. File check
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Audio file is required!" });
    }

    // Agar Google Drive use kar rahe hain toh drive ka link, warna local path
    const audioUrl = req.file.path || req.file.webViewLink;

    // 5. Database mein Save karein
    const newMusic = await musicModel.create({
      title,
      category,
      audioUrl,
      artist: req.user.id, // Yeh ID aapke 'authUser' middleware se aa rahi hai
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
