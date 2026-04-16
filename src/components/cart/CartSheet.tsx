import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, PackageOpen, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export const CartSheet = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { products } = useProducts();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  
  // Checkout form state
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const cartItems = cart?.items.map(item => {
    const product = products?.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product) || [];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product!.price * item.quantity), 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const totalPrice = subtotal + tax;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || cartItems.length === 0) return;

    try {
      const orderItems = cartItems.map(item => ({
        ...item.product,
        quantity: item.quantity
      }));

      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: orderItems,
        total: totalPrice,
        status: 'pending',
        shippingDetails,
        trackingNumber: 'NX' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        createdAt: serverTimestamp(),
      });
      
      await clearCart();
      setIsOpen(false);
      setIsCheckoutMode(false);
      setShippingDetails({ fullName: '', address: '', city: '', zipCode: '' });
      toast.success('Order placed successfully! Track it in your dashboard.');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'orders');
    }
  };

  // Reset checkout mode when sheet closes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => setIsCheckoutMode(false), 300);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="relative" />}>
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
            {totalItems}
          </Badge>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            {isCheckoutMode && (
              <Button variant="ghost" size="icon" onClick={() => setIsCheckoutMode(false)} className="h-8 w-8 -ml-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <SheetTitle>{isCheckoutMode ? 'Checkout' : `Shopping Cart (${totalItems})`}</SheetTitle>
          </div>
          {!isCheckoutMode && cartItems.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive h-8 px-2">
              Clear Cart
            </Button>
          )}
        </SheetHeader>
        
        <ScrollArea className="flex-grow mt-6 -mx-6 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <PackageOpen className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Looks like you haven't added anything yet.</p>
              <Button variant="outline" className="mt-6" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : isCheckoutMode ? (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  required 
                  value={shippingDetails.fullName}
                  onChange={e => setShippingDetails(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input 
                  id="address" 
                  required 
                  value={shippingDetails.address}
                  onChange={e => setShippingDetails(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    required 
                    value={shippingDetails.city}
                    onChange={e => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    required 
                    value={shippingDetails.zipCode}
                    onChange={e => setShippingDetails(prev => ({ ...prev, zipCode: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h4 className="font-medium">Order Summary</h4>
                <div className="space-y-2 text-sm bg-muted/50 p-4 rounded-lg">
                  {cartItems.map(item => (
                    <div key={item.productId} className="flex justify-between text-muted-foreground">
                      <span className="line-clamp-1 pr-4">{item.quantity}x {item.product!.name}</span>
                      <span>${(item.product!.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-foreground text-base">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden shrink-0 bg-muted">
                    <img 
                      src={item.product!.imageURL} 
                      alt={item.product!.name} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium line-clamp-1">{item.product!.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.product!.price.toFixed(2)}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 shrink-0"
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input 
                        type="number"
                        className="h-7 w-12 text-center text-sm p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            updateQuantity(item.productId, Math.min(val, item.product!.stock));
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value === '' || parseInt(e.target.value) < 1) {
                            updateQuantity(item.productId, 1);
                          }
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 shrink-0"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.product!.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cartItems.length > 0 && (
          <SheetFooter className="mt-6 flex-col sm:flex-col gap-4">
            {!isCheckoutMode ? (
              <>
                <div className="space-y-2 w-full text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={() => setIsCheckoutMode(true)}>
                  Proceed to Checkout
                </Button>
              </>
            ) : (
              <Button type="submit" form="checkout-form" className="w-full" size="lg">
                Place Order (${totalPrice.toFixed(2)})
              </Button>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
