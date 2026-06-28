import React, { useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { RxLoop } from "react-icons/rx";
import { IoMdShare } from "react-icons/io";
import { AiTwotoneSound } from "react-icons/ai";
import { MusicContenxt } from "../Context/AppContext";

function MainLayout() {
  // Context se saara dynamic data aur slider functions nikal liye
  const {
    nowPlaying,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    handleSliderChange,
    audioRef,
  } = useContext(MusicContenxt);
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);

    // 1. React state ko update karein taake slider move ho
    setVolume(newVolume);

    // 2. Actual audio element ka volume change karein (Most Important)
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Seconds ko MM:SS format mein convert karne ke liye helper function
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Agar background mein koi naat select nahi hui, toh footer show nahi hoga aur layout clean rahegi
  if (!nowPlaying) {
    return (
      <main className="w-full h-screen overflow-hidden font-[Jakarta] bg-bg-main text-text-muted flex">
        {/* SIDEBAR */}
        <aside className="w-[20%] h-full border-r border-accent-gold p-5">
          <div className="flex items-center mt-10 justify-between">
            <div className="w-10 h-10 bg-yellow-50"></div>
            <div>
              <h1 className="text-4xl font-bold text-emerald-200 font-[Inter]">
                Islamify
              </h1>
              <p className="text-xs">Spiritual Serenity</p>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <div className="p-2 flex items-center gap-2 font-semibold bg-bg-surface text-emerald-200">
              <AiFillHome /> Home
            </div>
            <div className="p-2 flex items-center gap-2">
              <FaSearch /> Search
            </div>
            <div className="p-2 flex items-center gap-2">
              <MdLibraryMusic /> Library
            </div>
            <div className="p-2 flex items-center gap-2">
              <CiHeart /> Liked
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE */}
        <div className="flex flex-col w-[80%] h-full">
          <header className="h-12 flex items-center justify-end gap-5 px-6 text-xl border-b border-gray-800">
            <IoMdNotificationsOutline className="cursor-pointer transition-colors duration-200 hover:text-emerald-100" />
            <Link to={"/register"}>
              <IoPersonCircleOutline className="transition-colors cursor-pointer  duration-200 hover:text-emerald-100" />
            </Link>
          </header>

          <div className="flex-1 overflow-auto p-5 scrollbar-hide">
            <Outlet />
          </div>
        </div>
      </main>
    );
  }

  // Jab `nowPlaying` mein data hoga, toh yeh complete UI render hogi (with Footer Player)
  return (
    <main className="w-full h-screen overflow-hidden font-[Jakarta] bg-bg-main text-text-muted flex">
      {/* SIDEBAR (fixed) */}
      <aside className="w-[20%] h-full border-r border-accent-gold p-5">
        <div className="flex items-center mt-10 justify-between">
          <div className="w-10 h-10 bg-yellow-50"></div>
          <div>
            <h1 className="text-4xl font-bold text-emerald-200 font-[Inter]">
              Islamify
            </h1>
            <p className="text-xs">Spiritual Serenity</p>
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <div className="p-2 flex items-center gap-2 font-semibold bg-bg-surface text-emerald-200">
            <AiFillHome /> Home
          </div>
          <div className="p-2 flex items-center gap-2">
            <FaSearch /> Search
          </div>
          <div className="p-2 flex items-center gap-2">
            <MdLibraryMusic /> Library
          </div>
          <div className="p-2 flex items-center gap-2">
            <CiHeart /> Liked
          </div>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col w-[80%] h-full">
        {/* HEADER (fixed top area) */}
        <header className="h-12 flex items-center justify-end gap-5 px-6 text-xl border-b border-gray-800">
          <IoMdNotificationsOutline className="cursor-pointer transition-colors duration-200 hover:text-emerald-100" />
          <IoPersonCircleOutline className="transition-colors duration-200 hover:text-emerald-100" />
        </header>

        {/* PAGE CONTENT (THIS CHANGES) */}
        <div className="flex-1 overflow-auto p-5 pb-32 scrollbar-hide">
          <Outlet />
        </div>

        {/* FOOTER (music player fixed) */}
        <footer className="w-full h-25 absolute bottom-0 left-0 bg-bg-surface flex items-center justify-between p-2 px-10 text-text-muted">
          {/* LEFT SIDE */}
          <div className="text-center flex items-center gap-5">
            {/* Khali div ki jagah active naat ki dynamic image cover lagayi */}
            <img
              src={`http://localhost:4000/uploads/${nowPlaying.coverImg}`}
              alt={nowPlaying.title}
              className="h-12 w-12 object-cover rounded bg-brand-green"
            />

            <div className="text-left">
              <h1 className="text-lg font-bold text-emerald-200 truncate max-w-[220px]">
                {nowPlaying.title}
              </h1>
              <p className="text-sm text-text-muted truncate max-w-[200px]">
                {nowPlaying.artistName}
              </p>
            </div>
          </div>

          {/* CENTER CONTROLS */}
          <div className="w-[40%] flex flex-col items-center justify-evenly h-full">
            {/* PROGRESS BAR */}
            <div className="w-full h-5 flex items-center justify-center gap-2">
              {/* Current Time (Dynamic ho gaya) */}
              <p className="text-xs min-w-[35px] text-right">
                {formatTime(currentTime)}
              </p>

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSliderChange}
                className="w-full custom-range cursor-pointer appearance-none h-1.5 rounded-lg bg-gray-700 accent-emerald-500"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${duration ? (currentTime / duration) * 100 : 0}%, #374151 ${duration ? (currentTime / duration) * 100 : 0}%, #374151 100%)`,
                }}
              />

              {/* Total Time (Dynamic ho gaya) */}
              <p className="text-xs min-w-[35px]">{formatTime(duration)}</p>
            </div>

            {/* CONTROLS */}
            <div className="w-full h-5 flex items-center justify-center gap-5 mt-2">
              <button className="w-5 cursor-pointer h-5 text-2xl rounded-full hover:text-emerald-300 transition-colors">
                <IoClose />
              </button>

              <button className="w-5 cursor-pointer h-5 text-2xl rounded-full hover:text-emerald-300 transition-colors">
                <MdSkipPrevious />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 cursor-pointer bg-emerald-500 text-white flex items-center justify-center rounded-full text-2xl hover:bg-emerald-600 transition-all transform active:scale-95"
              >
                {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
              </button>

              <button className="w-5 cursor-pointer h-5 text-2xl rounded-full hover:text-emerald-300 transition-colors">
                <MdSkipNext />
              </button>

              <button className="w-5 cursor-pointer h-5 text-2xl rounded-full hover:text-emerald-300 transition-colors">
                <RxLoop />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-[20%] h-full flex items-center gap-5 text-2xl justify-end">
            <CiHeart
              size="34"
              className="cursor-pointer hover:text-red-400 transition-colors"
            />
            <IoMdShare
              size="34"
              className="cursor-pointer hover:text-emerald-300 transition-colors"
            />
            <AiTwotoneSound size="34" />

           <input
  type="range"
  min="0"
  max="1"
  step="0.01" // Smooth moving ke liye 0.01 behtar hai
  value={volume}
  onChange={handleVolumeChange}
  className="custom-range h-2 w-full cursor-pointer appearance-none rounded-lg"
  style={{
    background: `linear-gradient(to right, #22c55e ${volume * 100}%, #f3f4f6 ${volume * 100}%)`
  }}
/>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default MainLayout;
