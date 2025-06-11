
export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO string format
  time: string; // HH:MM format
  location?: string;
  category?: string;
  isNotificationEnabled: boolean;
  notificationTime: number; // minutes before event
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  enabled: boolean;
  defaultMinutesBefore: number;
}
