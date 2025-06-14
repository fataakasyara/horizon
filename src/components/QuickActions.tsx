
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, Clock, Bell, Settings, Download, FileText, BarChart3, Zap } from 'lucide-react';

interface QuickActionsProps {
  onAddEvent: () => void;
}

export const QuickActions = ({ onAddEvent }: QuickActionsProps) => {
  const exportData = () => {
    const events = JSON.parse(localStorage.getItem('horizon-events') || '[]');
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `horizon-events-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const actions = [
    {
      icon: Plus,
      label: 'Add Event',
      description: 'Create a new event',
      color: 'from-horizon-purple-500 to-horizon-purple-600',
      onClick: onAddEvent
    },
    {
      icon: Calendar,
      label: 'View Calendar',
      description: 'Display full calendar',
      color: 'from-horizon-yellow-400 to-horizon-yellow-500',
      onClick: () => {
        // Scroll to calendar or switch to calendar view
        const calendarElement = document.querySelector('[data-calendar]');
        calendarElement?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage reminders',
      color: 'from-green-500 to-green-600',
      onClick: () => {
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Notifications enabled!', {
                body: 'You will receive event reminders.',
                icon: '/favicon.ico'
              });
            }
          });
        }
      }
    },
    {
      icon: Download,
      label: 'Export Data',
      description: 'Download event data',
      color: 'from-blue-500 to-blue-600',
      onClick: exportData
    },
    {
      icon: BarChart3,
      label: 'Statistics',
      description: 'View summary',
      color: 'from-purple-500 to-purple-600',
      onClick: () => {
        // Scroll to stats section
        const statsElement = document.querySelector('[data-stats]');
        statsElement?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      icon: FileText,
      label: 'Report',
      description: 'Generate report',
      color: 'from-orange-500 to-orange-600',
      onClick: () => {
        const events = JSON.parse(localStorage.getItem('horizon-events') || '[]');
        const report = `
# Event Report - ${new Date().toLocaleDateString('en-US')}

## Summary
- Total Events: ${events.length}
- Completed Events: ${events.filter((e: any) => new Date(e.date + 'T' + e.time) < new Date()).length}
- Upcoming Events: ${events.filter((e: any) => new Date(e.date + 'T' + e.time) > new Date()).length}

## Event Details
${events.map((e: any, i: number) => `${i + 1}. ${e.title} - ${e.date} ${e.time}`).join('\n')}
        `;
        
        const reportBlob = new Blob([report], { type: 'text/markdown' });
        const url = URL.createObjectURL(reportBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `event-report-${new Date().toISOString().split('T')[0]}.md`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 text-white">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <p className="text-sm text-purple-100">Quick access to main features</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.onClick}
              className={`h-auto flex flex-col items-center justify-center gap-3 p-4 border-0 bg-gradient-to-r ${action.color} text-white hover:scale-105 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg group`}
            >
              <action.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-center">
                <div className="font-semibold text-sm">{action.label}</div>
                <div className="text-xs opacity-90 mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
