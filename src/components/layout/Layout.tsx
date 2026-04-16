import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';
import { CookieBanner } from './CookieBanner';
import { useSettings } from '@/hooks/useSettings';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useSettings();
  const bgImage = settings.backgroundImageUrl || "https://user7620.na.imgto.link/public/20260415/bg.avif";

  return (
    <div className="min-h-screen font-sans antialiased flex flex-col relative">
      {/* Global Background Image */}
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-[-1] bg-background/80 backdrop-blur-[2px]" />
      
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
