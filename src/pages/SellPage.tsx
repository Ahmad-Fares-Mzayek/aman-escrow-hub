import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockAPI, Product, formatCurrency } from '@/lib/mock-data';
import { useTranslation } from 'react-i18next';
import { 
  DollarSign, 
  Plus, 
  Package, 
  Edit,
  Copy,
  User,
  Tag,
  FileText,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SellPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  useEffect(() => {
    if (user) {
      const userProducts = mockAPI.getProductsBySeller(user.sellerId);
      setProducts(userProducts);
    }
  }, [user]);

  const handleCopySellerID = () => {
    if (user) {
      navigator.clipboard.writeText(user.sellerId);
      toast({
        title: "Copied!",
        description: "Your Seller ID has been copied to clipboard",
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const price = parseFloat(productPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newProduct = mockAPI.addProduct({
        sellerId: user.sellerId,
        name: productName,
        price: price,
        description: productDescription
      });

      setProducts(prev => [newProduct, ...prev]);
      
      // Reset form
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setShowAddForm(false);
      setLoading(false);

      toast({
        title: "Product added!",
        description: `${newProduct.name} has been added with ID ${newProduct.id}`,
      });
    }, 1500);
  };

  if (!user) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <DollarSign className="mr-3 h-8 w-8 text-primary" />
            Sell Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your product listings and share your Seller ID with buyers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seller Info & Add Product */}
          <div className="lg:col-span-1 space-y-6">
            {/* Seller ID Card */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Your Seller ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border-2 border-dashed border-primary/20">
                    <p className="text-2xl font-bold text-primary text-center">
                      {user.sellerId}
                    </p>
                  </div>
                  <Button 
                    onClick={handleCopySellerID}
                    variant="outline" 
                    className="w-full"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Seller ID
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Share this ID with buyers so they can find and purchase your products
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Add Product Button */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showAddForm ? (
                  <Button 
                    onClick={() => setShowAddForm(true)}
                    className="w-full trust-gradient hover:opacity-90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                ) : (
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="productName"
                          placeholder="iPhone 15 Pro"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Price (SAR)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="productPrice"
                          type="number"
                          placeholder="4500.00"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          className="pl-10"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productDescription">Description</Label>
                      <Textarea
                        id="productDescription"
                        placeholder="Describe your product..."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        type="submit" 
                        className="flex-1"
                        disabled={loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Product
                      </Button>
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setShowAddForm(false)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Your Products ({products.length})
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      You haven't added any products yet
                    </p>
                    <Button 
                      onClick={() => setShowAddForm(true)}
                      variant="outline"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Product
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <div key={product.id}>
                        <div className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <Badge variant="secondary">{product.id}</Badge>
                            </div>
                            <p className="text-2xl font-bold text-primary">
                              {formatCurrency(product.price)}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                              {product.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Added on {new Date(product.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {index < products.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};