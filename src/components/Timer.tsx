import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PauseCircle, PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          if (newSeconds % 1200 === 0) {
            toast({
              title: "Time for an Eye Break! 👀",
              description: "Look at something 20 feet away for 20 seconds",
              duration: 20000,
            });
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, toast]);

  const toggleTimer = () => {
    if (!isActive) {
      setShowDialog(true);
    }
    setIsActive(!isActive);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Card className="p-6 w-full max-w-sm mx-auto bg-white shadow-lg animate-fade">
        <div className="flex flex-col items-center space-y-4">
          <Eye className="w-12 h-12 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-800">Screen Time Timer</h2>
          <div className="text-4xl font-bold text-primary">{formatTime(seconds)}</div>
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Timer Started! 🎉</DialogTitle>
            <DialogDescription>
              Time to focus on your work!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-6">
            <div className="relative w-32 h-32">
              <div 
                className="absolute w-32 h-32 bg-primary rounded-full animate-bounce"
                style={{
                  animation: 'bounce 1s infinite, scale 0.5s infinite alternate',
                }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary-foreground rounded-full animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Timer;