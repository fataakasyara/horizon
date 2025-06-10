
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
    return date.toLocaleDateString('id-ID', {
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
    <Card className="horizon-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-horizon-purple-700 text-xl mb-2">{event.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              {isToday && (
                <Badge className="bg-horizon-yellow-500 hover:bg-horizon-yellow-600 text-white">
                  Hari Ini
                </Badge>
              )}
              {isUpcoming && (
                <Badge variant="outline" className="border-horizon-purple-500 text-horizon-purple-700">
                  Mendatang
                </Badge>
              )}
              {event.category && (
                <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-700">
                  {event.category}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-1 ml-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleNotification(event.id)}
              className="h-8 w-8 p-0"
            >
              {event.isNotificationEnabled ? (
                <Bell className="h-4 w-4 text-horizon-purple-600" />
              ) : (
                <BellOff className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(event)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4 text-horizon-purple-600" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(event.id)}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {event.description && (
          <p className="text-gray-600 text-sm">{event.description}</p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="h-4 w-4 text-horizon-purple-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="h-4 w-4 text-horizon-purple-500" />
            <span>{formatTime(event.time)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="h-4 w-4 text-horizon-purple-500" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {isUpcoming && (
          <CountdownTimer
            targetDate={event.date}
            targetTime={event.time}
            title="Waktu tersisa"
          />
        )}

        {!isUpcoming && (
          <div className="text-center p-3 bg-gray-100 rounded-lg">
            <p className="text-gray-600 font-medium">
              {eventDateTime.getTime() < now.getTime() - 24 * 60 * 60 * 1000 
                ? 'Acara telah selesai' 
                : 'Acara sedang berlangsung'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
