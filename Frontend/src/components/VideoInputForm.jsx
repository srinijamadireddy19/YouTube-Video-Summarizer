import React, { useState, useRef } from 'react';

const VideoInputForm = ({ onSubmit }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isRunaway, setIsRunaway] = useState(false);
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    // If the input is empty, make the button run away
    if (!videoUrl.trim()) {
      setIsRunaway(true);
      const randomX = Math.random() * 200 - 100; // Random between -100 and 100
      const randomY = Math.random() * 100 - 50; // Random between -50 and 50
      setButtonPosition({ x: randomX, y: randomY });
    }
  };

  const handleMouseLeave = () => {
    // Reset button position when mouse leaves
    setTimeout(() => {
      setIsRunaway(false);
      setButtonPosition({ x: 0, y: 0 });
    }, 300);
  };

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
    // Reset button position when user starts typing
    if (isRunaway) {
      setIsRunaway(false);
      setButtonPosition({ x: 0, y: 0 });
    }
  };

  const handleSubmit = () => {
    if (videoUrl.trim()) {
      onSubmit(videoUrl);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && videoUrl.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-background-dark/60 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-steel-blue/30 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2">Summarize Your Video</h2>
      <p className="text-papaya-whip/70 mb-8">
        Enter the link below to extract the core message of any YouTube video instantly.
      </p>
      
      <div className="space-y-6">
        <div className="relative group">
          <label className="block text-papaya-whip text-sm font-semibold mb-2 ml-1">
            YouTube Video URL
          </label>
          <div className="flex items-center bg-background-dark border-2 border-steel-blue/40 rounded-xl overflow-hidden focus-within:border-primary transition-all shadow-inner">
            <span className="material-symbols-outlined pl-4 text-steel-blue">link</span>
            <input
              className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder:text-steel-blue/50 text-lg outline-none"
              id="video-url"
              placeholder="https://www.youtube.com/watch?v=..."
              type="text"
              value={videoUrl}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {/* Runaway Button Container */}
        <div className="relative h-16 flex justify-end items-center mt-4">
          <button
            ref={buttonRef}
            className="bg-primary hover:bg-molten-lava text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl shadow-primary/30 transition-all flex items-center gap-2 group active:scale-95"
            id="submit-btn"
            onClick={handleSubmit}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
              transition: isRunaway ? 'transform 0.3s ease-out' : 'transform 0.2s ease-in',
            }}
          >
            <span>Summarize</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              bolt
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoInputForm;