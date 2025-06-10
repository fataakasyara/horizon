
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { toast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      toast({
        title: "Notifikasi tidak didukung",
        description: "Browser Anda tidak mendukung notifikasi.",
        variant: "destructive"
      });
      return false;
    }

    if (permission === 'granted') {
      return true;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === 'granted') {
      toast({
        title: "Notifikasi diaktifkan",
        description: "Anda akan menerima notifikasi untuk acara mendatang.",
      });
      return true;
    } else {
      toast({
        title: "Notifikasi ditolak",
        description: "Anda tidak akan menerima notifikasi acara.",
        variant: "destructive"
      });
      return false;
    }
  };

  const scheduleNotification = (event: Event) => {
    if (permission !== 'granted' || !event.isNotificationEnabled) {
      return;
    }

    const eventDateTime = new Date(`${event.date}T${event.time}`);
    const notificationTime = new Date(eventDateTime.getTime() - (event.notificationTime * 60 * 1000));
    const now = new Date();

    if (notificationTime > now) {
      const timeUntilNotification = notificationTime.getTime() - now.getTime();
      
      setTimeout(() => {
        new Notification(`Acara akan dimulai dalam ${event.notificationTime} menit`, {
          body: `${event.title} - ${event.location || 'Lokasi tidak ditentukan'}`,
          icon: '/favicon.ico',
          tag: `event-${event.id}`,
          requireInteraction: true
        });
      }, timeUntilNotification);
    }

    // Schedule notification when event starts
    const timeUntilStart = eventDateTime.getTime() - now.getTime();
    if (timeUntilStart > 0) {
      setTimeout(() => {
        new Notification('Acara dimulai sekarang!', {
          body: `${event.title} sedang berlangsung`,
          icon: '/favicon.ico',
          tag: `event-start-${event.id}`,
          requireInteraction: true
        });
      }, timeUntilStart);
    }
  };

  return {
    permission,
    requestPermission,
    scheduleNotification,
    isSupported: 'Notification' in window
  };
};
