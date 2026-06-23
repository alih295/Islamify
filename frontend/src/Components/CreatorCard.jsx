import React from 'react';
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";

function CreatorCard() {
  return (
    // 1. Fixed width to w-full for Grid compliance, added transition & scale effect on hover
    <div className="w-full relative h-80 rounded-xl overflow-hidden shadow-md shadow-emerald-950/10 hover:shadow-xl transition-all duration-300 group border border-stone-800/20 bg-stone-900">
      
      {/* Thumbnail Image */}
      <img
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8I34PY9l1teob2wZeVrIN-yHJ1yWPynriZcFDkflpA&s=10"
        alt="Audio track thumbnail"
      />

      {/* Title & Action Strip Container */}
      <div className="w-full h-14 bg-emerald-400 px-3 text-stone-900 bottom-0 left-0 flex items-center justify-between absolute shadow-[0_-4px_10px_rgba(0,0,0,0.15)]">
        
        {/* 2. Added truncate to handle long titles safely without UI breaking */}
        <h5 className="text-sm font-bold truncate pr-3 max-w-[70%]" title="Lorem ipsum dolor sit amet.">
          Lorem ipsum dolor sit amet.
        </h5> 

        {/* 3. Replaced text-black/20 with text-stone-700/80 for clearer base visibility */}
        <div className="flex items-center gap-3 text-stone-700/80 text-lg flex-shrink-0">
          <FiEdit 
            className="cursor-pointer hover:text-stone-950 hover:scale-110 transition duration-200" 
            title="Edit Track"
          />
          <AiTwotoneDelete 
            className="cursor-pointer hover:text-red-700 hover:scale-110 transition duration-200" 
            title="Delete Track"
          />
        </div>

      </div>
    </div>
  );
}

export default CreatorCard;