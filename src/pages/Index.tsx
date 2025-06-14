
import { Button } from '@/components/ui/button';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { Smartphone, ArrowRight, Download } from 'lucide-react';
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
                Best Experience on Mobile
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Enjoy Horizon to the fullest on your mobile device. Install our app for offline access, real-time sync, and notifications.
            </p>
            <Button 
                size="lg"
                onClick={() => window.location.href = '/mobile-download'}
                className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 hover:from-horizon-purple-700 hover:to-horizon-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
                <Download className="h-5 w-5 mr-3" />
                See How to Install
            </Button>
            <p className="text-sm text-gray-500 mt-6">
                You can still <a href="/dashboard" className="text-horizon-purple-600 font-semibold hover:underline">continue to the web version</a>.
            </p>
        </div>
      </div>
    );
  }

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
                How to Install
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-horizon-purple-600 hover:bg-horizon-purple-700 text-white px-6 py-2 rounded-full"
              >
                Open App
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
            <span className="text-gray-900">Schedule</span>
            <br />
            <span className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 bg-clip-text text-transparent">
              Your Future
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
            A revolutionary event management platform, designed for the modern lifestyle. Beautiful, fast, and smart.
          </p>
          
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 hover:from-horizon-purple-700 hover:to-horizon-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '/mobile-download'}
              className="w-full border-2 border-gray-300 text-gray-700 hover:border-horizon-purple-300 hover:text-horizon-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              <Download className="h-5 w-5 mr-2" />
              How to Install
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
