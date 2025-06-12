
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Wifi, Battery, Clock, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Battery API (only works in some browsers)
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getConnectionStatus = () => {
    if (isOnline) {
      return { status: 'Online', color: 'bg-green-500', textColor: 'text-green-700' };
    } else {
      return { status: 'Offline', color: 'bg-red-500', textColor: 'text-red-700' };
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const connection = getConnectionStatus();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-horizon-purple-600" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="text-center p-4 bg-gradient-to-r from-horizon-purple-50 to-horizon-yellow-50 rounded-xl">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-1">
            <Clock className="h-6 w-6 text-horizon-purple-600" />
            {formatTime(currentTime)}
          </div>
          <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 gap-3">
          {/* Connection Status */}
          <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <Wifi className={`h-4 w-4 ${connection.textColor}`} />
              <div className={`w-2 h-2 rounded-full ${connection.color}`}></div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Koneksi</p>
              <p className={`text-sm font-medium ${connection.textColor}`}>
                {connection.status}
              </p>
            </div>
          </div>

          {/* Battery Status */}
          <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm">
            <Battery className={`h-4 w-4 ${batteryLevel ? getBatteryColor(batteryLevel) : 'text-gray-400'}`} />
            <div>
              <p className="text-xs text-gray-500">Baterai</p>
              <p className={`text-sm font-medium ${batteryLevel ? getBatteryColor(batteryLevel) : 'text-gray-400'}`}>
                {batteryLevel ? `${batteryLevel}%` : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Uptime Sesi
            </span>
            <Badge variant="outline" className="text-xs">
              {Math.floor((Date.now() - performance.timeOrigin) / 60000)} min
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-sm text-gray-600">User Agent</span>
            <Badge variant="outline" className="text-xs max-w-24 truncate">
              {navigator.userAgent.includes('Chrome') ? 'Chrome' :
               navigator.userAgent.includes('Firefox') ? 'Firefox' :
               navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
