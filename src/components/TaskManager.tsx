
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review presentasi untuk meeting', completed: false, priority: 'high' },
    { id: '2', title: 'Beli groceries', completed: false, priority: 'medium' },
    { id: '3', title: 'Update dokumentasi project', completed: true, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-horizon-purple-600" />
          Task Manager
          <span className="text-sm font-normal text-gray-500">
            ({completedCount}/{totalCount})
          </span>
        </CardTitle>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Tambah task baru..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 rounded-full"
          />
          <Button
            onClick={addTask}
            size="sm"
            className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white rounded-full px-4"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {tasks.map(task => (
            <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${task.completed ? 'bg-gray-50 opacity-75' : 'bg-white shadow-sm'}`}>
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="data-[state=checked]:bg-horizon-purple-500 data-[state=checked]:border-horizon-purple-500"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                  {task.title}
                </p>
                <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
