import React from 'react';
import Header from './components/Header';
import FloatingBackground from './components/FloatingBackground';
import HeroSection from './components/HeroSection';
import FunctionalSection from './components/FunctionalSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-papaya-whip overflow-x-hidden">
      <FloatingBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <FunctionalSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;