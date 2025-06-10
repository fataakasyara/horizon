
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
      variant={isOnline ? "secondary" : "destructive"} 
      className={`fixed top-4 right-4 z-50 ${
        isOnline 
          ? 'bg-green-100 text-green-800 border-green-300' 
          : 'bg-red-100 text-red-800 border-red-300'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-3 w-3 mr-1" />
          Online
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3 mr-1" />
          Mode Offline
        </>
      )}
    </Badge>
  );
};
