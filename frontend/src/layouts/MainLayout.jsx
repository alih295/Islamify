import React from "react";
import { Outlet } from "react-router-dom";

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { RxLoop } from "react-icons/rx";
import { IoMdShare } from "react-icons/io";
import { AiTwotoneSound } from "react-icons/ai";

function MainLayout() {
  return (
    <main className="w-full h-screen overflow-hidden font-[Jakarta] bg-bg-main text-text-muted flex">

      {/* SIDEBAR (fixed) */}
      <aside className="w-[20%] h-full border-r border-accent-gold p-5">
        <div className="flex items-center mt-10 justify-between">
          <div className="w-10 h-10 bg-yellow-50"></div>
          <div>
            <h1 className="text-4xl font-bold text-emerald-200 font-[Inter]">Islamify</h1>
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
        <header className="h-12 flex items-center justify-end gap-5 px-6 text-xl  border-b border-gray-800">
          <IoMdNotificationsOutline className="cursor-pointer transition-colors duration-200 hover:text-emerald-100" />
          <IoPersonCircleOutline className="transition-colors duration-200 hover:text-emerald-100" />
        </header>

        {/* PAGE CONTENT (THIS CHANGES) */}
        <div className="flex-1 overflow-auto p-5 scrollbar-hide">
          <Outlet />
        </div>

        {/* FOOTER (music player fixed) */}
 <footer className="w-full h-20 absolute bottom-0 left-0 bg-bg-surface flex items-center justify-between p-2 px-10 text-text-muted">

  {/* LEFT SIDE */}
  <div className="text-center flex items-center gap-5">
    <div className="h-10 w-10 bg-brand-green"></div>

    <div>
      <h1 className="text-lg font-bold text-brand-green">
        Now Playing
      </h1>
      <p className="text-sm text-text-muted">
        Artist - Song Title
      </p>
    </div>
  </div>

  {/* CENTER CONTROLS */}
  <div className="w-[40%] h-full">

    {/* PROGRESS BAR */}
    <div className="w-full h-5 flex items-center justify-center gap-2">

      <p className="text-xs">12:30</p>

      <input
        type="range"
        className="w-full custom-range"
      />

      <p className="text-xs">3:45</p>

    </div>

    {/* CONTROLS */}
    <div className="w-full h-5 flex items-center justify-center gap-5 mt-2">

      <button className="w-5 cursor-pointer h-5 text-2xl rounded-full">
        <IoClose />
      </button>

      <button className="w-5 cursor-pointer h-5 text-2xl rounded-full">
        <MdSkipPrevious />
      </button>

      <button className="w-5 cursor-pointer h-5 text-2xl rounded-full">
        <BsFillPlayFill />
      </button>

      <button className="w-5 cursor-pointer h-5 text-2xl rounded-full">
        <MdSkipNext />
      </button>

      <button className="w-5 cursor-pointer h-5 text-2xl rounded-full">
        <RxLoop />
      </button>

    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="w-[20%] h-full flex items-center gap-5 text-2xl justify-end">

    <CiHeart size="34" />
    <IoMdShare size="34" />
    <AiTwotoneSound size="34" />

    <input
      type="range"
      className="custom-range w-full"
    />

  </div>

</footer>

      </div>
      
    </main>
  );
}

export default MainLayout;