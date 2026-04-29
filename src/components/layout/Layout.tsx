import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';
import { CookieBanner } from './CookieBanner';
import { useSettings } from '@/hooks/useSettings';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useSettings();
  const bgImage = settings.backgroundImageUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop";
  const isGoldTheme = settings.backgroundTheme === 'gold';

  return (
    <div className={`min-h-screen font-sans antialiased flex flex-col relative ${isGoldTheme ? 'bg-gold' : ''}`}>
      {/* Global Background Image */}
      {!isGoldTheme && (
        <div 
          className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />
      )}
      {/* Overlay to ensure text readability */}
      <div className={`fixed inset-0 z-[-1] ${isGoldTheme ? 'bg-gold/90' : 'bg-background/80'} backdrop-blur-[2px]`} />
      
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow relative z-0">
        {children}
      </main>
      <Footer />
      <Toaster position="top-center" />
      <CookieBanner />
    </div>
  );
};
