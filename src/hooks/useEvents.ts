
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'horizon-events';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate recurring event instances
  const generateRecurringEvents = (baseEvent: Event): Event[] => {
    if (baseEvent.recurrence.type === 'none') {
      return [baseEvent];
    }

    const instances: Event[] = [];
    const startDate = new Date(baseEvent.date);
    const endDate = baseEvent.recurrence.endDate 
      ? new Date(baseEvent.recurrence.endDate) 
      : new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)); // 1 year from now

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      instances.push({
        ...baseEvent,
        id: `${baseEvent.id}-${currentDate.toISOString().split('T')[0]}`,
        date: currentDate.toISOString().split('T')[0]
      });

      if (baseEvent.recurrence.type === 'weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      }
    }

    return instances;
  };

  // Get all event instances including recurring ones
  const getAllEventInstances = (): Event[] => {
    const allInstances: Event[] = [];
    
    events.forEach(event => {
      const instances = generateRecurringEvents(event);
      allInstances.push(...instances);
    });

    return allInstances;
  };

  // Load events from localStorage on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem(STORAGE_KEY);
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents) as Event[];
        // Migrate old events to new format
        const migratedEvents = parsedEvents.map(event => ({
          ...event,
          recurrence: event.recurrence || { type: 'none' as const }
        }));
        setEvents(migratedEvents);
      }
    } catch (error) {
      console.error('Error loading events from storage:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data acara dari penyimpanan lokal.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
      } catch (error) {
        console.error('Error saving events to storage:', error);
        toast({
          title: "Error",
          description: "Gagal menyimpan data acara ke penyimpanan lokal.",
          variant: "destructive"
        });
      }
    }
  }, [events, isLoading]);

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Event => {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      recurrence: eventData.recurrence || { type: 'none' }
    };

    setEvents(prev => [...prev, newEvent]);
    
    const recurringText = newEvent.recurrence.type === 'weekly' ? ' (berulang mingguan)' : '';
    toast({
      title: "Acara ditambahkan",
      description: `${newEvent.title}${recurringText} berhasil ditambahkan ke jadwal.`,
    });

    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Omit<Event, 'id' | 'createdAt'>>): Event | null => {
    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
      toast({
        title: "Error",
        description: "Acara tidak ditemukan.",
        variant: "destructive"
      });
      return null;
    }

    const updatedEvent: Event = {
      ...events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
    
    toast({
      title: "Acara diperbarui",
      description: `${updatedEvent.title} berhasil diperbarui.`,
    });

    return updatedEvent;
  };

  const deleteEvent = (id: string): boolean => {
    const event = events.find(e => e.id === id);
    if (!event) {
      toast({
        title: "Error",
        description: "Acara tidak ditemukan.",
        variant: "destructive"
      });
      return false;
    }

    setEvents(prev => prev.filter(e => e.id !== id));
    
    toast({
      title: "Acara dihapus",
      description: `${event.title} berhasil dihapus dari jadwal.`,
    });

    return true;
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(e => e.id === id);
  };

  const getUpcomingEvents = (): Event[] => {
    const now = new Date();
    const allInstances = getAllEventInstances();
    
    return allInstances
      .filter(event => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        return eventDateTime > now;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 50); // Limit to 50 upcoming events
  };

  const getTodayEvents = (): Event[] => {
    const today = new Date().toISOString().split('T')[0];
    const allInstances = getAllEventInstances();
    
    return allInstances
      .filter(event => event.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  return {
    events: getAllEventInstances(),
    baseEvents: events, // Original events without instances
    isLoading,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getUpcomingEvents,
    getTodayEvents
  };
};
