import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthModal } from '@/components/auth/AuthModal';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  UserCheck, 
  MessageSquare, 
  Lock,
  Zap,
  Users,
  ArrowRight
} from 'lucide-react';

export const LearnMorePage: React.FC = () => {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleGetStarted = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleCreateAccount = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 flex justify-center">
                <Shield className="h-20 w-20 text-primary animate-float" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-trust">
                {t('learn.title')}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                {t('learn.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Why Use AMN */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{t('learn.whyUse.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('learn.whyUse.content')}
                  </p>
                </CardContent>
              </Card>

              {/* The Problem Today */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mr-4">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">{t('learn.problem.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('learn.problem.content')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Why AMN is Different */}
            <Card className="mb-16 hover-lift bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-3xl mb-4">{t('learn.different.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {t('learn.different.content')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Escrow Protection</h3>
                    <p className="text-sm text-muted-foreground">Secure payment holding</p>
                  </div>
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Dispute Resolution</h3>
                    <p className="text-sm text-muted-foreground">Fair conflict mediation</p>
                  </div>
                  <div className="text-center">
                    <UserCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Verified Sellers</h3>
                    <p className="text-sm text-muted-foreground">Credibility authentication</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-World Scenarios */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl">{t('learn.scenarios.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
                    {t('learn.scenarios.content')}
                  </blockquote>
                </CardContent>
              </Card>

              {/* Dangers Solved */}
              <Card className="hover-lift">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mr-4">
                      <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-2xl">{t('learn.dangers.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('learn.dangers.content')}
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">Fraud Prevention</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">Delivery Protection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">Seller Verification</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              {t('learn.cta.title')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-4"
                onClick={handleGetStarted}
              >
                <Shield className="mr-2 h-5 w-5" />
                {t('learn.cta.getStarted')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={handleCreateAccount}
              >
                {t('learn.cta.createAccount')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
};