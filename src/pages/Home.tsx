import React, { useState, useMemo } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Zap, Shield, Smartphone, Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useProducts } from '@/hooks/useProducts';

export const Home = () => {
  const { t } = useTranslation();
  const { products, loading } = useProducts();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    if (!products) return [];
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
      
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [products, searchQuery, category, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden rounded-3xl bg-primary/5">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              {t('home.heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              {t('home.heroSubtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              <Button size="lg" className="gap-2">
                {t('home.shopNow')} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">{t('home.learnMore')}</Button>
            </motion.div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Fast Loading</h3>
          <p className="text-muted-foreground">Optimized for speed with edge delivery and efficient data fetching.</p>
        </div>
        <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">100% Secure</h3>
          <p className="text-muted-foreground">Advanced security rules and encrypted authentication for your peace of mind.</p>
        </div>
        <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Fully Responsive</h3>
          <p className="text-muted-foreground">A seamless experience across mobile, tablet, and desktop devices.</p>
        </div>
      </section>

      {/* Product Section */}
      <section id="shop">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight">{t('home.featuredProducts')}</h2>
            <p className="text-muted-foreground">Handpicked selections just for you.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(category !== 'all' || minPrice !== '' || maxPrice !== '') && (
                <span className="flex h-2 w-2 rounded-full bg-primary" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-2xl border bg-card/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Min Price</label>
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Max Price</label>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="ghost" 
                    className="w-full gap-2 text-muted-foreground hover:text-foreground"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ProductGrid products={filteredProducts} loading={loading} />
      </section>
    </div>
  );
};
