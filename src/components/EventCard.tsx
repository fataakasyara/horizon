import { Event } from '@/types/event';
import { CountdownTimer } from './CountdownTimer';
import { Calendar, Clock, MapPin, Edit, Trash2, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onToggleNotification: (id: string) => void;
}

export const EventCard = ({ event, onEdit, onDelete, onToggleNotification }: EventCardProps) => {
  const eventDateTime = new Date(`${event.date}T${event.time}`);
  const now = new Date();
  const isUpcoming = eventDateTime > now;
  const isToday = event.date === new Date().toISOString().split('T')[0];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <Card className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
        <div className="w-full h-full bg-white rounded-3xl"></div>
      </div>
      
      <div className="relative">
        <CardHeader className="pb-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-3">
              <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-horizon-purple-700 transition-colors duration-300">
                {event.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                {isToday && (
                  <Badge className="bg-gradient-to-r from-horizon-yellow-400 to-horizon-yellow-500 text-white border-0 rounded-full px-3 py-1 text-xs font-medium animate-pulse">
                    Today
                  </Badge>
                )}
                {isUpcoming && (
                  <Badge className="bg-gradient-to-r from-horizon-purple-100 to-horizon-purple-200 text-horizon-purple-700 border-0 rounded-full px-3 py-1 text-xs font-medium">
                    Upcoming
                  </Badge>
                )}
                {event.category && (
                  <Badge className="bg-gray-100 text-gray-700 border-0 rounded-full px-3 py-1 text-xs font-medium">
                    {event.category}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onToggleNotification(event.id)}
                className="h-8 w-8 p-0 rounded-full hover:bg-horizon-purple-100 transition-all duration-300 hover:scale-110"
              >
                {event.isNotificationEnabled ? (
                  <Bell className="h-4 w-4 text-horizon-purple-600" />
                ) : (
                  <BellOff className="h-4 w-4 text-gray-400" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(event)}
                className="h-8 w-8 p-0 rounded-full hover:bg-horizon-purple-100 transition-all duration-300 hover:scale-110"
              >
                <Edit className="h-4 w-4 text-horizon-purple-600" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(event.id)}
                className="h-8 w-8 p-0 rounded-full hover:bg-red-100 transition-all duration-300 hover:scale-110"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {event.description && (
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-2xl p-4">
              {event.description}
            </p>
          )}
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700 p-3 rounded-2xl bg-gradient-to-r from-horizon-purple-50 to-transparent hover:from-horizon-purple-100 transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Calendar className="h-4 w-4 text-horizon-purple-500" />
              </div>
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-700 p-3 rounded-2xl bg-gradient-to-r from-horizon-yellow-50 to-transparent hover:from-horizon-yellow-100 transition-colors duration-300">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Clock className="h-4 w-4 text-horizon-yellow-500" />
              </div>
              <span className="font-medium">{formatTime(event.time)}</span>
            </div>
            
            {event.location && (
              <div className="flex items-center gap-3 text-sm text-gray-700 p-3 rounded-2xl bg-gradient-to-r from-gray-50 to-transparent hover:from-gray-100 transition-colors duration-300">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
                <span className="font-medium">{event.location}</span>
              </div>
            )}
          </div>

          {isUpcoming ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-horizon-purple-50 to-horizon-yellow-50 border border-white/50">
              <CountdownTimer
                targetDate={event.date}
                targetTime={event.time}
                title="Time left"
              />
            </div>
          ) : (
            <div className="text-center p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl">
              <p className="text-gray-600 font-medium">
                {eventDateTime.getTime() < now.getTime() - 24 * 60 * 60 * 1000 
                  ? 'Event has finished' 
                  : 'Event is ongoing'}
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
