import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { mockAPI, formatCurrency } from '@/lib/mock-data';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Package, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const BuyPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [sellerId, setSellerId] = useState('');
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState<{
    sellerName: string;
    productName: string;
    productPrice: number;
    productDescription: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!sellerId.trim() || !productId.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both Seller ID and Product ID",
        variant: "destructive",
      });
      return;
    }

    setSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const product = mockAPI.getProductById(productId);
      const sellerName = mockAPI.getSellerName(sellerId);
      
      if (product && product.sellerId === sellerId) {
        setProductDetails({
          sellerName,
          productName: product.name,
          productPrice: product.price,
          productDescription: product.description
        });
        toast({
          title: "Product found!",
          description: "Product details retrieved successfully.",
        });
      } else {
        setProductDetails(null);
        toast({
          title: "Product not found",
          description: "Please check the Seller ID and Product ID and try again.",
          variant: "destructive",
        });
      }
      setSearching(false);
    }, 1500);
  };

  const handleInitiateTransaction = async () => {
    if (!user || !productDetails) return;

    setLoading(true);
    
    // Simulate transaction creation
    setTimeout(() => {
      const transaction = mockAPI.createTransaction({
        buyerId: user.id,
        sellerId: sellerId,
        sellerName: productDetails.sellerName,
        productId: productId,
        productName: productDetails.productName,
        productPrice: productDetails.productPrice,
        status: 'pending',
        type: 'outgoing'
      });

      toast({
        title: "Transaction initiated!",
        description: `Transaction ${transaction.id} has been created. The seller has been notified.`,
      });

      // Reset form
      setSellerId('');
      setProductId('');
      setProductDetails(null);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <ShoppingCart className="mr-3 h-8 w-8 text-primary" />
            {t('buy.title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('buy.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search Form */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  {t('buy.productSearch')}
                </CardTitle>
              </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sellerId">{t('buy.sellerId')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="sellerId"
                    placeholder={t('buy.sellerIdPlaceholder')}
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('buy.sellerIdHelp')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productId">{t('buy.productId')}</Label>
                <div className="relative">
                  <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="productId"
                    placeholder={t('buy.productIdPlaceholder')}
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('buy.productIdHelp')}
                </p>
              </div>

              <Button 
                onClick={handleSearch} 
                className="w-full" 
                disabled={searching}
              >
                {searching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Search className="mr-2 h-4 w-4" />
                {t('buy.searchProduct')}
              </Button>

              {/* Demo Data Helper */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">{t('buy.demoData')}</h4>
                <div className="text-sm space-y-1">
                  <p><strong>{t('buy.sellerId')}:</strong> SLR_001</p>
                  <p><strong>{t('buy.productId')}s:</strong> PRD_001, PRD_002</p>
                  <p><strong>{t('buy.sellerId')}:</strong> SLR_002</p>
                  <p><strong>{t('buy.productId')}:</strong> PRD_003</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className={`hover-lift transition-all ${productDetails ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                {t('buy.productDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!productDetails ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {t('buy.noProductFound')}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center text-success">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">{t('buy.productFound')}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">{t('buy.seller')}</Label>
                      <p className="text-lg font-semibold">{productDetails.sellerName}</p>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">{t('buy.productName')}</Label>
                      <p className="text-lg font-semibold">{productDetails.productName}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">{t('buy.price')}</Label>
                      <p className="text-2xl font-bold text-primary flex items-center">
                        <DollarSign className="h-6 w-6 mr-1" />
                        {formatCurrency(productDetails.productPrice)}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">{t('buy.description')}</Label>
                      <p className="text-foreground/80 leading-relaxed">
                        {productDetails.productDescription}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <Button 
                    onClick={handleInitiateTransaction}
                    className="w-full trust-gradient hover:opacity-90"
                    disabled={loading}
                    size="lg"
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {t('buy.initiateTransaction')}
                  </Button>

                  <div className="bg-success-light p-4 rounded-lg">
                    <p className="text-sm text-success-foreground">
                      <strong>{t('buy.whatHappensNext')}</strong><br />
                      {t('buy.nextSteps')}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};