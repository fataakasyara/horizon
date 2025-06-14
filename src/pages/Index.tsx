import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Calendar, Smartphone, Star, ArrowRight, Zap, Shield, Globe, Download, Bell } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-horizon-yellow-50 via-white to-horizon-purple-50 p-6">
        <div className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-lg mx-auto border border-gray-100">
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <Smartphone size={120} className="text-gray-300" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">H</span>
                    </div>
                </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Pengalaman Terbaik di Mobile
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Nikmati Horizon sepenuhnya di perangkat mobile Anda. Install aplikasi kami untuk akses offline, sinkronisasi real-time, dan notifikasi.
            </p>
            <Button 
                size="lg"
                onClick={() => window.location.href = '/mobile-download'}
                className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 hover:from-horizon-purple-700 hover:to-horizon-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
                <Download className="h-5 w-5 mr-3" />
                Lihat Cara Install
            </Button>
            <p className="text-sm text-gray-500 mt-6">
                Anda masih bisa <a href="/dashboard" className="text-horizon-purple-600 font-semibold hover:underline">melanjutkan ke versi web</a>.
            </p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Event Management",
      description: "Organize your schedule with precision and style"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Sync",
      description: "Instant updates across all your devices"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Offline First",
      description: "Works seamlessly without internet connection"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Alerts",
      description: "Never miss important moments again"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Universal Access",
      description: "Access from anywhere, anytime"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Premium Experience",
      description: "Crafted for productivity enthusiasts"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <OfflineIndicator />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div className="text-2xl font-black bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 bg-clip-text text-transparent">
                HORIZON
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/mobile-download'}
                className="hidden sm:flex border-horizon-purple-200 text-horizon-purple-600 hover:bg-horizon-purple-50"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Cara Install
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-horizon-purple-600 hover:bg-horizon-purple-700 text-white px-6 py-2 rounded-full"
              >
                Buka App
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile-First Hero Section */}
      <section className="pt-24 pb-20 px-4 text-center bg-gradient-to-b from-horizon-yellow-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
          <div className="w-24 h-24 bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 rounded-3xl flex items-center justify-center shadow-lg mb-6">
            <span className="text-white font-bold text-5xl">H</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
            <span className="text-gray-900">Jadwalkan</span>
            <br />
            <span className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 bg-clip-text text-transparent">
              Masa Depanmu
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
            Platform manajemen acara yang revolusioner, dirancang untuk gaya hidup modern. Indah, cepat, dan cerdas.
          </p>
          
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 hover:from-horizon-purple-700 hover:to-horizon-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Mulai Gunakan
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/mobile-download'}
              className="w-full border-2 border-gray-300 text-gray-700 hover:border-horizon-purple-300 hover:text-horizon-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              <Download className="h-5 w-5 mr-2" />
              Cara Install
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your time effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                      index % 2 === 0 
                        ? 'from-horizon-purple-500 to-horizon-purple-600' 
                        : 'from-horizon-yellow-400 to-horizon-yellow-500'
                    } flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-horizon-purple-400 to-horizon-yellow-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-horizon-purple-400 to-horizon-yellow-400 bg-clip-text text-transparent">
                  HORIZON
                </div>
              </div>
              <p className="text-gray-400">
                Next-generation scheduling platform for modern professionals.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div className="cursor-pointer hover:text-white" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</div>
                <div className="cursor-pointer hover:text-white" onClick={() => window.location.href = '/mobile-download'}>Mobile App</div>
                <div>Updates</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Contact</div>
                <div>Status</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Horizon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
