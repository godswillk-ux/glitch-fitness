import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReviewSection } from './ReviewSection';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<any[]>([]);
  const isWishlisted = wishlist?.productIds.includes(product.id);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), where('productId', '==', product.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => doc.data()));
    });
    return unsubscribe;
  }, [product.id]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to purchase');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: [product],
        total: product.price,
        status: 'pending',
        trackingNumber: 'NX' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        createdAt: serverTimestamp(),
      });
      toast.success('Order placed successfully! Track it in your dashboard.');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'orders');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.imageURL}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <Button
            variant="secondary"
            size="icon"
            className={`absolute top-2 right-2 rounded-full shadow-md transition-colors ${isWishlisted ? 'text-red-500' : 'text-muted-foreground'}`}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">{t('products.outOfStock')}</Badge>
            </div>
          )}
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start gap-2">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{product.category}</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold">{averageRating > 0 ? averageRating.toFixed(1) : 'New'}</span>
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-1 mt-1">{product.name}</CardTitle>
          <span className="text-sm font-bold text-primary">${product.price.toFixed(2)}</span>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" size="icon" className="shrink-0" />}>
              <Eye className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-8 mt-4">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img src={product.imageURL} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <Badge>{product.category}</Badge>
                  <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  <Button className="w-full gap-2" onClick={handleCheckout} disabled={product.stock <= 0}>
                    <ShoppingCart className="h-4 w-4" />
                    {t('products.addToCart')}
                  </Button>
                </div>
              </div>
              <ReviewSection productId={product.id} />
            </DialogContent>
          </Dialog>
          <Button className="w-full gap-2" disabled={product.stock <= 0} onClick={handleCheckout}>
            <ShoppingCart className="h-4 w-4" />
            {t('products.addToCart')}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
