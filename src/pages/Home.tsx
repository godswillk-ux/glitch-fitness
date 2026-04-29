import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const featuredProducts = useMemo(() => {
    if (!products) return [];
    return products.slice(0, 8);
  }, [products]);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden rounded-[3rem] bg-accent/5 border border-accent/10">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase mb-6"
            >
              New Collection 2026
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic uppercase leading-[0.9]"
            >
              {t('home.heroTitle').split(':').map((part, i) => (
                <span key={i} className={i === 1 ? "text-primary" : ""}>
                  {part}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl"
            >
              {t('home.heroSubtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Button size="lg" className="gap-2 rounded-full h-14 px-8 bg-primary text-primary-foreground font-black uppercase italic tracking-tighter text-lg shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all" onClick={() => navigate('/shop')}>
                {t('home.shopNow')} <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 border-accent/20 font-black uppercase italic tracking-tighter text-lg hover:bg-accent transition-all" onClick={() => navigate('/our-story')}>{t('home.learnMore')}</Button>
            </motion.div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[80px] -z-10" />
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Zap className="h-6 w-6" />, title: "Exclusive Design", desc: "Unique fashion pieces curated for those who dare to stand out." },
          { icon: <Shield className="h-6 w-6" />, title: "Ethical Quality", desc: "Sustainability meets luxury. Quality fabrics sourced responsibly." },
          { icon: <Smartphone className="h-6 w-6" />, title: "Tailored Experience", desc: "A seamless shopping experience across all your digital devices." }
        ].map((feat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2rem] border border-accent/10 bg-accent/5 hover:bg-accent/10 transition-all hover:shadow-2xl group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <div className="text-primary">{feat.icon}</div>
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-tight mb-3">{feat.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Product Section */}
      <section id="shop" className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-black tracking-widest uppercase"
            >
              Curated Selection
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">{t('home.featuredProducts')}</h2>
          </div>
          <Button variant="link" className="font-black italic uppercase tracking-widest text-xs h-auto p-0 gap-2 group" onClick={() => navigate('/shop')}>
            {t('home.viewAll')} <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <ProductGrid products={featuredProducts} loading={loading} />

        <div className="flex justify-center pt-8">
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full h-14 px-12 border-gold/20 font-black uppercase italic tracking-tighter text-lg hover:bg-gold hover:text-gold-foreground transition-all shadow-lg hover:shadow-gold/20"
            onClick={() => navigate('/shop')}
          >
            {t('home.viewAll')}
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-black tracking-widest uppercase"
          >
            Explore Collections
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from(new Set(products?.map(p => p.category) || [])).slice(0, 4).map((catNameObj, i) => {
            const catName = catNameObj as string;
            const catProduct = products?.find(p => p.category === catName);
            return (
              <motion.div
                key={catName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer border border-accent/10"
                onClick={() => navigate(`/shop?category=${encodeURIComponent(catName)}`)}
              >
                <img 
                  src={catProduct?.imageURL} 
                  alt={catName} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter transition-transform group-hover:scale-110">{catName}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="link" 
            className="font-black italic uppercase tracking-widest text-xs h-auto p-0 gap-2 group"
            onClick={() => navigate('/categories')}
          >
            Browse All Categories <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};
