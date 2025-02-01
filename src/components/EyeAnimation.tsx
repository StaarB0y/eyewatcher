import { useState, useEffect } from "react";

const EyeAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => setIsOpen(true), 500);
    // Trigger completion callback after animation
    setTimeout(onComplete, 2000);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div 
        className={`w-48 h-48 relative transition-all duration-1000 ${
          isOpen ? "scale-100" : "scale-0"
        }`}
      >
        {/* Main Sharingan eye shape */}
        <div className="absolute inset-0 bg-red-600 rounded-full shadow-lg overflow-hidden animate-pulse">
          {/* Outer ring */}
          <div className="absolute inset-2 border-4 border-black rounded-full" />
          
          {/* Inner circle */}
          <div className="absolute inset-8 bg-black rounded-full">
            {/* Center pupil */}
            <div className="absolute inset-3 bg-red-600 rounded-full" />
          </div>

          {/* Tomoe patterns */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            {[0, 120, 240].map((rotation) => (
              <div
                key={rotation}
                className="absolute w-6 h-12 bg-black"
                style={{
                  top: '25%',
                  left: '45%',
                  transformOrigin: '50% 100%',
                  transform: `rotate(${rotation}deg)`,
                  borderRadius: '100% 0 50% 50%',
                }}
              />
            ))}
          </div>
        </div>

        {/* Eyelid animation */}
        <div 
          className={`absolute inset-0 bg-black transition-transform duration-1000 ease-in-out ${
            isOpen ? "translate-y-full" : "translate-y-0"
          }`}
        />
      </div>
    </div>
  );
};

export default EyeAnimation;