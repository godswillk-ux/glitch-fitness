import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Heart, User, LogOut, Menu, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const { profile } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-xl font-black tracking-tighter uppercase italic">GLITCH</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">{t('nav.shop')}</Link>
            <Link to="/categories" className="text-sm font-medium transition-colors hover:text-primary">{t('nav.categories')}</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          {user ? (
            <>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              {profile?.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="ghost" size="icon" className="text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button onClick={loginWithGoogle}>{t('nav.signIn')}</Button>
          )}

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <Link to="/" className="text-lg font-medium">{t('nav.shop')}</Link>
                <Link to="/categories" className="text-lg font-medium">{t('nav.categories')}</Link>
                {user && (
                  <>
                    <Link to="/wishlist" className="text-lg font-medium">{t('nav.wishlist')}</Link>
                    <Link to="/dashboard" className="text-lg font-medium">{t('nav.dashboard')}</Link>
                    {profile?.role === 'admin' && (
                      <Link to="/admin" className="text-lg font-medium text-primary">{t('nav.admin')}</Link>
                    )}
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
