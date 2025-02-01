import { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import EyeAnalysis from "@/components/EyeAnalysis";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import EyeAnimation from "@/components/EyeAnimation";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [currentEyeIndex, setCurrentEyeIndex] = useState(0);

  const eyeImages = [
    '/eyes/brown-eye.jpg',   // Brown eye
    '/eyes/red-eye.jpg',     // Red eye
    '/eyes/blue-eye.jpg',    // Blue eye
    '/eyes/grey-eye.jpg',    // Grey eye
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEyeIndex((prev) => (prev + 1) % eyeImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showAnimation && (
        <EyeAnimation onComplete={() => setShowAnimation(false)} />
      )}
      <div 
        className={`min-h-screen relative py-12 px-4 ${
          showAnimation ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
        }`}
      >
        {/* Real eye background */}
        <div className="fixed inset-0 -z-10">
          {eyeImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center bg-no-repeat ${
                index === currentEyeIndex ? 'opacity-20' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${img})`,
              }}
            />
          ))}
          <div className="absolute inset-0 backdrop-blur-[8px]" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Eye Care Assistant</h1>
              <p className="text-lg text-gray-600">Monitor your screen time and eye health</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login / Sign Up
            </Button>
          </div>

          <Card className="mb-12 bg-white/80 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Understanding Digital Eye Strain</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Digital eye strain affects 50% of computer users, causing discomfort and reduced productivity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Symptoms include dry eyes, blurred vision, headaches, and neck pain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Extended screen time can lead to disrupted sleep patterns and long-term vision issues</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prevention Tips</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Maintain proper screen distance and positioning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">•</span>
                      <span>Use proper lighting and adjust screen brightness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

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