import React from "react";
import { CiHeart } from "react-icons/ci";

function Home() {
  return (
    <section className="w-full h-full mb-20 font-[Jakarta] text-white">
      <div className="w-full px-10 flex items-center justify-between gap-5">
        <div className="w-[60%] h-80 flex flex-col items-start gap-2 justify-center rounded-lg bg-[url(./images/surahRehman.jpg)] relative bg-cover bg-center">
          <div className="w-full h-full bg-black/50 flex flex-col items-start gap-2 justify-center   p-5">
            <span className="px-4 py-1 bg-yellow-600 rounded-full text-xs  text-yellow-200">
              Daily Reflection
            </span>
            <h1 className="text-xl font-bold font-[Inter] ">Surah Ar-Rahman</h1>
            <p className="text-sm text-gray-400">
              Find peace in the recitation of the Most Merciful. A beautiful
              recitation to calm the heart and soul.
            </p>
            <button className="px-6 py-2 rounded-full  bg-emerald-400 cursor-pointer hover:bg-emerald-300 text-black font-semibold ">
              Listen now
            </button>
          </div>
        </div>
        <div className="w-[35%] h-full flex flex-col items-center justify-center p-5 gap-5 bg-black">
          <div className="w-full flex font-semibold items-center justify-between ">
            <p>Continue Listening</p> <p>...</p>
          </div>
          <div className="w-[50%] h-25 rounded-lg  bg-gray-600 "></div>
          <div className="text-center">
            <h1>Beaytiull Darood</h1>
            <p>Various Artist</p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 py-5">
        <h1 className="text-xl font-[Inter] font-bold">Trending Naats</h1>
        <div className="w-full text-gray-300 flex items-center justify-between">
          <p>Most beloved spiritual poetry this week.</p>
          <button className="cursor-pointer">see all </button>
        </div>
        <div className="w-full flex items-center gap-5 mt-5 ">
          <div className="w-[20%] group h-60 ">
            <div className="w-full h-[70%] relative group border-gray-300 cursor-pointer rounded-lg overflow-hidden  ">
              <img
                className="w-full h-full object-cover object-center"
                src="https://i.pinimg.com/736x/11/05/5f/11055f59a68bcbcf257dac2088dfc225.jpg"
                alt=""
              />
              <div className="w-full h-full bg-linear-to-t from-black from-40% translate-y-100 transition-transform duration-200 group-hover:translate-y-0 to-transparent flex items-center justify-center  absolute top-0 left-0">
                <div className="w-15 h-15 bg-yellow-300 rounded-full"></div>
              </div>
            </div>
            <h1 className="group-hover:text-emerald-300 transition-colors duration-300 text-lg">
              Tajdare Haram
            </h1>
            <p>Atif Aslam</p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 py-5">
        <h1 className="text-3xl font-[Inter] font-semibold">
          Inspiring Bayans
        </h1>
        <p className="text-gray-300">Deepen your understanding and faith</p>
        <div className="w-full flex mt-5 items-center justify-between">
          <div className="w-[49%] group h-20 cursor-pointer flex items-center justify-between">
            <div className="w-[20%] relative h-full ">
              <div className="w-full h-full absolute top-0 transition-all duration-300 bg-black/50 group-hover:bg-transparent  bottom-0"></div>
              <img
                className="w-full h-full object-cover object-center"
                src="https://i.pinimg.com/736x/11/05/5f/11055f59a68bcbcf257dac2088dfc225.jpg"
                alt=""
              />{" "}
            </div>
            <div>
              <h4 className="text-lg font-[Inter] group-hover:text-emerald-300 ">
                the power Sabar
              </h4>
              <p className="text-gray-300">Mufti Menk</p>
            </div>
            <p className="flex items-center gap-4">
              48:80{" "}
              <span className="cursor-pointer hover:text-yellow-600">
                <CiHeart />
              </span>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 py-5">
        <h1 className="text-3xl font-[Inter] font-semibold">
          Featured Reciters & Scholars
        </h1>
        <div className="w-full flex items-center">
          <div className="w-20 h-30 group cursor-pointer flex flex-col items-center gap-3 justify-center  mt-5">
            <img
              className="w-full h-20 group-hover:border-3  transition-all  border-yellow-500  rounded-full"
              src="https://i.pinimg.com/736x/11/05/5f/11055f59a68bcbcf257dac2088dfc225.jpg"
              alt=""
            />
            <p className="text-xs text-gray-300 group-hover:text-white ">Mishri Alfasi</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
