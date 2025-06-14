
import { Plus, Calendar, Bell, Download, FileText, BarChart3 } from 'lucide-react';

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
    <div className="w-full">
      <h2 className="text-base font-bold text-gray-700 mb-3 md:text-lg">Quick Actions</h2>
      <div className="flex gap-4 overflow-x-auto pb-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center gap-2 p-3 rounded-2xl text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${action.color} hover:scale-105 group`}
          >
            <action.icon className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-xs text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
