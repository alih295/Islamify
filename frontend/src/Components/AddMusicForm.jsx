import React from 'react';

function AddMusicForm({setShowForm}) {
  return (
    <section className='w-full h-screen absolute z-10 font-[Jakarta] flex items-center justify-center bg-bg-main/70 backdrop-blur-xl p-10'>
      
      {/* Main Container Wrapper */}
      <div className="w-[85%] h-[85vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden border border-stone-100">
        
        {/* Left Side: Islamic Tag & Wisdom (40%) */}
        <div className='w-[40%] h-full bg-emerald-900 text-stone-100 p-10 flex flex-col justify-between relative overflow-hidden'>
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Top: Tagline */}
          <div className="relative z-10">
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
              Publish Content
            </span>
            <h1 className="text-3xl font-serif font-semibold mt-4 text-amber-100 leading-snug">
              "Speak good or remain silent."
            </h1>
            <p className="text-stone-300 text-xs mt-1">— Sahih al-Bukhari</p>
          </div>

          {/* Middle/Bottom: Wisdom / Hikayat */}
          <div className="relative z-10 border-l-2 border-amber-400/40 pl-5 my-auto">
            <h3 className="text-amber-200 text-sm font-semibold mb-2 uppercase tracking-wider">The Power of Voice</h3>
            <p className="text-stone-200 text-sm leading-relaxed italic">
              "A scholar once mentioned that an audio recording carrying truth, peace, or praise is like a recurring charity (Sadaqah Jariyah). Long after the speaker is gone, the words continue to echo in hearts, bringing tranquility to those who listen."
            </p>
          </div>

          {/* Bottom: Footer */}
          <div className="relative z-10 text-xs text-stone-400 tracking-wide">
            Share your voice with the community.
          </div>
        </div>

        {/* Right Side: Upload Form (45% aligned beautifully with layout spacing) */}
        <form className='w-[45%] h-full bg-white p-10 flex flex-col justify-center border-l border-stone-50 m-auto'>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-stone-800">Upload Media</h2>
              {/* Optional Close Button since this is an absolute modal */}
              <span onClick={()=> setShowForm(false)}  className="text-stone-400 hover:text-stone-600 text-sm font-semibold cursor-pointer transition">Close ✕</span>
            </div>
            <p className="text-sm text-stone-500 mt-1">Fill out the details to publish your track.</p>
          </div>

          <div className="space-y-5">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">Audio Title / Unwan</label>
              <input 
                type="text" 
                placeholder="e.g., The Beauty of Patience"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800"
                required
              />
            </div>

            {/* Category Dropdown (Matches backend enum values) */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">Select Category</label>
              <select 
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800 cursor-pointer"
                required
              >
                <option value="naat">Naat</option>
                <option value="byan">Byan</option>
                <option value="nazam">Nazam</option>
              </select>
            </div>

            {/* Audio File Input Drag-and-Drop Box */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">Audio File (MP3 / WAV)</label>
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-5 text-center hover:border-emerald-700 transition bg-stone-50/50 cursor-pointer relative">
                <input 
                  type="file" 
                  accept="audio/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="space-y-1">
                  <p className="text-sm text-stone-700 font-medium">Click to upload or drag & drop</p>
                  <p className="text-xs text-stone-400">Audio formats up to 25MB</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-3 rounded-xl shadow-md transition-colors duration-200 mt-2 text-sm tracking-wide"
            >
              Publish Track
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}

export default AddMusicForm;