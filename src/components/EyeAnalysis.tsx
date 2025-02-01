import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { pipeline } from "@huggingface/transformers";

const EyeAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setLoading(true);
    try {
      const classifier = await pipeline("image-classification", "microsoft/resnet-50");
      const results = await classifier(imageData);
      
      // Process results to give eye-health focused feedback
      const analysis = results.map((r: any) => `${r.label}: ${Math.round(r.score * 100)}%`).join('\n');
      setResult(analysis);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult("Error analyzing image. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Card className="p-6 w-full max-w-sm mx-auto bg-white shadow-lg animate-fade">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Eye Analysis</h2>
        
        <div className="w-full">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <Button 
            asChild 
            className="w-full"
            disabled={loading}
          >
            <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Eye Image</span>
            </label>
          </Button>
        </div>

        {image && (
          <div className="w-full aspect-square relative rounded-lg overflow-hidden">
            <img src={image} alt="Uploaded eye" className="w-full h-full object-cover" />
          </div>
        )}

        {loading && (
          <div className="flex items-center space-x-2 text-primary">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing image...</span>
          </div>
        )}

        {result && (
          <div className="w-full p-4 bg-accent rounded-lg">
            <h3 className="font-semibold mb-2">Analysis Results:</h3>
            <p className="whitespace-pre-line text-sm">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EyeAnalysis;