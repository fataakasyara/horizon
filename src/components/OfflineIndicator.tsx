
import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Badge 
      className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-full border-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
        isOnline 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
          : 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-3 w-3 mr-2" />
          Online
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3 mr-2" />
          Offline
        </>
      )}
    </Badge>
  );
};
