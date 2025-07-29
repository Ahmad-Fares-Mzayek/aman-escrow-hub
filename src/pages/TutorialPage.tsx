import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TutorialModal } from '@/components/tutorial/TutorialModal';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Play, BookOpen } from 'lucide-react';

export const TutorialPage: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const { markOnboarded } = useAuth();
  const navigate = useNavigate();

  const handleTutorialComplete = () => {
    markOnboarded();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <Shield className="h-20 w-20 text-primary mx-auto mb-6 animate-float" />
          <h1 className="text-4xl font-bold mb-4 text-gradient-trust">
            Welcome to AMN | أمن
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Let's get you familiar with our secure transaction platform
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg p-8 border shadow-card">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">
              6-Step Interactive Tutorial
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Learn how to buy and sell securely, manage your products, track payments, 
              and use all the features that make AMN your trusted intermediary.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => setShowTutorial(true)}
                size="lg"
                className="w-full trust-gradient hover:opacity-90"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Tutorial
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Skip to Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">What you'll learn:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Dashboard overview</li>
                <li>• How to buy products</li>
                <li>• How to sell products</li>
              </ul>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Also covered:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Payment tracking</li>
                <li>• Account settings</li>
                <li>• Safety features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <TutorialModal 
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        onComplete={handleTutorialComplete}
      />
    </div>
  );
};