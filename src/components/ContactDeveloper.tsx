import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code, Heart, MessageCircle } from 'lucide-react';
export const ContactDeveloper = () => {
  const handleContactClick = () => {
    window.open('https://kasyara.pages.dev', '_blank');
  };
  return <Card className="bg-gradient-to-br from-horizon-purple-50 to-horizon-yellow-50 border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Code className="h-5 w-5 text-horizon-purple-600" />
          Contact Developer
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <p className="text-gray-600">App by Fataa Kasyara</p>
          <p className="text-sm text-gray-500">Contact me by click the link below</p>
        </div>
        
        <Button onClick={handleContactClick} className="bg-gradient-to-r from-horizon-purple-500 to-horizon-yellow-500 hover:from-horizon-purple-600 hover:to-horizon-yellow-600 text-white font-semibold rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <MessageCircle className="h-4 w-4 mr-2" />
          Visit Developer
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>;
};
