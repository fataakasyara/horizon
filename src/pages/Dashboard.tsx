
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { useEvents } from '@/hooks/useEvents';
import { useNotifications } from '@/hooks/useNotifications';
import { EventCard } from '@/components/EventCard';
import { EventForm } from '@/components/EventForm';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Calendar, Clock, Bell, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    getUpcomingEvents, 
    getTodayEvents 
  } = useEvents();
  
  const { requestPermission, scheduleNotification } = useNotifications();
  
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Request notification permission on mount
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  // Schedule notifications for new events
  useEffect(() => {
    events.forEach(event => {
      if (event.isNotificationEnabled) {
        scheduleNotification(event);
      }
    });
  }, [events, scheduleNotification]);

  const handleAddEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEvent = addEvent(eventData);
    if (newEvent.isNotificationEnabled) {
      scheduleNotification(newEvent);
    }
    setShowForm(false);
  };

  const handleUpdateEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEvent) {
      const updatedEvent = updateEvent(editingEvent.id, eventData);
      if (updatedEvent?.isNotificationEnabled) {
        scheduleNotification(updatedEvent);
      }
      setEditingEvent(null);
      setShowForm(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus acara ini?')) {
      deleteEvent(id);
    }
  };

  const handleToggleNotification = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      const updatedEvent = updateEvent(id, { 
        isNotificationEnabled: !event.isNotificationEnabled 
      });
      if (updatedEvent?.isNotificationEnabled) {
        scheduleNotification(updatedEvent);
      }
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getEventsForTab = () => {
    switch (activeTab) {
      case 'today':
        return getTodayEvents().filter(event => {
          const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
          return matchesSearch && matchesCategory;
        });
      case 'upcoming':
        return getUpcomingEvents().filter(event => {
          const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
          return matchesSearch && matchesCategory;
        });
      default:
        return filteredEvents.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen py-8 px-4">
        <OfflineIndicator />
        <EventForm
          event={editingEvent || undefined}
          onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
          onCancel={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <OfflineIndicator />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-horizon-purple-600 via-horizon-purple-500 to-horizon-yellow-500 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Horizon Dashboard</h1>
              <p className="text-purple-100">Kelola jadwal acara Anda dengan mudah</p>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Home className="h-4 w-4 mr-2" />
              Beranda
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari acara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-purple-200"
                />
              </div>
            </div>
            
            <div className="lg:w-48">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Pekerjaan</SelectItem>
                  <SelectItem value="social">Sosial</SelectItem>
                  <SelectItem value="health">Kesehatan</SelectItem>
                  <SelectItem value="education">Pendidikan</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              onClick={() => setShowForm(true)}
              className="bg-white text-horizon-purple-600 hover:bg-gray-100 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Acara
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-horizon-purple-500 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Semua Acara
            </TabsTrigger>
            <TabsTrigger value="today" className="data-[state=active]:bg-horizon-purple-500 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              Hari Ini
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-horizon-purple-500 data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              Mendatang
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {getEventsForTab().length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-horizon-purple-300 mb-4" />
                <h3 className="text-xl font-semibold text-horizon-purple-600 mb-2">
                  {activeTab === 'today' ? 'Tidak ada acara hari ini' :
                   activeTab === 'upcoming' ? 'Tidak ada acara mendatang' :
                   'Belum ada acara'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'today' ? 'Hari ini terlihat kosong. Nikmati waktu luang Anda!' :
                   activeTab === 'upcoming' ? 'Tidak ada acara yang dijadwalkan untuk masa depan.' :
                   searchTerm || filterCategory !== 'all' ? 'Coba ubah filter pencarian Anda.' :
                   'Mulai dengan menambahkan acara pertama Anda.'}
                </p>
                {(!searchTerm && filterCategory === 'all') && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="horizon-button"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Acara Pertama
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getEventsForTab().map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    onToggleNotification={handleToggleNotification}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
