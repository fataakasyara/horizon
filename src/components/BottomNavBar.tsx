
import { Calendar, Clock, Bell, Target } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavBar = ({ activeTab, onTabChange }: BottomNavBarProps) => {
  const navItems = [
    { value: 'overview', label: 'Overview', icon: Target },
    { value: 'events', label: 'All', icon: Calendar },
    { value: 'today', label: 'Today', icon: Clock },
    { value: 'upcoming', label: 'Upcoming', icon: Bell },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200/50 shadow-t-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onTabChange(item.value)}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors duration-200 ${
              activeTab === item.value ? 'text-horizon-purple-600 font-bold' : 'text-gray-500'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
