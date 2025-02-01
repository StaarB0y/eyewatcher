import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PauseCircle, PlayCircle } from "lucide-react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast({
        title: "Time for an Eye Break! 👀",
        description: "Look at something 20 feet away for 20 seconds",
        duration: 20000,
      });
      setTimeLeft(1200);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, toast]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 w-full max-w-sm mx-auto bg-white shadow-lg animate-fade">
      <div className="flex flex-col items-center space-y-4">
        <Eye className="w-12 h-12 text-primary" />
        <h2 className="text-2xl font-semibold text-gray-800">20-20-20 Timer</h2>
        <div className="text-4xl font-bold text-primary">{formatTime(timeLeft)}</div>
        <Button 
          onClick={toggleTimer}
          className="w-full flex items-center justify-center space-x-2"
        >
          {isActive ? (
            <>
              <PauseCircle className="w-5 h-5" />
              <span>Pause Timer</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5" />
              <span>Start Timer</span>
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default Timer;