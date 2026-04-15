import React from 'react';
import { useUser } from '@/context/UserContext';
import { useWishlist } from '@/hooks/useWishlist';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { OrderTracking } from '@/components/orders/OrderTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Heart, Package, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { profile } = useUser();
  const { wishlist } = useWishlist();
  const { products } = useProducts();
  const { t } = useTranslation();

  const wishlistedProducts = products?.filter(p => wishlist?.productIds.includes(p.id)) || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Card className="w-full md:w-1/3">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10 mb-4">
              <img
                src={profile?.photoURL}
                alt={profile?.displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <CardTitle>{profile?.displayName}</CardTitle>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary capitalize">
                {profile?.role}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium">
                  {profile?.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-grow w-full">
          <Tabs defaultValue="wishlist" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="wishlist" className="gap-2">
                <Heart className="h-4 w-4" /> {t('nav.wishlist')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" /> Orders
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="wishlist" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {wishlistedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {wishlistedProducts.length === 0 && (
                  <div className="col-span-full text-center py-12 border rounded-lg border-dashed">
                    <p className="text-muted-foreground">Your wishlist is empty.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <OrderTracking />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Account settings coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
