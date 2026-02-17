import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-steel-blue/20 bg-background-dark/80">
      <div className="flex items-center gap-2">
        <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white text-2xl">
            auto_awesome
          </span>
        </div>
        <h2 className="text-papaya-whip text-xl font-bold tracking-tight">
          VidBrief
        </h2>
      </div>
    </header>
  );
};

export default Header;