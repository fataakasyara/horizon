
import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Calendar, Clock, MapPin, Bell, Save, Repeat } from 'lucide-react';

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
    notificationTime: 15,
    recurrence: {
      type: 'none' as 'none' | 'weekly',
      endDate: ''
    }
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
        notificationTime: event.notificationTime,
        recurrence: event.recurrence || { type: 'none', endDate: '' }
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

  const handleRecurrenceChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      recurrence: {
        ...prev.recurrence,
        [field]: value
      }
    }));
  };

  const today = new Date().toISOString().split('T')[0];
  
  const getMinTime = () => {
    if (formData.date === today) {
      const now = new Date();
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    return '';
  };

  // Calculate end date for weekly recurrence (3 months from start date)
  const getDefaultEndDate = () => {
    if (formData.date && formData.recurrence.type === 'weekly') {
      const startDate = new Date(formData.date);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 3);
      return endDate.toISOString().split('T')[0];
    }
    return '';
  };

  return (
    <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 text-white p-8">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            {event ? 'Edit Acara' : 'Tambah Acara Baru'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel} className="h-10 w-10 p-0 rounded-full hover:bg-white/20 text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-gray-700 font-semibold text-base">
              Judul Acara *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Masukkan judul acara"
              className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-12 text-base transition-all duration-300 focus:shadow-lg"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-gray-700 font-semibold text-base">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Deskripsi acara (opsional)"
              className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl min-h-[100px] text-base transition-all duration-300 focus:shadow-lg resize-none"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="date" className="text-gray-700 font-semibold text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-horizon-purple-500" />
                Tanggal *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                min={today}
                className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-12 text-base transition-all duration-300 focus:shadow-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="time" className="text-gray-700 font-semibold text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-horizon-yellow-500" />
                Waktu *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                min={getMinTime()}
                className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-12 text-base transition-all duration-300 focus:shadow-lg"
                required
              />
            </div>
          </div>

          {/* Recurrence */}
          <div className="p-6 bg-gradient-to-br from-horizon-yellow-50 to-horizon-purple-50 rounded-3xl border border-horizon-purple-100 space-y-4">
            <div className="flex items-center space-x-3">
              <Label htmlFor="recurrence" className="text-gray-700 font-semibold text-base flex items-center gap-2">
                <Repeat className="h-4 w-4 text-horizon-purple-500" />
                Pengulangan Acara
              </Label>
            </div>
            
            <Select value={formData.recurrence.type} onValueChange={(value) => handleRecurrenceChange('type', value)}>
              <SelectTrigger className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-12 text-base transition-all duration-300">
                <SelectValue placeholder="Pilih jenis pengulangan" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-2xl border-0 shadow-2xl">
                <SelectItem value="none">Tidak berulang (sekali saja)</SelectItem>
                <SelectItem value="weekly">Setiap minggu</SelectItem>
              </SelectContent>
            </Select>

            {formData.recurrence.type === 'weekly' && (
              <div className="space-y-3 pl-4">
                <Label htmlFor="endDate" className="text-gray-600 font-medium text-sm">
                  Sampai tanggal (opsional)
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.recurrence.endDate || getDefaultEndDate()}
                  onChange={(e) => handleRecurrenceChange('endDate', e.target.value)}
                  min={formData.date}
                  className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-10 text-sm transition-all duration-300 focus:shadow-lg"
                />
                <p className="text-xs text-gray-500">
                  Kosongkan untuk pengulangan tanpa batas (sampai 1 tahun)
                </p>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label htmlFor="location" className="text-gray-700 font-semibold text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-500" />
              Lokasi
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Lokasi acara (opsional)"
              className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-12 text-base transition-all duration-300 focus:shadow-lg"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label htmlFor="category" className="text-gray-700 font-semibold text-base">
              Kategori
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-12 text-base transition-all duration-300">
                <SelectValue placeholder="Pilih kategori (opsional)" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-2xl border-0 shadow-2xl">
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

          {/* Notifications */}
          <div className="p-6 bg-gradient-to-br from-horizon-yellow-50 to-horizon-purple-50 rounded-3xl border border-horizon-purple-100 space-y-4">
            <div className="flex items-center space-x-3">
              <Switch
                id="notifications"
                checked={formData.isNotificationEnabled}
                onCheckedChange={(checked) => handleChange('isNotificationEnabled', checked)}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-horizon-purple-500 data-[state=checked]:to-horizon-yellow-500"
              />
              <Label htmlFor="notifications" className="text-gray-700 font-semibold text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-horizon-purple-500" />
                Aktifkan Notifikasi
              </Label>
            </div>

            {formData.isNotificationEnabled && (
              <div className="space-y-3 pl-8">
                <Label htmlFor="notificationTime" className="text-gray-600 font-medium text-sm">
                  Notifikasi sebelum acara
                </Label>
                <Select 
                  value={formData.notificationTime.toString()} 
                  onValueChange={(value) => handleChange('notificationTime', parseInt(value))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-horizon-purple-500 rounded-2xl h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-2xl border-0 shadow-2xl">
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

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white border-0 shadow-lg rounded-2xl h-12 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Save className="h-4 w-4 mr-2" />
              {event ? 'Perbarui Acara' : 'Tambah Acara'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-2xl h-12 px-8 font-semibold transition-all duration-300 hover:scale-105"
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
