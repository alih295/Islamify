import React, { useContext, useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { MusicContenxt } from "../Context/AppContext";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import useAuthApi from "../Hooks/useAuthApi";

function Home() {
  const {
    audio,
    loading,
    setNowPlaying,
    duration,
    nowPlaying,
    playTrack,
    isPlaying,
  } = useContext(MusicContenxt);
  const [creator, setCreator] = useState([]);
  const { getCreator } = useAuthApi();

  const getCreators = async (creatorId) => {
    try {
      const data = await getCreator();
      if (data && data.success) {
        setCreator(data.users);
      }
    } catch (err) {
      console.error("Error fetching creator's music:", err.message);
    }
  };

  useEffect(() => {
    getCreators();
  }, []);

  const naat = audio.filter((elem) => {
    return elem.category === "naat";
  });
  const bayan = audio.filter((elem) => {
    return elem.category === "byan";
  });
  console.log(creator.users)

  return (
    <section className="w-full  mb-40 font-[Jakarta]  text-white">
      <div className="w-full px-10 flex items-center justify-between gap-5">
        <div className="w-[60%] h-80 flex flex-col items-start gap-2 justify-center rounded-xl border border-gray-300 overflow-hidden bg-[url(./images/surahRehman.jpg)] relative bg-cover bg-center">
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
        <div className="w-[35%] h-80 rounded-xl flex flex-col items-center justify-evenly p-5 gap-5 bg-bg-surface">
          <div className="w-full flex font-semibold items-center justify-between ">
            <p>Continue Listening</p> <p>...</p>
          </div>
          <div className="w-[40%] h-25 rounded-lg flex items-center justify-center  bg-emerald-200/40 ">
            <span
              onClick={() => {
                playTrack(nowPlaying);
              }}
              className="w-10 h-10 flex items-center justify-center cursor-pointer bg-emerald-500 rounded-full"
            >
              {" "}
              {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}{" "}
            </span>
          </div>
          <div className="text-center">
            <h1>{nowPlaying ? nowPlaying.title : "none"}</h1>
            <p>{nowPlaying ? nowPlaying.artistName : "none"}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-10 py-5">
        <h1 className="text-xl font-[Inter] font-bold">Trending Naats</h1>
        <div className="w-full text-gray-300 flex items-center justify-between">
          <p>Most beloved spiritual poetry this week.</p>
          <button className="cursor-pointer">see all </button>
        </div>
        <div className="w-full flex items-center overflow-x-auto scrollbar-hide  gap-5 mt-5 ">
          {naat.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => playTrack(item)}
                className="w-[20%] shrink-0  group h-60 flex flex-col gap-2"
              >
                <div className="w-full h-48 relative border border-gray-300 cursor-pointer rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={`http://localhost:4000/uploads/${item.coverImg}`}
                    alt={item.title}
                  />

                  <div className="w-full h-full bg-linear-to-t from-black from-40% to-transparent absolute top-0 left-0 flex items-center justify-center transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                    <div className="w-15 h-15 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg"></div>
                  </div>
                </div>

                <div className="mt-1">
                  <h1 className="group-hover:text-emerald-300 transition-colors duration-300 text-base font-medium line-clamp-2 leading-snug">
                    {item.title}
                  </h1>
                  <p className="text-sm text-gray-400 truncate mt-0.5">
                    {item.artistName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full px-10 py-5">
        <h1 className="text-3xl font-[Inter] font-semibold">
          Inspiring Bayans
        </h1>
        <p className="text-gray-300">Deepen your understanding and faith</p>
        <div className="w-full flex mt-5 items-center justify-between">
          {bayan.map((item, idx) => {
            return (
              <div key={item._id}
                onClick={() => playTrack(item)}
                className="w-[49%] group h-20 cursor-pointer flex items-center justify-between"
              >
                <div className="w-[20%] relative h-full ">
                  <div className="w-full h-full absolute top-0 transition-all duration-300 bg-black/50 group-hover:bg-transparent  bottom-0"></div>
                  <img
                    className="w-full h-full object-cover object-center"
                    src={`http://localhost:4000/uploads/${item.coverImg}`}
                    alt=""
                  />{" "}
                </div>
                <div>
                  <h4 className="text-lg font-[Inter] group-hover:text-emerald-300 ">
                    {item.title}
                  </h4>
                  <p className="text-gray-300">{item.artistName}</p>
                </div>
                <p className="flex items-center gap-4">
                  {item.duration}
                  <span className="cursor-pointer hover:text-yellow-600">
                    <CiHeart />
                  </span>{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full px-10 py-5">
        <h1 className="text-3xl font-[Inter] font-semibold">
          Featured Reciters & Scholars
        </h1>
        <div className="w-full flex gap-5 items-center">
          {
            creator.map((item)=>{
              return (
                <div className="w-20 h-30 group cursor-pointer flex flex-col items-center gap-3 justify-center  mt-5">
            <img
              className="w-full h-20 group-hover:border-3  transition-all  border-yellow-500  rounded-full"
              src="https://i.pinimg.com/736x/11/05/5f/11055f59a68bcbcf257dac2088dfc225.jpg"
              alt=""
            />
            <p className="text-xs text-gray-300 group-hover:text-white ">
            {item.name}
            </p>
          </div>
              )
            })
          }
        </div>
      </div>
    </section>
  );
}

export default Home;
