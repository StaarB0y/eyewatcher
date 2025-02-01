import { useState } from "react";
import Timer from "@/components/Timer";
import EyeAnalysis from "@/components/EyeAnalysis";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import EyeAnimation from "@/components/EyeAnimation";

const Index = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <>
      {showAnimation && (
        <EyeAnimation onComplete={() => setShowAnimation(false)} />
      )}
      <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 ${
        showAnimation ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Eye Care Assistant</h1>
              <p className="text-lg text-gray-600">Monitor your screen time and eye health</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login / Sign Up
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Timer />
            <EyeAnalysis />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;