import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { useEvents } from '@/hooks/useEvents';
import { useNotifications } from '@/hooks/useNotifications';
import { EventCard } from '@/components/EventCard';
import { EventForm } from '@/components/EventForm';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { StatsCard } from '@/components/StatsCard';
import { QuickActions } from '@/components/QuickActions';
import { MiniCalendar } from '@/components/MiniCalendar';
import { RecentActivity } from '@/components/RecentActivity';
import { WeatherWidget } from '@/components/WeatherWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Calendar, Clock, Bell, Home, Filter, Users, Target, TrendingUp, Zap } from 'lucide-react';
import { SystemStatus } from '@/components/SystemStatus';
import { useIsMobile } from '@/hooks/use-mobile';
import { BottomNavBar } from '@/components/BottomNavBar';

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
  const isMobile = useIsMobile();
  
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

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
    if (window.confirm('Are you sure you want to delete this event?')) {
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
      case 'events':
        return filteredEvents.sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
      default:
        return [];
    }
  };

  // Calculate stats
  const todayEvents = getTodayEvents();
  const upcomingEvents = getUpcomingEvents();
  const totalEvents = events.length;
  const completedEvents = events.filter(event => {
    const eventDateTime = new Date(`${event.date}T${event.time}`);
    return eventDateTime < new Date();
  }).length;

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-horizon-purple-50 via-white to-horizon-yellow-50 py-8 px-4">
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

  const handleCalendarDateClick = (date: string) => {
    // Filter events for the selected date and show them
    const dayEvents = events.filter(event => event.date === date);
    if (dayEvents.length > 0) {
      // You could show a modal or highlight the events
      console.log('Events for', date, dayEvents);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-horizon-purple-50 via-white to-horizon-yellow-50 ${isMobile ? 'pb-20' : ''}`}>
      <OfflineIndicator />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-horizon-purple-500 via-horizon-purple-600 to-horizon-yellow-500 text-white py-6 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">H</span>
              </div>
              <div className="space-y-0 sm:space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                <p className="text-purple-100 text-sm hidden sm:block">Manage your schedule with ease</p>
              </div>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-full p-2 sm:px-6 sm:py-3 transition-all duration-300 hover:scale-105"
            >
              <Home className="h-5 w-5 sm:mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-2">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-horizon-purple-500 data-[state=active]:to-horizon-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
              >
                <Target className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-horizon-purple-500 data-[state=active]:to-horizon-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
              >
                <Calendar className="h-4 w-4 mr-2" />
                All Events
              </TabsTrigger>
              <TabsTrigger 
                value="today" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-horizon-purple-500 data-[state=active]:to-horizon-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
              >
                <Clock className="h-4 w-4 mr-2" />
                Today
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-horizon-purple-500 data-[state=active]:to-horizon-yellow-500 data-[state=active]:text-white rounded-xl transition-all duration-300 font-medium"
              >
                <Bell className="h-4 w-4 mr-2" />
                Upcoming
              </TabsTrigger>
            </TabsList>
          )}

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="sticky top-0 z-20 bg-gradient-to-b from-horizon-purple-50/90 via-white/90 to-white/90 backdrop-blur-sm pt-4 pb-2 -mx-4 px-4 md:static md:p-0 md:bg-transparent md:backdrop-blur-none">
                <QuickActions onAddEvent={() => setShowForm(true)} />
              </div>

              {/* Stats Cards */}
              <div data-stats className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Events"
                  value={totalEvents}
                  icon={Calendar}
                  change="+12% from last month"
                  changeType="positive"
                />
                <StatsCard
                  title="Today's Events"
                  value={todayEvents.length}
                  icon={Clock}
                />
                <StatsCard
                  title="Upcoming Events"
                  value={upcomingEvents.length}
                  icon={Bell}
                  change="+5 events this week"
                  changeType="positive"
                />
                <StatsCard
                  title="Completed"
                  value={completedEvents}
                  icon={TrendingUp}
                  change="92% completion rate"
                  changeType="positive"
                />
              </div>

              {/* Main Dashboard Grid - Simplified */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Status */}
                <div className="lg:col-span-1">
                  <SystemStatus />
                </div>

                {/* Weather Widget */}
                <div className="lg:col-span-1">
                  <WeatherWidget />
                </div>

                {/* Mini Calendar */}
                <div className="lg:col-span-1" data-calendar>
                  <MiniCalendar 
                    events={events.map(e => ({ date: e.date, title: e.title, category: e.category }))} 
                    onDateClick={handleCalendarDateClick}
                  />
                </div>
              </div>

              {/* Recent Activity - Full Width */}
              <div className="w-full">
                <RecentActivity />
              </div>
            </div>
          </TabsContent>

          {/* Events Tabs */}
          <TabsContent value={activeTab} className={activeTab === 'overview' ? 'hidden' : ''}>
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-white border-gray-200 rounded-full h-12 shadow-sm focus:shadow-md transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="bg-white border-gray-200 rounded-full h-12 shadow-sm hover:shadow-md transition-all duration-300">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-2xl border-0 shadow-2xl">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="lg:col-span-3">
                  {!isMobile && (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white font-semibold rounded-full h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Event
                    </Button>
                  )}
                </div>
              </div>

              {/* Events Grid */}
              {getEventsForTab().length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-horizon-purple-100 to-horizon-yellow-100 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-horizon-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">
                    {activeTab === 'today' ? 'No events today' :
                     activeTab === 'upcoming' ? 'No upcoming events' :
                     'No events yet'}
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    {activeTab === 'today' ? 'Today looks clear. Enjoy your free time!' :
                     activeTab === 'upcoming' ? 'There are no events scheduled for the future.' :
                     searchTerm || filterCategory !== 'all' ? 'Try changing your search filters.' :
                     'Get started by adding your first event.'}
                  </p>
                  {(!searchTerm && filterCategory === 'all') && (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white border-0 shadow-lg rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add First Event
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
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isMobile && !showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 text-white shadow-lg z-40 flex items-center justify-center animate-scale-in"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {isMobile && <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />}
    </div>
  );
};

export default Dashboard;
