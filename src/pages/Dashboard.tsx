
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
import { Plus, Search, Calendar, Clock, Bell, Home, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  console.log('Dashboard component is rendering');
  const navigate = useNavigate();
  
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    getUpcomingEvents, 
    getTodayEvents,
    isLoading
  } = useEvents();
  
  console.log('Events from useEvents:', events);
  console.log('IsLoading from useEvents:', isLoading);
  
  const { requestPermission, scheduleNotification } = useNotifications();
  
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  console.log('Dashboard state:', { showForm, searchTerm, filterCategory, activeTab });

  // Request notification permission on mount
  useEffect(() => {
    console.log('Requesting notification permission');
    requestPermission();
  }, [requestPermission]);

  // Schedule notifications for new events
  useEffect(() => {
    console.log('Scheduling notifications for events:', events);
    events.forEach(event => {
      if (event.isNotificationEnabled) {
        scheduleNotification(event);
      }
    });
  }, [events, scheduleNotification]);

  const handleAddEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('Adding new event:', eventData);
    const newEvent = addEvent(eventData);
    if (newEvent.isNotificationEnabled) {
      scheduleNotification(newEvent);
    }
    setShowForm(false);
  };

  const handleUpdateEvent = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEvent) {
      console.log('Updating event:', editingEvent.id, eventData);
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
      console.log('Deleting event:', id);
      deleteEvent(id);
    }
  };

  const handleToggleNotification = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      console.log('Toggling notification for event:', id);
      const updatedEvent = updateEvent(id, { 
        isNotificationEnabled: !event.isNotificationEnabled 
      });
      if (updatedEvent?.isNotificationEnabled) {
        scheduleNotification(updatedEvent);
      }
    }
  };

  const handleEditEvent = (event: Event) => {
    console.log('Editing event:', event);
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleGoHome = () => {
    console.log('Navigating to home');
    navigate('/');
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  console.log('Filtered events:', filteredEvents);

  const getEventsForTab = () => {
    switch (activeTab) {
      case 'today':
        const todayEvents = getTodayEvents().filter(event => {
          const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
          return matchesSearch && matchesCategory;
        });
        console.log('Today events:', todayEvents);
        return todayEvents;
      case 'upcoming':
        const upcomingEvents = getUpcomingEvents().filter(event => {
          const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
          return matchesSearch && matchesCategory;
        });
        console.log('Upcoming events:', upcomingEvents);
        return upcomingEvents;
      default:
        const sortedEvents = filteredEvents.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
        console.log('All sorted events:', sortedEvents);
        return sortedEvents;
    }
  };

  console.log('ShowForm state:', showForm);

  if (showForm) {
    console.log('Rendering EventForm');
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 py-8 px-4">
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

  console.log('Rendering main dashboard');
  
  if (isLoading) {
    console.log('Dashboard is in loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-yellow-100 flex items-center justify-center animate-spin">
            <Calendar className="h-8 w-8 text-purple-400" />
          </div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  const eventsForTab = getEventsForTab();
  console.log('Events for current tab:', eventsForTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      <OfflineIndicator />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-yellow-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold">Dashboard</h1>
              <p className="text-purple-100 text-lg">Kelola jadwal acara dengan mudah</p>
            </div>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
            >
              <Home className="h-4 w-4 mr-2" />
              Beranda
            </Button>
          </div>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Cari acara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-full h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-white/10 border-white/30 text-white rounded-full h-12 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-2xl border-0 shadow-2xl">
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
            
            <div className="lg:col-span-3">
              <Button
                onClick={() => setShowForm(true)}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-full h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Tambah Acara
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-2">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Semua Acara
            </TabsTrigger>
            <TabsTrigger 
              value="today" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
            >
              <Clock className="h-4 w-4 mr-2" />
              Hari Ini
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
            >
              <Bell className="h-4 w-4 mr-2" />
              Mendatang
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {eventsForTab.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-yellow-100 flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">
                  {activeTab === 'today' ? 'Tidak ada acara hari ini' :
                   activeTab === 'upcoming' ? 'Tidak ada acara mendatang' :
                   'Belum ada acara'}
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  {activeTab === 'today' ? 'Hari ini terlihat kosong. Nikmati waktu luang Anda!' :
                   activeTab === 'upcoming' ? 'Tidak ada acara yang dijadwalkan untuk masa depan.' :
                   searchTerm || filterCategory !== 'all' ? 'Coba ubah filter pencarian Anda.' :
                   'Mulai dengan menambahkan acara pertama Anda.'}
                </p>
                {(!searchTerm && filterCategory === 'all') && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white border-0 shadow-lg rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Tambah Acara Pertama
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsForTab.map(event => (
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
