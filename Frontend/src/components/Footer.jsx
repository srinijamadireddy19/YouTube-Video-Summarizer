import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-steel-blue/20 bg-background-dark mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 grayscale opacity-60">
          <span className="material-symbols-outlined text-papaya-whip">
            auto_awesome
          </span>
          <span className="text-papaya-whip font-bold">VidBrief </span>
        </div>
        
        
        <p className="text-sm text-papaya-whip/30">
          © 2026 VidBrief. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;