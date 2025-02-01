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
    <div className="fixed inset-0 bg-blue-50 flex items-center justify-center z-50">
      <div 
        className={`w-48 h-24 relative transition-all duration-1000 ${
          isOpen ? "scale-100" : "scale-0"
        }`}
      >
        {/* Eye shape */}
        <div className="absolute inset-0 bg-white rounded-full shadow-lg overflow-hidden">
          {/* Eyelid animation */}
          <div 
            className={`absolute inset-0 bg-blue-900 transition-transform duration-1000 ease-in-out ${
              isOpen ? "translate-y-full" : "translate-y-0"
            }`}
          />
          {/* Iris */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500 rounded-full">
            {/* Pupil */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-900 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeAnimation;