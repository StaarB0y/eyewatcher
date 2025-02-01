import Timer from "@/components/Timer";
import EyeAnalysis from "@/components/EyeAnalysis";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Eye Care Assistant</h1>
          <p className="text-lg text-gray-600">Monitor your screen time and eye health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Timer />
          <EyeAnalysis />
        </div>
      </div>
    </div>
  );
};

export default Index;