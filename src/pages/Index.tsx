
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  console.log('Index page is rendering');
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    console.log('Navigating to dashboard');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      {/* Simple Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
              Horizon
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Platform manajemen jadwal acara modern
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            onClick={handleNavigateToDashboard}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Mulai Sekarang
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
