'use client';
import React from 'react'
import Image from 'next/image';

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" onClick={() => {console.log('Click')}} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
    <a href="#events" className="flex items-center gap-2"> Explore Events 
      <Image src="/icons/arrow-down.svg" alt="arrow-down" width={16} height={16} />
    </a>
    </button>
  );
}

export default ExploreBtn