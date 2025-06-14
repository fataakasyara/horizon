
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, Edit, Trash2 } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'created',
      title: 'Meeting with Marketing Team',
      time: '2 hours ago',
      icon: Plus,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'updated',
      title: 'Project Review Update',
      time: '4 hours ago',
      icon: Edit,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'deleted',
      title: 'Cancelled Client Call',
      time: '1 day ago',
      icon: Trash2,
      color: 'text-red-600'
    },
    {
      id: 4,
      type: 'created',
      title: 'Weekly Standup',
      time: '2 days ago',
      icon: Plus,
      color: 'text-green-600'
    }
  ];

  const getActionText = (type: string) => {
    switch (type) {
      case 'created': return 'Added';
      case 'updated': return 'Updated';
      case 'deleted': return 'Deleted';
      default: return 'Activity';
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Clock className="h-5 w-5 text-horizon-purple-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {getActionText(activity.type)}
                  </Badge>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
