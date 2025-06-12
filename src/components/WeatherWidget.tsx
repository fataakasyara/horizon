
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';

export const WeatherWidget = () => {
  // Simulated weather data
  const weather = {
    location: 'Jakarta',
    temperature: 28,
    condition: 'Berawan',
    humidity: 75,
    windSpeed: 12,
    icon: Cloud
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Sun className="h-5 w-5 text-yellow-500" />
          Cuaca Hari Ini
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <weather.icon className="h-12 w-12 text-blue-600" />
            <div>
              <div className="text-3xl font-bold text-gray-900">{weather.temperature}°C</div>
              <div className="text-sm text-gray-600">{weather.condition}</div>
              <div className="text-xs text-gray-500">{weather.location}</div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CloudRain className="h-4 w-4" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Wind className="h-4 w-4" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
