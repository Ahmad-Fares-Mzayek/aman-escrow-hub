import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { mockAPI, Transaction, formatCurrency, formatDate } from '@/lib/mock-data';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Package,
  User,
  Calendar,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export const PaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const userTransactions = mockAPI.getUserTransactions(user.id);
      setTransactions(userTransactions);
    }
  }, [user]);

  const handleConfirmReceipt = async (transactionId: string) => {
    setLoading(transactionId);
    
    // Simulate API delay
    setTimeout(() => {
      const updatedTransaction = mockAPI.updateTransactionStatus(transactionId, 'completed');
      if (updatedTransaction) {
        setTransactions(prev => 
          prev.map(t => t.id === transactionId ? updatedTransaction : t)
        );
        toast({
          title: "Payment released!",
          description: "The seller has been paid. Transaction completed.",
        });
      }
      setLoading(null);
    }, 2000);
  };

  const handleFileComplaint = async (transactionId: string) => {
    setLoading(transactionId);
    
    // Simulate API delay
    setTimeout(() => {
      const updatedTransaction = mockAPI.updateTransactionStatus(transactionId, 'disputed');
      if (updatedTransaction) {
        setTransactions(prev => 
          prev.map(t => t.id === transactionId ? updatedTransaction : t)
        );
        toast({
          title: "Complaint filed",
          description: "Our team will review this transaction. The seller has been notified.",
          variant: "destructive",
        });
      }
      setLoading(null);
    }, 2000);
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'disputed':
        return <AlertTriangle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'confirmed':
        return <Badge className="status-confirmed">Confirmed</Badge>;
      case 'disputed':
        return <Badge className="status-disputed">Disputed</Badge>;
      case 'completed':
        return <Badge className="status-confirmed">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const incomingTransactions = transactions.filter(t => t.type === 'incoming');
  const outgoingTransactions = transactions.filter(t => t.type === 'outgoing');

  if (!user) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <DollarSign className="mr-3 h-8 w-8 text-primary" />
            {t('payments.title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your incoming and outgoing transactions
          </p>
        </div>

        <Tabs defaultValue="incoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming" className="flex items-center">
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              {t('payments.incoming')} ({incomingTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              {t('payments.outgoing')} ({outgoingTransactions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowDownLeft className="mr-2 h-5 w-5 text-success" />
                  {t('payments.incoming')} (As Seller)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {incomingTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <ArrowDownLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No incoming transactions yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {incomingTransactions.map((transaction, index) => (
                      <div key={transaction.id}>
                        <div className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(transaction.status)}
                                  <span className="font-semibold">{transaction.id}</span>
                                </div>
                                {getStatusBadge(transaction.status)}
                              </div>
                              <p className="text-2xl font-bold text-success">
                                +{formatCurrency(transaction.productPrice)}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Package className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{transaction.productName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>Buyer: {transaction.buyerId}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{formatDate(transaction.createdAt)}</span>
                                </div>
                              </div>
                            </div>

                            {transaction.status === 'confirmed' && (
                              <div className="bg-success-light p-3 rounded-lg">
                                <p className="text-sm text-success-foreground">
                                  <strong>Waiting for buyer confirmation:</strong> Once the buyer confirms receipt of the product, payment will be released to you.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        {index < incomingTransactions.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outgoing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowUpRight className="mr-2 h-5 w-5 text-destructive" />
                  {t('payments.outgoing')} (As Buyer)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {outgoingTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <ArrowUpRight className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No outgoing transactions yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {outgoingTransactions.map((transaction, index) => (
                      <div key={transaction.id}>
                        <div className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(transaction.status)}
                                  <span className="font-semibold">{transaction.id}</span>
                                </div>
                                {getStatusBadge(transaction.status)}
                              </div>
                              <p className="text-2xl font-bold text-destructive">
                                -{formatCurrency(transaction.productPrice)}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Package className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{transaction.productName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>Seller: {transaction.sellerName}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{formatDate(transaction.createdAt)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Action buttons for buyers */}
                            {transaction.status === 'confirmed' && (
                              <div className="flex space-x-3 pt-3">
                                <Button 
                                  onClick={() => handleConfirmReceipt(transaction.id)}
                                  className="success-gradient hover:opacity-90"
                                  disabled={loading === transaction.id}
                                >
                                  {loading === transaction.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  {t('payments.confirmReceipt')}
                                </Button>
                                <Button 
                                  onClick={() => handleFileComplaint(transaction.id)}
                                  variant="destructive"
                                  disabled={loading === transaction.id}
                                >
                                  {loading === transaction.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  {t('payments.fileComplaint')}
                                </Button>
                              </div>
                            )}

                            {transaction.status === 'pending' && (
                              <div className="bg-warning-light p-3 rounded-lg">
                                <p className="text-sm text-warning-foreground">
                                  <strong>Waiting for seller confirmation:</strong> The seller needs to confirm this transaction before proceeding.
                                </p>
                              </div>
                            )}

                            {transaction.status === 'completed' && (
                              <div className="bg-success-light p-3 rounded-lg">
                                <p className="text-sm text-success-foreground">
                                  <strong>Transaction completed:</strong> You confirmed receipt and payment has been released to the seller.
                                </p>
                              </div>
                            )}

                            {transaction.status === 'disputed' && (
                              <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                                <p className="text-sm text-destructive">
                                  <strong>Dispute filed:</strong> Our team is reviewing this transaction. We'll contact you with updates.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        {index < outgoingTransactions.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};