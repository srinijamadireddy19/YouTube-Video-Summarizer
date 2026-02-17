import React from 'react';

const FloatingBackground = () => {
  const bubbles = [
    { icon: 'play_circle', left: '10%', duration: '15s' },
    { icon: 'movie', left: '25%', duration: '18s' },
    { icon: 'smart_display', left: '45%', duration: '22s' },
    { icon: 'video_library', left: '65%', duration: '14s' },
    { icon: 'play_circle', left: '85%', duration: '20s' },
    { icon: 'movie', left: '15%', duration: '25s' },
    { icon: 'smart_display', left: '75%', duration: '17s' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble, index) => (
        <span
          key={index}
          className="material-symbols-outlined bubble"
          style={{
            '--left': bubble.left,
            '--duration': bubble.duration,
          }}
        >
          {bubble.icon}
        </span>
      ))}
    </div>
  );
};

export default FloatingBackground;