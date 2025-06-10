
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Calendar, Clock, MapPin, Bell } from 'lucide-react';

interface EventFormProps {
  event?: Event;
  onSubmit: (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const EventForm = ({ event, onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    isNotificationEnabled: true,
    notificationTime: 15
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        date: event.date,
        time: event.time,
        location: event.location || '',
        category: event.category || '',
        isNotificationEnabled: event.isNotificationEnabled,
        notificationTime: event.notificationTime
      });
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.date || !formData.time) {
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  
  // Set minimum time to current time if date is today
  const getMinTime = () => {
    if (formData.date === today) {
      const now = new Date();
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    return '';
  };

  return (
    <Card className="horizon-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-horizon-purple-700 flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            {event ? 'Edit Acara' : 'Tambah Acara Baru'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-horizon-purple-700 font-medium">
              Judul Acara *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Masukkan judul acara"
              className="border-horizon-purple-200 focus:border-horizon-purple-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-horizon-purple-700 font-medium">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Deskripsi acara (opsional)"
              className="border-horizon-purple-200 focus:border-horizon-purple-500 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-horizon-purple-700 font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Tanggal *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                min={today}
                className="border-horizon-purple-200 focus:border-horizon-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-horizon-purple-700 font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Waktu *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                min={getMinTime()}
                className="border-horizon-purple-200 focus:border-horizon-purple-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-horizon-purple-700 font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Lokasi
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Lokasi acara (opsional)"
              className="border-horizon-purple-200 focus:border-horizon-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-horizon-purple-700 font-medium">
              Kategori
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger className="border-horizon-purple-200 focus:border-horizon-purple-500">
                <SelectValue placeholder="Pilih kategori (opsional)" />
              </SelectTrigger>
              <SelectContent className="bg-white">
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

          <div className="space-y-4 p-4 bg-horizon-yellow-50 rounded-lg border border-horizon-yellow-200">
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={formData.isNotificationEnabled}
                onCheckedChange={(checked) => handleChange('isNotificationEnabled', checked)}
              />
              <Label htmlFor="notifications" className="text-horizon-purple-700 font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Aktifkan Notifikasi
              </Label>
            </div>

            {formData.isNotificationEnabled && (
              <div className="space-y-2">
                <Label htmlFor="notificationTime" className="text-horizon-purple-700 font-medium text-sm">
                  Notifikasi sebelum acara (menit)
                </Label>
                <Select 
                  value={formData.notificationTime.toString()} 
                  onValueChange={(value) => handleChange('notificationTime', parseInt(value))}
                >
                  <SelectTrigger className="border-horizon-purple-200 focus:border-horizon-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="5">5 menit</SelectItem>
                    <SelectItem value="10">10 menit</SelectItem>
                    <SelectItem value="15">15 menit</SelectItem>
                    <SelectItem value="30">30 menit</SelectItem>
                    <SelectItem value="60">1 jam</SelectItem>
                    <SelectItem value="120">2 jam</SelectItem>
                    <SelectItem value="1440">1 hari</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="horizon-button flex-1"
            >
              {event ? 'Perbarui Acara' : 'Tambah Acara'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-horizon-purple-300 text-horizon-purple-700 hover:bg-horizon-purple-50"
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
