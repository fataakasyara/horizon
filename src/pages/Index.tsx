
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Calendar, Clock, Bell, Wifi, Smartphone, Star, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Manajemen Acara",
      description: "Tambah, edit, dan hapus acara dengan mudah"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Countdown Timer",
      description: "Hitung mundur waktu menuju acara penting"
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Mode Offline",
      description: "Akses jadwal tanpa internet"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Notifikasi Real-time",
      description: "Terima notifikasi langsung"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive Design",
      description: "Bekerja di semua perangkat"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "User Friendly",
      description: "Interface yang intuitif"
    }
  ];

  return (
    <div className="min-h-screen">
      <OfflineIndicator />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-horizon-purple-50 via-white to-horizon-yellow-50"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-horizon-purple-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-horizon-yellow-200 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-white/80 text-horizon-purple-700 border-0 shadow-lg backdrop-blur-sm px-6 py-2 text-sm font-medium hover:scale-105 transition-transform duration-300">
            ✨ Horizon Event Scheduler
          </Badge>
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 bg-clip-text text-transparent animate-fade-in">
              Horizon
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Platform manajemen jadwal acara modern dengan teknologi offline-first
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white border-0 shadow-xl px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Mulai Sekarang
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-horizon-purple-300 text-horizon-purple-700 hover:bg-horizon-purple-50 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/80 backdrop-blur-sm"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Lihat Fitur
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              { value: "100%", label: "Offline Support" },
              { value: "Real-time", label: "Notifications" },
              { value: "All Devices", label: "Responsive" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-600 bg-clip-text text-transparent">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Didesain untuk kemudahan dan efisiensi maksimal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-horizon-purple-100 to-horizon-yellow-100 flex items-center justify-center text-horizon-purple-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-horizon-purple-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-horizon-purple-50 to-horizon-yellow-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-2xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-600 bg-clip-text text-transparent">
                Siap Memulai?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Kelola jadwal dengan cara yang lebih cerdas dan efisien
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white border-0 shadow-xl px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Calendar className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Mulai Gratis Sekarang
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-gray-500">
              {[
                "No Installation Required",
                "Works Offline", 
                "Instant Notifications"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 hover:text-horizon-purple-600 transition-colors duration-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-horizon-purple-800 to-horizon-purple-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-bold">Horizon</h3>
          <p className="text-purple-200">
            Mengelola jadwal dengan teknologi terdepan
          </p>
          <div className="text-purple-300 text-sm">
            © 2024 Horizon Event Scheduler. Dibuat dengan ❤️
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
