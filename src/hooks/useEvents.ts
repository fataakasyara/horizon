
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'horizon-events';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('useEvents hook initialized');

  // Helper function to get base event ID from recurring event ID
  const getBaseEventId = (eventId: string): string => {
    return eventId.split('-')[0];
  };

  // Generate recurring event instances
  const generateRecurringEvents = (baseEvent: Event): Event[] => {
    console.log('Generating recurring events for:', baseEvent.title);
    
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

    console.log(`Generated ${instances.length} instances for ${baseEvent.title}`);
    return instances;
  };

  // Get all event instances including recurring ones
  const getAllEventInstances = (): Event[] => {
    const allInstances: Event[] = [];
    
    events.forEach(event => {
      const instances = generateRecurringEvents(event);
      allInstances.push(...instances);
    });

    console.log('Total event instances:', allInstances.length);
    return allInstances;
  };

  // Load events from localStorage on mount
  useEffect(() => {
    console.log('Loading events from localStorage');
    
    try {
      const savedEvents = localStorage.getItem(STORAGE_KEY);
      console.log('Saved events from localStorage:', savedEvents);
      
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents) as Event[];
        console.log('Parsed events:', parsedEvents);
        
        // Migrate old events to new format
        const migratedEvents = parsedEvents.map(event => ({
          ...event,
          recurrence: event.recurrence || { type: 'none' as const }
        }));
        
        console.log('Migrated events:', migratedEvents);
        setEvents(migratedEvents);
      } else {
        console.log('No saved events found in localStorage');
      }
    } catch (error) {
      console.error('Error loading events from storage:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data acara dari penyimpanan lokal.",
        variant: "destructive"
      });
    } finally {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (!isLoading) {
      console.log('Saving events to localStorage:', events);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        console.log('Events saved successfully');
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
    console.log('Adding event:', eventData);
    
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      recurrence: eventData.recurrence || { type: 'none' }
    };

    console.log('New event created:', newEvent);
    setEvents(prev => {
      const updated = [...prev, newEvent];
      console.log('Updated events array:', updated);
      return updated;
    });
    
    const recurringText = newEvent.recurrence.type === 'weekly' ? ' (berulang mingguan)' : '';
    toast({
      title: "Acara ditambahkan",
      description: `${newEvent.title}${recurringText} berhasil ditambahkan ke jadwal.`,
    });

    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Omit<Event, 'id' | 'createdAt'>>): Event | null => {
    console.log('Updating event:', id, updates);
    
    // Get base event ID for recurring events
    const baseEventId = getBaseEventId(id);
    const eventIndex = events.findIndex(e => e.id === baseEventId);
    
    if (eventIndex === -1) {
      console.error('Event not found:', baseEventId);
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

    console.log('Updated event:', updatedEvent);
    setEvents(prev => prev.map(e => e.id === baseEventId ? updatedEvent : e));
    
    toast({
      title: "Acara diperbarui",
      description: `${updatedEvent.title} berhasil diperbarui.`,
    });

    return updatedEvent;
  };

  const deleteEvent = (id: string): boolean => {
    console.log('Deleting event:', id);
    
    // Get base event ID for recurring events
    const baseEventId = getBaseEventId(id);
    const event = events.find(e => e.id === baseEventId);
    
    if (!event) {
      console.error('Event not found for deletion:', baseEventId);
      toast({
        title: "Error",
        description: "Acara tidak ditemukan.",
        variant: "destructive"
      });
      return false;
    }

    setEvents(prev => prev.filter(e => e.id !== baseEventId));
    
    const recurringText = event.recurrence.type === 'weekly' ? ' (termasuk semua pengulangan)' : '';
    toast({
      title: "Acara dihapus",
      description: `${event.title}${recurringText} berhasil dihapus dari jadwal.`,
    });

    return true;
  };

  const getEventById = (id: string): Event | undefined => {
    const baseEventId = getBaseEventId(id);
    return events.find(e => e.id === baseEventId);
  };

  const getUpcomingEvents = (): Event[] => {
    const now = new Date();
    const allInstances = getAllEventInstances();
    
    const upcoming = allInstances
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
    
    console.log('Upcoming events:', upcoming);
    return upcoming;
  };

  const getTodayEvents = (): Event[] => {
    const today = new Date().toISOString().split('T')[0];
    const allInstances = getAllEventInstances();
    
    const todayEvents = allInstances
      .filter(event => event.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
    
    console.log('Today events:', todayEvents);
    return todayEvents;
  };

  const allInstances = getAllEventInstances();
  console.log('Returning from useEvents:', {
    events: allInstances,
    baseEvents: events,
    isLoading,
    eventsCount: allInstances.length
  });

  return {
    events: allInstances,
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
