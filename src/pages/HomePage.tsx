import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { usePlatformStats, formatNumber, formatCurrency } from '@/lib/mock-data';
import { useTranslation } from 'react-i18next';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Banknote, 
  ArrowRight,
  CheckCircle,
  Clock,
  Lock,
  Lightbulb
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const stats = usePlatformStats();
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Shield className="h-20 w-20 text-primary animate-float" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-trust min-h-[90px] md:min-h-[108px] lg:min-h-[126px] flex items-center justify-center">
              {t('home.hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            
            <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
              {t('home.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="trust-gradient hover:opacity-90 text-lg px-8 py-4"
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                }}
              >
                <Shield className="mr-2 h-5 w-5" />
                {t('home.hero.getStarted')}
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/learn-more">
                  {t('home.hero.learnMore')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.stats.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">
                  {formatNumber(stats.totalUsers)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{t('home.stats.activeUsers')}</p>
                <p className="text-sm text-success mt-1">+24 {t('home.stats.thisHour')}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">
                  {formatNumber(stats.totalTransactions)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{t('home.stats.completedTransactions')}</p>
                <p className="text-sm text-success mt-1">+12 {t('home.stats.thisHour')}</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Banknote className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">
                  {formatCurrency(stats.totalVolumeSAR)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{t('home.stats.totalVolumeSecured')}</p>
                <p className="text-sm text-success mt-1">+SAR 45K {t('home.stats.today')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t('home.howItWorks.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.howItWorks.step1.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.howItWorks.step1.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.howItWorks.step2.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.howItWorks.step2.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.howItWorks.step3.title')}</h3>
              <p className="text-muted-foreground">
                {t('home.howItWorks.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('home.cta.subtitle')}
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-4"
            onClick={() => {
              setAuthMode('signup');
              setShowAuthModal(true);
            }}
          >
            <Shield className="mr-2 h-5 w-5" />
            {t('home.cta.createAccount')}
          </Button>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </div>
  );
};

// Dashboard component for authenticated users
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  
  if (!user) return null;

  // Mock chart data
  const monthlySpendingData = [
    { date: 'Jul 1', amount: 150 },
    { date: 'Jul 3', amount: 250 },
    { date: 'Jul 8', amount: 0 },
    { date: 'Jul 15', amount: 500 },
    { date: 'Jul 22', amount: 120 }
  ];

  const transactionTypeData = [
    { name: t('dashboard.buying'), value: 60, color: '#3b82f6' },
    { name: t('dashboard.selling'), value: 25, color: '#10b981' },
    { name: t('dashboard.pending'), value: 15, color: '#f59e0b' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {t('dashboard.welcome')}, {user.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('dashboard.overview')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t('dashboard.totalSpent')}
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {formatCurrency(user.totalSpent)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t('dashboard.acrossPurchases')}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t('dashboard.totalReceived')}
                <Banknote className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">
                {formatCurrency(user.totalReceived)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t('dashboard.fromSales')}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t('dashboard.yourSellerId')}
                <Shield className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {user.sellerId}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t('dashboard.shareWithBuyers')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>{t('dashboard.monthlySpending')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlySpendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>{t('dashboard.transactionTypes')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={transactionTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {transactionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Tip */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
              <Lightbulb className="mr-2 h-5 w-5" />
              {t('dashboard.aiTip')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 dark:text-blue-300">
              {t('dashboard.aiTipContent')}
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>{t('dashboard.quickBuy')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('dashboard.quickBuyDescription')}
              </p>
              <Button asChild className="w-full">
                <Link to="/buy">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {t('dashboard.goToBuyPage')}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>{t('dashboard.manageProducts')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('dashboard.manageProductsDescription')}
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/sell">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {t('dashboard.goToSellPage')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};