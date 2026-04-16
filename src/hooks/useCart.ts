import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export const useCart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCart(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, 'carts', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setCart(docSnap.data() as Cart);
      } else {
        setCart({ userId: user.uid, items: [] });
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `carts/${user.uid}`);
    });

    return unsubscribe;
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('Please sign in to add to cart');
      return;
    }

    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);
      
      let newItems: CartItem[] = [];
      if (cartSnap.exists()) {
        const currentCart = cartSnap.data() as Cart;
        newItems = [...currentCart.items];
        const existingItemIndex = newItems.findIndex(item => item.productId === productId);
        
        if (existingItemIndex >= 0) {
          newItems[existingItemIndex].quantity += quantity;
        } else {
          newItems.push({ productId, quantity });
        }
      } else {
        newItems = [{ productId, quantity }];
      }

      await setDoc(cartRef, {
        userId: user.uid,
        items: newItems
      });
      
      toast.success('Added to cart');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `carts/${user.uid}`);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user || !cart) return;

    try {
      const newItems = cart.items.filter(item => item.productId !== productId);
      await setDoc(doc(db, 'carts', user.uid), {
        userId: user.uid,
        items: newItems
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `carts/${user.uid}`);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || !cart) return;

    try {
      const newItems = cart.items.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
      await setDoc(doc(db, 'carts', user.uid), {
        userId: user.uid,
        items: newItems
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `carts/${user.uid}`);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'carts', user.uid), {
        userId: user.uid,
        items: []
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `carts/${user.uid}`);
    }
  };

  return { cart, loading, addToCart, removeFromCart, updateQuantity, clearCart };
};
