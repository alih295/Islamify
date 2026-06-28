import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import AddMusicForm from "../Components/AddMusicForm";
import CreatorCard from "../Components/CreatorCard";
import useAuthApi from "../Hooks/useAuthApi";
import { useContext } from "react";
import { MusicContenxt } from "../Context/AppContext";

function CreatorLayout() {
  const [showForm, setShowForm] = useState(false);
  const{error , logout} = useAuthApi()



    const handleLogout = async()=>{
    try{
      await logout()
      console.log('user is logout')
    }
    catch(err){
      console.log(err.message)
    }


    }

      const {naats} = useContext(MusicContenxt)



  return (
    <main className="w-full min-h-screen bg-bg-main font-[Jakarta]">
      {/* 1. Cleaner Conditional Rendering */}
      {showForm && <AddMusicForm setShowForm={setShowForm} />}

      <header className="w-full sticky top-0 h-20 text-white px-10 flex items-center justify-between bg-bg-surface shadow-md">
        <h1 className="text-sm font-[Inter] text-stone-400 leading-snug">
          Welcome 👋 <br />
          {/* Cleared empty string whitespace nodes */}
          <span className="text-2xl font-bold text-emerald-400 tracking-wide">
            Ali Haider
          </span>
        </h1>
        
        {/* 2. Functional state update syntax */}
        <div className="flex items-center gap-10">
          <button 
          onClick={() => setShowForm(true)} 
          className="w-10 h-10 rounded-full flex items-center justify-center text-stone-900 text-2xl cursor-pointer hover:bg-emerald-500 bg-emerald-400 shadow-md hover:scale-105 transition duration-200 outline-none border-none"
          aria-label="Add content"
        >
          <TiPlus />
        </button>
        <button  onClick={handleLogout}   className="px-4 py-2 bg-red-600 rounded-lg text-white cursor-pointer "> Logout</button>
        </div>



      </header>

      <div className="w-full text-center text-white p-10">
        <h1 className="text-3xl font-bold font-[Inter]">
          Your Published Contents
        </h1>
        
        {/* 4. Context Alignment */}
        <p className="text-amber-300 bg-amber-950/20 max-w-2xl mx-auto rounded-lg mt-5 block p-3 text-sm border border-amber-900/40">
          <strong>Notice:</strong> Please make sure to only upload valid spiritual Islamic audio files (Bayan, Naat, or Nazam). Distributing unrelated or copyrighted material will result in account restriction.
        </p>

        {/* 3. Replaced flex-between with grid layout for smooth spacing rows */}
        <div className="w-full py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {
            naats.map((item,idx)=>{
             return <CreatorCard key={idx} item={item}  />
            })
          }
         
        </div>
      </div>
    </main>
  );
}

export default CreatorLayout;