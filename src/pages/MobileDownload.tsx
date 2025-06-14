
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Download, Chrome, Globe, MoreVertical, Share, Plus, ArrowLeft } from 'lucide-react';

const MobileDownload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-horizon-yellow-50 via-white to-horizon-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 bg-clip-text text-transparent">
                Download Horizon
              </h1>
              <p className="text-gray-600">Install the app on your mobile device</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* PWA Installation */}
        <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 text-white">
            <CardTitle className="flex items-center gap-3">
              <Smartphone className="h-6 w-6" />
              Install as an App (PWA)
            </CardTitle>
            <p className="text-purple-100">Enjoy a native app-like experience</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Android Installation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Chrome className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Android (Chrome)</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">1</Badge>
                    <p className="text-gray-700">Open the Horizon site in the Chrome browser</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">2</Badge>
                    <p className="text-gray-700">Tap the menu <MoreVertical className="inline h-4 w-4 mx-1" /> (3 dots) in the top right corner</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">3</Badge>
                    <p className="text-gray-700">Select "Add to Home Screen" or "Install app"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-purple-100 text-horizon-purple-800 font-bold min-w-6 justify-center">4</Badge>
                    <p className="text-gray-700">Confirm installation</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="h-4 w-4 text-horizon-purple-600" />
                    <span className="font-semibold text-gray-800">Tip:</span>
                  </div>
                  <p className="text-sm text-gray-600">If a banner "Add to Home Screen" appears, tap it for a quick installation!</p>
                </div>
              </div>

              {/* iOS Installation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">iOS (Safari)</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">1</Badge>
                    <p className="text-gray-700">Open the Horizon site in the Safari browser</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">2</Badge>
                    <p className="text-gray-700">Tap the <Share className="inline h-4 w-4 mx-1" /> (Share) button at the bottom</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">3</Badge>
                    <p className="text-gray-700">Scroll and select "Add to Home Screen"</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="bg-horizon-yellow-100 text-horizon-yellow-800 font-bold min-w-6 justify-center">4</Badge>
                    <p className="text-gray-700">Tap "Add" to confirm</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Plus className="h-4 w-4 text-horizon-yellow-600" />
                    <span className="font-semibold text-gray-800">Note:</span>
                  </div>
                  <p className="text-sm text-gray-600">Make sure to use Safari, as other browsers on iOS do not support PWA installation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features after installation */}
        <Card className="border-0 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">After Installation</CardTitle>
            <p className="text-gray-600">Enjoy mobile app features</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-horizon-purple-500 to-horizon-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Offline Mode</h3>
                <p className="text-sm text-gray-600">Access the app without an internet connection</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-horizon-yellow-400 to-horizon-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Quick Access</h3>
                <p className="text-sm text-gray-600">Open directly from your home screen</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800">Push Notifications</h3>
                <p className="text-sm text-gray-600">Get event reminders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="border-0 shadow-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Don't see the "Add to Home Screen" option?</h4>
              <p className="text-gray-600">Make sure you are using the correct browser (Chrome for Android, Safari for iOS) and the site has finished loading.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">App not working offline?</h4>
              <p className="text-gray-600">Open the app at least once while online to allow data to be cached for offline use.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Want to uninstall the app?</h4>
              <p className="text-gray-600">Long-press the app icon on your home screen and select "Remove" or "Uninstall".</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center py-8">
          <Button 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-gradient-to-r from-horizon-purple-600 to-horizon-yellow-500 hover:from-horizon-purple-700 hover:to-horizon-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl"
          >
            Start Using Horizon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileDownload;
