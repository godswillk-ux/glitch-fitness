import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useWishlist } from '@/hooks/useWishlist';
import { useProducts } from '@/hooks/useProducts';
import { useSettings } from '@/hooks/useSettings';
import { ProductCard } from '@/components/products/ProductCard';
import { OrderTracking } from '@/components/orders/OrderTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Heart, Package, Settings, Shield, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Dashboard = () => {
  const { profile, updateProfile } = useUser();
  const { wishlist } = useWishlist();
  const { products } = useProducts();
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();

  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [photoURL, setPhotoURL] = useState(profile?.photoURL || '');
  const [bgUrl, setBgUrl] = useState(settings.backgroundImageUrl || '');

  const wishlistedProducts = products?.filter(p => wishlist?.productIds.includes(p.id)) || [];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ displayName, photoURL });
  };

  const handleAdminSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({ backgroundImageUrl: bgUrl });
  };

  const isOwner = profile?.email === 'godswillk116@gmail.com';

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <Card className="w-full md:w-1/3">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10 mb-4">
              <img
                src={profile?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.displayName || 'User')}`}
                alt={profile?.displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              {profile?.displayName}
              {isOwner && (
                <span className="flex items-center text-yellow-500 text-sm">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-muted-foreground text-xs">(Owner)</span>
                </span>
              )}
            </CardTitle>
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
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
              <TabsTrigger value="wishlist" className="gap-2">
                <Heart className="h-4 w-4" /> {t('nav.wishlist')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" /> Orders
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
              {profile?.role === 'admin' && (
                <TabsTrigger value="admin" className="gap-2">
                  <Shield className="h-4 w-4" /> Admin
                </TabsTrigger>
              )}
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
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input 
                        id="displayName" 
                        value={displayName} 
                        onChange={(e) => setDisplayName(e.target.value)} 
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photoURL">Profile Picture URL</Label>
                      <Input 
                        id="photoURL" 
                        value={photoURL} 
                        onChange={(e) => setPhotoURL(e.target.value)} 
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                    <Button type="submit">Save Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            {profile?.role === 'admin' && (
              <TabsContent value="admin" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Global Website Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAdminSettingsUpdate} className="space-y-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="bgUrl">Background Image URL</Label>
                        <Input 
                          id="bgUrl" 
                          value={bgUrl} 
                          onChange={(e) => setBgUrl(e.target.value)} 
                          placeholder="https://example.com/bg.jpg"
                        />
                        <p className="text-xs text-muted-foreground">This will change the background image for all users.</p>
                      </div>
                      <Button type="submit">Save Settings</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
