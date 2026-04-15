import React, { useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '@/lib/firebase';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    imageURL: product?.imageURL || '',
    stock: product?.stock || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          updatedAt: serverTimestamp(),
        });
        toast.success('Product updated successfully');
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success('Product added successfully');
      }
      onSuccess();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="imageURL">Image URL</Label>
        <Input
          id="imageURL"
          type="url"
          value={formData.imageURL}
          onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
};
