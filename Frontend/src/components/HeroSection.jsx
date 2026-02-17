import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Fade out hero content as user scrolls
      if (scrollPosition > windowHeight * 0.3) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div
        className={`text-center max-w-3xl character-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
        id="hero-content"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Instant Video <span className="text-primary">Insights</span>
        </h1>
        <p className="text-lg md:text-xl text-papaya-whip/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Paste any YouTube URL and get a concise summary in seconds. Experience a smarter way to consume video content.
        </p>
        <div className="animate-bounce mt-12">
          <span className="material-symbols-outlined text-steel-blue text-4xl">
            keyboard_double_arrow_down
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;