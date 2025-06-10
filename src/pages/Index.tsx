
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Calendar, Clock, Bell, Wifi, Smartphone, Star } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-horizon-purple-500" />,
      title: "Manajemen Acara",
      description: "Tambah, edit, dan hapus acara dengan mudah. Kelola jadwal Anda dengan efisien."
    },
    {
      icon: <Clock className="h-8 w-8 text-horizon-yellow-500" />,
      title: "Countdown Timer",
      description: "Hitung mundur waktu menuju acara penting Anda dengan tampilan yang menarik."
    },
    {
      icon: <Wifi className="h-8 w-8 text-horizon-purple-500" />,
      title: "Mode Offline",
      description: "Akses jadwal Anda meski tanpa internet berkat penyimpanan lokal browser."
    },
    {
      icon: <Bell className="h-8 w-8 text-horizon-yellow-500" />,
      title: "Notifikasi Real-time",
      description: "Terima notifikasi langsung ke perangkat saat acara akan dimulai."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-horizon-purple-500" />,
      title: "Responsive Design",
      description: "Bekerja sempurna di desktop, tablet, dan smartphone Anda."
    },
    {
      icon: <Star className="h-8 w-8 text-horizon-yellow-500" />,
      title: "User Friendly",
      description: "Interface yang intuitif dan mudah digunakan untuk semua kalangan."
    }
  ];

  return (
    <div className="min-h-screen">
      <OfflineIndicator />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-horizon-yellow-200 via-horizon-purple-200 to-horizon-yellow-300 opacity-30"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="mb-8 animate-fade-in">
            <Badge className="bg-horizon-purple-100 text-horizon-purple-700 border-horizon-purple-300 mb-4 px-4 py-2 text-sm font-medium">
              ✨ Horizon Event Scheduler
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-600 bg-clip-text text-transparent mb-6">
              Horizon
            </h1>
            <p className="text-xl md:text-2xl text-horizon-purple-700 mb-8 max-w-3xl mx-auto">
              Platform manajemen jadwal acara terdepan dengan teknologi offline-first dan notifikasi real-time
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="horizon-button px-8 py-6 text-lg font-semibold shadow-2xl animate-pulse-glow"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Mulai Mengatur Jadwal
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-horizon-purple-400 text-horizon-purple-700 hover:bg-horizon-purple-50 px-8 py-6 text-lg font-semibold"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Pelajari Fitur
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="horizon-card hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-horizon-purple-600 mb-2">100%</div>
                <div className="text-horizon-purple-700 font-medium">Offline Support</div>
              </CardContent>
            </Card>
            <Card className="horizon-card hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-horizon-yellow-600 mb-2">Real-time</div>
                <div className="text-horizon-purple-700 font-medium">Notifications</div>
              </CardContent>
            </Card>
            <Card className="horizon-card hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-horizon-purple-600 mb-2">Responsive</div>
                <div className="text-horizon-purple-700 font-medium">All Devices</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-horizon-purple-700 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Horizon dilengkapi dengan fitur-fitur canggih untuk membantu Anda mengelola jadwal dengan lebih efektif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="horizon-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-horizon-purple-100 to-horizon-yellow-100 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-horizon-purple-700 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="horizon-card border-0 shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-horizon-purple-700 mb-6">
                Siap Mengatur Jadwal Anda?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan mengelola jadwal dengan Horizon
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="horizon-button px-8 py-6 text-lg font-semibold"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Mulai Sekarang - Gratis
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-horizon-purple-200">
                <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    No Installation Required
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Works Offline
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Instant Notifications
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-horizon-purple-700 to-horizon-purple-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Horizon</h3>
          <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
            Mengelola jadwal acara dengan teknologi terdepan untuk produktivitas maksimal
          </p>
          <div className="text-purple-300 text-sm">
            © 2024 Horizon Event Scheduler. Dibuat dengan ❤️ untuk produktivitas Anda.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
