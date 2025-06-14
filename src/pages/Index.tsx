
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Calendar, Clock, Bell, Wifi, Smartphone, Star, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const Index = () => {
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
                Download App
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-horizon-purple-600 hover:bg-horizon-purple-700 text-white px-6 py-2 rounded-full"
              >
                Launch App
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-horizon-yellow-100 text-horizon-yellow-800 border-0 px-4 py-2 rounded-full">
                  ✨ Next-Gen Scheduling
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  <span className="text-gray-900">Schedule</span>
                  <br />
                  <span className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 bg-clip-text text-transparent">
                    Simplified
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Revolutionary event management platform designed for the modern lifestyle. 
                  Beautiful, fast, and intelligent.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 hover:from-horizon-purple-700 hover:to-horizon-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.location.href = '/mobile-download'}
                  className="border-2 border-gray-300 text-gray-700 hover:border-horizon-purple-300 hover:text-horizon-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Download App
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-horizon-purple-100 to-horizon-yellow-100 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-800">Today's Schedule</div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {[
                    { time: "09:00", title: "Team Meeting", color: "horizon-purple" },
                    { time: "11:30", title: "Project Review", color: "horizon-yellow" },
                    { time: "14:00", title: "Client Call", color: "horizon-purple" },
                  ].map((event, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                      <div className={`w-4 h-4 bg-${event.color}-500 rounded-full`}></div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
