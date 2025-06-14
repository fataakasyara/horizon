import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // ISO date string
  targetTime: string; // HH:MM format
  title: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ targetDate, targetTime, title, onComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDateTime = new Date(`${targetDate}T${targetTime}`);
      const now = new Date();
      const difference = targetDateTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isExpired) {
          setIsExpired(true);
          onComplete?.();
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, targetTime, isExpired, onComplete]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (isExpired) {
    return (
      <div className="text-center p-4 horizon-card rounded-lg">
        <Clock className="w-8 h-8 mx-auto mb-2 text-horizon-purple-500" />
        <h3 className="text-lg font-semibold text-horizon-purple-700 mb-1">{title}</h3>
        <p className="text-horizon-purple-600 font-bold">The event has started!</p>
      </div>
    );
  }

  return (
    <div className="text-center p-4 horizon-card rounded-lg">
      <Clock className="w-8 h-8 mx-auto mb-2 text-horizon-purple-500" />
      <h3 className="text-lg font-semibold text-horizon-purple-700 mb-3">{title}</h3>
      
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div className="bg-gradient-to-br from-horizon-purple-500 to-horizon-yellow-500 text-white p-2 rounded-lg">
          <div className="text-xl font-bold">{formatNumber(timeLeft.days)}</div>
          <div className="text-xs">Days</div>
        </div>
        <div className="bg-gradient-to-br from-horizon-purple-500 to-horizon-yellow-500 text-white p-2 rounded-lg">
          <div className="text-xl font-bold">{formatNumber(timeLeft.hours)}</div>
          <div className="text-xs">Hours</div>
        </div>
        <div className="bg-gradient-to-br from-horizon-purple-500 to-horizon-yellow-500 text-white p-2 rounded-lg">
          <div className="text-xl font-bold">{formatNumber(timeLeft.minutes)}</div>
          <div className="text-xs">Minutes</div>
        </div>
        <div className="bg-gradient-to-br from-horizon-purple-500 to-horizon-yellow-500 text-white p-2 rounded-lg">
          <div className="text-xl font-bold">{formatNumber(timeLeft.seconds)}</div>
          <div className="text-xs">Seconds</div>
        </div>
      </div>
    </div>
  );
};
