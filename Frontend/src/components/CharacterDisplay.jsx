import React from 'react';
import girl from "../assets/girl.png";

const CharacterDisplay = () => {
  return (
    <div className="lg:w-1/2 flex justify-center items-center sticky top-1/4">
      <div className="relative w-full max-w-md aspect-square rounded-full flex items-center justify-center">
        <img
          alt="Cartoon character watching videos"
          className="w-2/3 h-auto object-contain relative z-10 drop-shadow-2xl"
          src={girl}
        />
      </div>
    </div>
  );
};

export default CharacterDisplay;
