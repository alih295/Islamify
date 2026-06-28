import React, { useState } from 'react';
import useMusicApi from '../Hooks/useMusicApi'

function AddMusicForm({ setShowForm }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("naat");
  const [audioFile, setAudioFile] = useState(null); 
  const [coverImg, setCoverImg] = useState(null); // 👈 1. Image ke liye nayi state
  
  const { addMusic, error, loading } = useMusicApi()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!audioFile) {
      alert("Please select an audio file first.");
      return;
    }
    if (!coverImg) {
      alert("Please select a cover image first."); // Validation check
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("title", title);
    dataToSend.append("category", category);
    
    // ⚠️ YAAD RAHRE: Yeh keys ("audio" aur "coverImg") wahi honi chahiye jo backend par Multer ke .fields() mein hain!
    dataToSend.append("audioFile", audioFile); 
    dataToSend.append("coverImg", coverImg); // 👈 2. Image ko append kiya

    try {
      const success = await addMusic(dataToSend);
      if (success) {
        setShowForm(false); 
      }
    } catch (err) {
      console.error("Form submission layout crash:", err.nmessage);
    }
  };

  return (
    <section className='w-full min-h-screen absolute top-0 left-0 z-50 font-[Jakarta] flex items-center justify-center bg-bg-main/70 backdrop-blur-xl p-10'>
      
      <div className="w-[85%] h-[85vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden border border-stone-100">
        
        {/* Left Side: Islamic Tag & Wisdom */}
        <div className='w-[40%] h-full bg-emerald-900 text-stone-100 p-10 flex flex-col justify-between relative overflow-hidden'>
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="relative z-10">
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Publish Content</span>
            <h1 className="text-3xl font-serif font-semibold mt-4 text-amber-100 leading-snug">"Speak good or remain silent."</h1>
            <p className="text-stone-300 text-xs mt-1">— Sahih al-Bukhari</p>
          </div>
          <div className="relative z-10 border-l-2 border-amber-400/40 pl-5 my-auto">
            <h3 className="text-amber-200 text-sm font-semibold mb-2 uppercase tracking-wider">The Power of Voice</h3>
            <p className="text-stone-200 text-sm leading-relaxed italic">
              "A scholar once mentioned that an audio recording carrying truth, peace, or praise is like a recurring charity (Sadaqah Jariyah)..."
            </p>
          </div>
          <div className="relative z-10 text-xs text-stone-400 tracking-wide">Share your voice with the community.</div>
        </div>

        {/* Right Side: Upload Form */}
        <form onSubmit={handleSubmit} className='w-[50%] h-full bg-white p-10 flex flex-col justify-center border-l border-stone-50 overflow-y-auto m-auto'>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-stone-800">Upload Media</h2>
              <span onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600 text-sm font-semibold cursor-pointer transition">Close ✕</span>
            </div>
            <p className="text-sm text-stone-500 mt-1">Fill out the details to publish your track.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">Audio Title / Unwan</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Beauty of Patience"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">Select Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800 cursor-pointer"
                required
              >
                <option value="naat">Naat</option>
                <option value="byan">Byan</option>
                <option value="nazam">Nazam</option>
              </select>
            </div>

            {/* Audio File Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">Audio File (MP3 / WAV)</label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center transition bg-stone-50/50 cursor-pointer relative ${audioFile ? 'border-emerald-600 bg-emerald-50/10' : 'border-stone-300 hover:border-emerald-700'}`}>
                <input 
                  type="file" 
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!audioFile}
                />
                <div className="space-y-1">
                  {audioFile ? (
                    <>
                      <p className="text-sm text-emerald-800 font-semibold">✓ Audio Selected</p>
                      <p className="text-xs text-stone-500 truncate max-w-xs mx-auto">{audioFile.name}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-stone-700 font-medium">Click to upload audio</p>
                      <p className="text-xs text-stone-400">Audio formats up to 25MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 👈 3. NEW: Cover Image Input Drop Box */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">Cover Image (JPG / PNG)</label>
              <div className={`border-2 border-dashed rounded-xl p-4 text-center transition bg-stone-50/50 cursor-pointer relative ${coverImg ? 'border-emerald-600 bg-emerald-50/10' : 'border-stone-300 hover:border-emerald-700'}`}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setCoverImg(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!coverImg}
                />
                <div className="space-y-1">
                  {coverImg ? (
                    <>
                      <p className="text-sm text-emerald-800 font-semibold">✓ Image Selected</p>
                      <p className="text-xs text-stone-500 truncate max-w-xs mx-auto">{coverImg.name}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-stone-700 font-medium">Click to upload artwork/thumbnail</p>
                      <p className="text-xs text-stone-400">Images formats (JPEG, PNG)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white font-medium py-3 rounded-xl shadow-md transition-colors duration-200 mt-2 text-sm tracking-wide ${loading ? 'opacity-70 bg-emerald-900 cursor-not-allowed' : 'bg-emerald-800 hover:bg-emerald-900'}`}
            >
              {loading ? "Uploading Pipeline..." : "Publish Track"}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}

export default AddMusicForm;