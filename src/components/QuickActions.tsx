
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, Clock, Bell, Settings, Download } from 'lucide-react';

interface QuickActionsProps {
  onAddEvent: () => void;
}

export const QuickActions = ({ onAddEvent }: QuickActionsProps) => {
  const actions = [
    {
      icon: Plus,
      label: 'Tambah Acara',
      color: 'from-horizon-purple-500 to-horizon-purple-600',
      onClick: onAddEvent
    },
    {
      icon: Calendar,
      label: 'Lihat Kalender',
      color: 'from-horizon-yellow-400 to-horizon-yellow-500',
      onClick: () => console.log('Calendar view')
    },
    {
      icon: Clock,
      label: 'Set Reminder',
      color: 'from-blue-500 to-blue-600',
      onClick: () => console.log('Set reminder')
    },
    {
      icon: Bell,
      label: 'Notifikasi',
      color: 'from-green-500 to-green-600',
      onClick: () => console.log('Notifications')
    },
    {
      icon: Settings,
      label: 'Pengaturan',
      color: 'from-gray-500 to-gray-600',
      onClick: () => console.log('Settings')
    },
    {
      icon: Download,
      label: 'Export Data',
      color: 'from-purple-500 to-purple-600',
      onClick: () => console.log('Export data')
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.onClick}
              className={`h-16 flex flex-col items-center justify-center gap-2 border-0 bg-gradient-to-r ${action.color} text-white hover:scale-105 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg`}
            >
              <action.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
