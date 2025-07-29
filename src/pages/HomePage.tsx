import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { usePlatformStats, formatNumber, formatCurrency } from '@/lib/mock-data';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Banknote, 
  ArrowRight,
  CheckCircle,
  Clock,
  Lock
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const stats = usePlatformStats();

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
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-trust">
              AMN | أمن
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Your trusted intermediary for secure individual-to-individual transactions
            </p>
            
            <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
              Supporting small local businesses and boutiques in KSA through our escrow-style platform. 
              Buy and sell with confidence, knowing your transactions are protected.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="trust-gradient hover:opacity-90 text-lg px-8 py-4">
                <Shield className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Thousands
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
                <p className="text-muted-foreground">Active Users</p>
                <p className="text-sm text-success mt-1">+24 this hour</p>
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
                <p className="text-muted-foreground">Completed Transactions</p>
                <p className="text-sm text-success mt-1">+12 this hour</p>
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
                <p className="text-muted-foreground">Total Volume Secured</p>
                <p className="text-sm text-success mt-1">+SAR 45K today</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            How AMN Protects Your Transactions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Secure Escrow</h3>
              <p className="text-muted-foreground">
                Buyer's payment is held securely until the seller delivers the product and buyer confirms receipt.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Safe Delivery</h3>
              <p className="text-muted-foreground">
                Both parties are protected during the transaction. Sellers ship with confidence, buyers receive what they ordered.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Instant Release</h3>
              <p className="text-muted-foreground">
                Once buyer confirms receipt, payment is instantly released to the seller. Disputes are handled fairly by our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Trading Safely?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users who trust AMN with their transactions
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            <Shield className="mr-2 h-5 w-5" />
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
};

// Dashboard component for authenticated users
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your transaction overview
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Total Spent
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {formatCurrency(user.totalSpent)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Across all purchases
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Total Received
                <Banknote className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">
                {formatCurrency(user.totalReceived)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                From sales
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your Seller ID
                <Shield className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {user.sellerId}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Share with buyers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Quick Buy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Start a new transaction by entering seller and product details
              </p>
              <Button asChild className="w-full">
                <Link to="/buy">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Go to Buy Page
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Add new products or manage your existing listings
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/sell">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Go to Sell Page
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};