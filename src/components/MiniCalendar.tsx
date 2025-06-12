
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface MiniCalendarProps {
  events: Array<{ date: string; title: string; category?: string }>;
  onDateClick?: (date: string) => void;
}

export const MiniCalendar = ({ events, onDateClick }: MiniCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    if (!day) return;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateClick?.(dateStr);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="h-8 w-8 p-0 rounded-full text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="h-8 w-8 p-0 rounded-full text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const hasEvents = dayEvents.length > 0;
            const isToday = day && isCurrentMonth && day === today.getDate();
            
            return (
              <div
                key={index}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square flex flex-col items-center justify-center text-sm rounded-lg relative transition-all duration-200
                  ${day ? 'hover:bg-horizon-purple-50 cursor-pointer hover:scale-105' : ''}
                  ${isToday 
                    ? 'bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 text-white font-bold shadow-lg' 
                    : 'text-gray-700'}
                  ${hasEvents && !isToday ? 'bg-gradient-to-r from-horizon-purple-100 to-horizon-yellow-100' : ''}
                `}
              >
                {day && (
                  <>
                    <span className="text-xs">{day}</span>
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map((_, i) => (
                          <div key={i} className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : 'bg-horizon-purple-400'}`}></div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : 'bg-horizon-yellow-500'}`}></div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Events for selected date */}
        {events.filter(e => e.date === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`).length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Acara Hari Ini</h4>
            <div className="space-y-1">
              {events
                .filter(e => e.date === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`)
                .slice(0, 2)
                .map((event, i) => (
                  <div key={i} className="text-xs text-gray-600 truncate">
                    • {event.title}
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
