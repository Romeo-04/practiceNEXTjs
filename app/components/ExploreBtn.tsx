'use client';

import Image from "next/image";

const ExploreBtn = () => {
    const handleClick = () => {
        const eventsSection = document.getElementById('events');
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button 
            type="button" 
            id="explore-btn" 
            className="mt-7 mx-auto flex items-center gap-2" 
            onClick={handleClick}
        >
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="" width={24} height={24} aria-hidden="true" />
        </button>
    );
};

export default ExploreBtn;